import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import LogEntry from "@/lib/LogEntry";
import AdminUser from "@/lib/AdminUser";

async function verifyAdmin(password: string): Promise<boolean> {
  const admin = await AdminUser.findOne({ username: "admin" });
  if (!admin) return false;
  return bcrypt.compare(password, admin.passwordHash);
}

// GET — fetch log entries (public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    await dbConnect();
    const entries = await LogEntry.find({}).sort({ createdAt: -1 }).limit(limit);
    const total = await LogEntry.countDocuments();
    return NextResponse.json({ entries, total });
  } catch {
    return NextResponse.json(
      { entries: [], total: 0 },
      { status: 200 }
    );
  }
}

// POST — create a new log entry (requires admin password)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, tags, emoji, password } = body;

    await dbConnect();
    if (!(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entry = await LogEntry.create({
      title,
      content,
      tags: tags || [],
      emoji: emoji || "📝",
    });

    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
}

// DELETE — delete a log entry (requires admin password)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const password = searchParams.get("password");

    await dbConnect();
    if (!password || !(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await LogEntry.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}
