import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      type: { include: { category: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(products);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  const { name, price, typeId, slug, description, imageUrl } = await request.json();
  const created = await prisma.product.create({ data: {
    name,
    price: parseFloat(price),
    slug,
    description,
    imageUrl,
    typeId
  }});
  return NextResponse.json(created);
}
