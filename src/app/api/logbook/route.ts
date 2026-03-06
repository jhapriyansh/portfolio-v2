import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import LogEntry from "@/lib/LogEntry";
import AdminUser from "@/lib/AdminUser";
import AuditLog from "@/lib/AuditLog";

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

    await AuditLog.create({
      action: "create",
      entity: "logbook",
      entityId: entry._id.toString(),
      description: `Created log entry "${title}"`,
    });

    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
}

// DELETE — delete a log entry (requires admin password in body)
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id, password } = body;

    await dbConnect();
    if (!password || !(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entry = await LogEntry.findByIdAndDelete(id);
    await AuditLog.create({
      action: "delete",
      entity: "logbook",
      entityId: id || undefined,
      description: `Deleted log entry "${entry?.title || id}"`,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}

// PUT — update a log entry (requires admin password)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { password, _id, ...data } = body;
    await dbConnect();
    if (!(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const entry = await LogEntry.findByIdAndUpdate(_id, data, { new: true });
    await AuditLog.create({
      action: "update",
      entity: "logbook",
      entityId: _id,
      description: `Updated log entry "${entry?.title}"`,
    });
    return NextResponse.json(entry);
  } catch {
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}
