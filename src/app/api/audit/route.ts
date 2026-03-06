import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/lib/AdminUser";
import AuditLog from "@/lib/AuditLog";

async function verifyAdmin(password: string): Promise<boolean> {
  const admin = await AdminUser.findOne({ username: "admin" });
  if (!admin) return false;
  return bcrypt.compare(password, admin.passwordHash);
}

// POST — fetch audit logs (admin only, password in body)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, limit: reqLimit } = body;
    const limit = parseInt(reqLimit || "50");

    await dbConnect();
    if (!password || !(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const logs = await AuditLog.find({})
      .sort({ createdAt: -1 })
      .limit(limit);
    const total = await AuditLog.countDocuments();
    return NextResponse.json({ logs, total });
  } catch {
    return NextResponse.json({ logs: [], total: 0 }, { status: 200 });
  }
}
