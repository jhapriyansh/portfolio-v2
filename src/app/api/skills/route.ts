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

// POST — add skill to category (creates if new, appends if exists)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, title, skill, icon, color, order } = body;
    await dbConnect();
    if (!(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!title || !skill) {
      return NextResponse.json(
        { error: "Title and skill are required" },
        { status: 400 }
      );
    }

    const existing = await SkillCategory.findOne({ title });
    if (existing) {
      if (existing.skills.includes(skill)) {
        return NextResponse.json(
          { error: `"${skill}" already exists in "${title}"` },
          { status: 400 }
        );
      }
      existing.skills.push(skill);
      await existing.save();
      return NextResponse.json(existing, { status: 200 });
    } else {
      const cat = await SkillCategory.create({
        title,
        icon: icon || "⌨️",
        color: color || "#a6ff00",
        skills: [skill],
        order: order ?? 0,
      });
      return NextResponse.json(cat, { status: 201 });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to create/update skill category" },
      { status: 500 }
    );
  }
}

// PUT — update a skill category or remove a single skill (admin)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { password, _id, removeSkill, ...data } = body;
    await dbConnect();
    if (!(await verifyAdmin(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (removeSkill) {
      const cat = await SkillCategory.findById(_id);
      if (!cat) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      cat.skills = cat.skills.filter((s: string) => s !== removeSkill);
      if (cat.skills.length === 0) {
        await SkillCategory.findByIdAndDelete(_id);
        return NextResponse.json({ deleted: true });
      }
      await cat.save();
      return NextResponse.json(cat);
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
