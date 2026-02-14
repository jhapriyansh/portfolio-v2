import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/lib/AdminUser";
import SkillCategory from "@/lib/SkillCategory";

async function verifyAdmin(password: string): Promise<boolean> {
  const admin = await AdminUser.findOne({ username: "admin" });
  if (!admin) return false;
  return bcrypt.compare(password, admin.passwordHash);
}

// GET — fetch all skill categories (public)
export async function GET() {
  try {
    await dbConnect();
    const categories = await SkillCategory.find({}).sort({ order: 1 });
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

// POST — create a skill category (admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, ...data } = body;
    await dbConnect();
    if (!(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const cat = await SkillCategory.create(data);
    return NextResponse.json(cat, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create skill category" },
      { status: 500 }
    );
  }
}

// PUT — update a skill category (admin)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { password, _id, ...data } = body;
    await dbConnect();
    if (!(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const cat = await SkillCategory.findByIdAndUpdate(_id, data, { new: true });
    return NextResponse.json(cat);
  } catch {
    return NextResponse.json(
      { error: "Failed to update skill category" },
      { status: 500 }
    );
  }
}

// DELETE — delete a skill category (admin)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const password = searchParams.get("password");
    await dbConnect();
    if (!password || !(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await SkillCategory.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete skill category" },
      { status: 500 }
    );
  }
}
