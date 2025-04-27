import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';


// export async function GET(req: NextRequest) {
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  let cart = await prisma.cart.findFirst({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { user: { connect: { id: session.user.id } } },
      include: { items: { include: { product: true } } },
    });
  }

  return NextResponse.json(cart);
}

export async function POST(req: NextRequest) {
  const { productId, quantity = 1 } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  let cart = await prisma.cart.findFirst({ where: { userId: session.user.id } });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { user: { connect: { id: session.user.id } } },
    });
  }

  const item = await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    create: { cartId: cart.id, productId, quantity },
    update: { quantity: { increment: quantity } },
    include: { product: true },
  });

  return NextResponse.json(item);
}