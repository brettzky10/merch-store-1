"use server"

import prismadb from '@/lib/prismadb'
import { orderStatus } from '@prisma/client'

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string
  newStatus: orderStatus
}) => {
  await prismadb.order.update({
    where: { id },
    data: { status: newStatus },
  })
}
