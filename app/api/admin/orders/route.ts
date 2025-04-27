import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { product: true }
      }
    }
  });
  return NextResponse.json(orders);
}

interface PatchBody {
  id: string;
  status: string;
}
export async function PATCH(request: Request) {
  const { id, status }: PatchBody = await request.json();
  const updated = await prisma.order.update({
    where: { id },
    data: { status }
  });
  return NextResponse.json(updated);
}