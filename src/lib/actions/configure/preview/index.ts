'use server'

import { BASE_PRICE, PRODUCT_PRICES } from '@/lib/config/products'
import prismadb from '@/lib/prismadb'
import { stripe } from '@/lib/stripe'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { order } from '@prisma/client'

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string
}) => {
  const configuration = await prismadb.configuration.findUnique({
    where: { id: configId },
  })

  if (!configuration) {
    throw new Error('No such configuration found')
  }

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    throw new Error('You need to be logged in')
  }

  const { finish, material } = configuration

  let price = BASE_PRICE
  if (finish === 'textured') price += PRODUCT_PRICES.finish.textured
  if (material === 'polycarbonate')
    price += PRODUCT_PRICES.material.polycarbonate

  let order: order | undefined = undefined

  const existingOrder = await prismadb.order.findFirst({
    where: {
      ownerId: user.id,
      configurationId: configuration.id,
    },
  })

  console.log(user.id, configuration.id)

  if (existingOrder) {
    order = existingOrder
  } else {
    order = await prismadb.order.create({
      data: {
        amount: price / 100,
        ownerId: user.id,
        configurationId: configuration.id,
      },
    })
  }

  const product = await stripe.products.create({
    name: 'Custom iPhone Case',
    images: [configuration.imageUrl],
    default_price_data: {
      currency: 'USD',
      unit_amount: price,
    },
  })

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ['card'],
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['CA', 'US'] },
    metadata: {
      ownerId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  })

  return { url: stripeSession.url }
}
