import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, phone, password } = await req.json();
  if (!name || !phone || !password) {
    return NextResponse.json(
      { error: "Name, phone & password are required" },
      { status: 400 }
    );
  }
  if (await prisma.user.findUnique({ where: { phone } })) {
    return NextResponse.json(
      { error: "Phone already registered" },
      { status: 409 }
    );
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, phone, password: hashed },
  });
  return NextResponse.json({
    success: true,
    user: { id: user.id, name: user.name, phone: user.phone },
  });
}
