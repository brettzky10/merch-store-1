'use server'

import prismadb from '@/lib/prismadb'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id || !user.email) {
    throw new Error('Invalid user data')
  }

  const existingUser = await prismadb.owner.findFirst({
    where: { id: user.id },
  })

  if (!existingUser) {
    await prismadb.owner.create({
      data: {
        id: user.id,
        email: user.email,
        user_id: user.id
      },
    })
  }

  return { success: true }
}
