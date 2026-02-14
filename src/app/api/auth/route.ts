import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/lib/AdminUser";

// POST /api/auth — login
export async function POST(request: Request) {
  try {
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
      const admin = await AdminUser.findOne({ username: "admin" });
      if (!admin) {
        return NextResponse.json(
          { error: "No admin account. Visit /admin to set up." },
          { status: 404 }
        );
      }
      const valid = await bcrypt.compare(password, admin.passwordHash);
      if (!valid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
      }
      // Return a simple session token (hash-based for simplicity)
      const token = await bcrypt.hash(admin.passwordHash + Date.now(), 4);
      return NextResponse.json({ success: true, token });
    }

    if (action === "change-password") {
      const admin = await AdminUser.findOne({ username: "admin" });
      if (!admin) {
        return NextResponse.json({ error: "No admin account" }, { status: 404 });
      }
      const valid = await bcrypt.compare(password, admin.passwordHash);
      if (!valid) {
        return NextResponse.json(
          { error: "Current password incorrect" },
          { status: 401 }
        );
      }
      admin.passwordHash = await bcrypt.hash(newPassword, 12);
      await admin.save();
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
