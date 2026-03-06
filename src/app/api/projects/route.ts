import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/lib/AdminUser";
import Project from "@/lib/Project";
import AuditLog from "@/lib/AuditLog";

async function verifyAdmin(password: string): Promise<boolean> {
  const admin = await AdminUser.findOne({ username: "admin" });
  if (!admin) return false;
  return bcrypt.compare(password, admin.passwordHash);
}

// GET — fetch all projects (public)
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ order: 1 });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

// POST — create a project (admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, ...data } = body;
    await dbConnect();
    if (!(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const proj = await Project.create(data);
    await AuditLog.create({
      action: "create",
      entity: "project",
      entityId: proj._id.toString(),
      description: `Created project "${proj.title}"`,
    });
    return NextResponse.json(proj, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PUT — update a project (admin)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { password, _id, ...data } = body;
    await dbConnect();
    if (!(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const proj = await Project.findByIdAndUpdate(_id, data, { new: true });
    await AuditLog.create({
      action: "update",
      entity: "project",
      entityId: _id,
      description: `Updated project "${proj?.title}"`,
    });
    return NextResponse.json(proj);
  } catch {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE — delete a project (admin)
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id, password } = body;
    await dbConnect();
    if (!password || !(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const proj = await Project.findByIdAndDelete(id);
    await AuditLog.create({
      action: "delete",
      entity: "project",
      entityId: id || undefined,
      description: `Deleted project "${proj?.title || id}"`,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
