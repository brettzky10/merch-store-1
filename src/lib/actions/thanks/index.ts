'use server'

import prismadb from '@/lib/prismadb'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id || !user.email) {
    throw new Error('You need to be logged in to view this page.')
  }

  const order = await prismadb.order.findFirst({
    where: { id: orderId, ownerId: user.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      owner: true,
    },
  })

  if (!order) throw new Error('This order does not exist.')

  if (order.isPaid) {
    return order
  } else {
    return false
  }
}
