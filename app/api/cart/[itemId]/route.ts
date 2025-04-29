import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';



interface cartProps {
    params: Promise<{ 
        itemId: string 
    }>; 
}   
export async function PUT(req: NextRequest, { params }: cartProps) {
  const { quantity } = await req.json();
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: resolvedParams.itemId } });
    return NextResponse.json({ success: true });
  }

  const updated = await prisma.cartItem.update({
    where: { id: resolvedParams.itemId },
    data: { quantity },
    include: { product: true },
  });

  return NextResponse.json(updated);
}   


export async function DELETE(_req: NextRequest, { params }: cartProps) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  await prisma.cartItem.delete({ where: { id: resolvedParams.itemId } });
  return NextResponse.json({ success: true });
}
