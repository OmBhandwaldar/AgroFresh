import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const types = await prisma.type.findMany({
    include: { category: true },
    orderBy: { name: 'asc' }
  });
  return NextResponse.json(types);
}