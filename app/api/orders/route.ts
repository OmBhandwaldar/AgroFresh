import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const { house, building, landmark, city, state, pincode } = await req.json();

  const cart = await prisma.cart.findFirst({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      name: session.user.name,
      contact: session.user.phone,
      house,
      building,
      landmark,
      city,
      state,
      pincode,
      items: {
        create: cart.items.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.product.price,
        })),
      },
    },
    include: { items: { include: { product: true } } },
  });

  // clear the cart
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return NextResponse.json(order);
}
