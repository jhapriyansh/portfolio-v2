import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/lib/AdminUser";
import AuditLog from "@/lib/AuditLog";

/* ── Rate limiter: 5 failed attempts per IP within a 60s sliding window ── */
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;
const failedAttempts = new Map<string, number[]>();

function isRateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const timestamps = (failedAttempts.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS,
  );
  failedAttempts.set(ip, timestamps);
  if (timestamps.length >= MAX_ATTEMPTS) {
    const oldest = timestamps[0];
    return { limited: true, retryAfter: Math.ceil((oldest + WINDOW_MS - now) / 1000) };
  }
  return { limited: false, retryAfter: 0 };
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const timestamps = (failedAttempts.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS,
  );
  timestamps.push(now);
  failedAttempts.set(ip, timestamps);
}

function clearAttempts(ip: string) {
  failedAttempts.delete(ip);
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || "unknown";
}

// POST /api/auth — login
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { action, password, newPassword } = await request.json();

    await dbConnect();

    if (action === "setup") {
      // First-time setup: only works if no admin user exists
      const existing = await AdminUser.findOne({ username: "admin" });
      if (existing) {
        return NextResponse.json(
          { error: "Admin already set up. Use change-password instead." },
          { status: 400 }
        );
      }
      const passwordHash = await bcrypt.hash(password, 12);
      await AdminUser.create({ username: "admin", passwordHash });
      return NextResponse.json({ success: true, message: "Admin account created" });
    }

    if (action === "login") {
      const { limited, retryAfter } = isRateLimited(ip);
      if (limited) {
        return NextResponse.json(
          { error: `Too many attempts. Try again in ${retryAfter}s.` },
          { status: 429 }
        );
      }
      const admin = await AdminUser.findOne({ username: "admin" });
      if (!admin) {
        return NextResponse.json(
          { error: "No admin account. Visit /admin to set up." },
          { status: 404 }
        );
      }
      const valid = await bcrypt.compare(password, admin.passwordHash);
      if (!valid) {
        recordFailedAttempt(ip);
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
      }
      clearAttempts(ip);
      const token = await bcrypt.hash(admin.passwordHash + Date.now(), 4);
      return NextResponse.json({ success: true, token });
    }

    if (action === "change-password") {
      const { limited, retryAfter } = isRateLimited(ip);
      if (limited) {
        return NextResponse.json(
          { error: `Too many attempts. Try again in ${retryAfter}s.` },
          { status: 429 }
        );
      }
      const admin = await AdminUser.findOne({ username: "admin" });
      if (!admin) {
        return NextResponse.json({ error: "No admin account" }, { status: 404 });
      }
      const valid = await bcrypt.compare(password, admin.passwordHash);
      if (!valid) {
        recordFailedAttempt(ip);
        return NextResponse.json(
          { error: "Current password incorrect" },
          { status: 401 }
        );
      }
      clearAttempts(ip);
      admin.passwordHash = await bcrypt.hash(newPassword, 12);
      await admin.save();
      await AuditLog.create({
        action: "update",
        entity: "settings",
        description: "Admin password changed",
      });
      return NextResponse.json({ success: true, message: "Password changed" });
    }

    if (action === "verify") {
      // Verify current password (for authenticated operations)
      const admin = await AdminUser.findOne({ username: "admin" });
      if (!admin) {
        return NextResponse.json({ error: "No admin" }, { status: 404 });
      }
      const valid = await bcrypt.compare(password, admin.passwordHash);
      return NextResponse.json({ valid });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Auth operation failed" },
      { status: 500 }
    );
  }
}

// GET /api/auth — check if admin exists
export async function GET() {
  try {
    await dbConnect();
    const admin = await AdminUser.findOne({ username: "admin" });
    return NextResponse.json({ adminExists: !!admin });
  } catch {
    return NextResponse.json({ adminExists: false });
  }
}
