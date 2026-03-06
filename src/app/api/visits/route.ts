import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/lib/AdminUser";
import Visit from "@/lib/Visit";

async function verifyAdmin(password: string): Promise<boolean> {
  const admin = await AdminUser.findOne({ username: "admin" });
  if (!admin) return false;
  return bcrypt.compare(password, admin.passwordHash);
}

// POST — record a visit (public) or fetch visit logs (admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Admin fetch: has password field
    if (body.password) {
      const { password, limit: reqLimit, days: reqDays } = body;
      const limit = parseInt(reqLimit || "100");
      const days = parseInt(reqDays || "30");

      await dbConnect();
      if (!(await verifyAdmin(password))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const since = new Date();
      since.setDate(since.getDate() - days);

      const visits = await Visit.find({ createdAt: { $gte: since } })
        .sort({ createdAt: -1 })
        .limit(limit);
      const total = await Visit.countDocuments({ createdAt: { $gte: since } });

      const pageCounts = await Visit.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: "$path", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
      ]);

      const dailyCounts = await Visit.aggregate([
        { $match: { createdAt: { $gte: since } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      return NextResponse.json({ visits, total, pageCounts, dailyCounts });
    }

    // Public: record a visit
    const { path, referrer } = body;
    const userAgent = request.headers.get("user-agent") || undefined;
    await dbConnect();
    await Visit.create({
      path: path || "/",
      referrer: referrer || undefined,
      userAgent,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
