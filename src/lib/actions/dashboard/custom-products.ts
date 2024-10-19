/* 'use server'

import prismadb from '@/lib/prismadb'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getOrders() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error('Unauthorized');
    }

    let owner = await prismadb.owner.findUnique({
      where: { 
        id: user.id,
        user_id: user.id
    },
    });

    if (!owner) {
      // If the owner doesn't exist, create a new one
      owner = await prismadb.owner.create({
        data: {
          user_id: user.id,
          email: user.email,
          name: user.given_name && user.family_name 
            ? `${user.given_name} ${user.family_name}`
            : user.email,
        },
      });
    }

    const orders = await prismadb.order.findMany({
      where: { ownerId: owner.id },
      include: {
        shippingAddress: true,
        billingAddress: true,
        configuration: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw new Error('Failed to fetch orders');
  }
} */