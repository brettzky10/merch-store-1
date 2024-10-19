'use server'

import { revalidatePath } from 'next/cache'
import prismadb from '../../prismadb'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { orderStatus } from '@prisma/client'

//Printful Orders
export async function getOrders() {
  return await prismadb.printfulOrder.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getOrdersThisMonth() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const ordersThisMonth = await prismadb.printfulOrder.count({
    where: {
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  })

  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  const ordersLastMonth = await prismadb.printfulOrder.count({
    where: {
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
  })

  const percentIncrease = ordersLastMonth > 0
    ? ((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100
    : 0

  return { ordersThisMonth, percentIncrease }
}

export async function getTotalSalesThisMonth() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const salesThisMonth = await prismadb.printfulOrder.aggregate({
    where: {
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    _sum: {
      totalCost: true,
    },
  })

  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  const salesLastMonth = await prismadb.printfulOrder.aggregate({
    where: {
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
    _sum: {
      totalCost: true,
    },
  })

  const totalSalesThisMonth = salesThisMonth._sum.totalCost || 0
  const totalSalesLastMonth = salesLastMonth._sum.totalCost || 0

  const percentIncrease = totalSalesLastMonth > 0
    ? ((totalSalesThisMonth - totalSalesLastMonth) / totalSalesLastMonth) * 100
    : 0

  return { totalSalesThisMonth, percentIncrease }
}

//Printful Order from Webhook
export async function createOrderFromPrintful(printfulData: any) {
  const { result } = printfulData

  const order = await prismadb.printfulOrder.create({
    data: {
      externalId: result.external_id,
      status: result.status,
      shippingMethod: result.shipping,
      shippingService: result.shipping_service_name,
      createdAt: new Date(result.created * 1000),
      updatedAt: new Date(result.updated * 1000),
      recipientName: result.recipient.name,
      recipientAddress: result.recipient.address1,
      recipientCity: result.recipient.city,
      recipientState: result.recipient.state_name,
      recipientCountry: result.recipient.country_name,
      recipientZip: result.recipient.zip,
      recipientPhone: result.recipient.phone,
      recipientEmail: result.recipient.email,
      totalCost: result.costs.total,
      currency: result.costs.currency,
      costsCurrency: result.costs.currency,
      costsSubtotal: result.costs.subtotal,
      costsDiscount: result.costs.discount,   
      costsShipping: result.costs.shipping,    
      costsDigitization: result.costs.digitization, 
      costsAdditional: result.costs.additional_fee,   
        costsTax: result.costs.tax,        
        costsVat: result.costs.vat,        
        costsTotal: result.costs.total,      
        retailCurrency: result.retail_costs.currency,  
        retailSubtotal: result.retail_costs.subtotal,
        retailDiscount: result.retail_costs.discount,  
        retailShipping: result.retail_costs.shipping,   
        retailTotal: result.retail_costs.total,      
        dashboardUrl: result.dashboard_url     
    },
  })



  revalidatePath('/dashboard')
  return order
}



//Custom Orders

export async function getCustomOrders() {
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
}


//Custom Orders

export async function getCustomOrderStats() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) {
    throw new Error("Unauthorized")
  }

  const owner = await prismadb.owner.findUnique({
    where: { id: user.id, user_id: user.id },
  })

  if (!owner) {
    throw new Error("Owner not found")
  }

  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  const customOrdersThisMonth = await prismadb.order.count({
    where: {
      ownerId: owner.id,
      createdAt: { gte: firstDayOfMonth },
    },
  })

  const ordersLastMonth = await prismadb.order.count({
    where: {
      ownerId: owner.id,
      createdAt: { gte: firstDayOfLastMonth, lt: firstDayOfMonth },
    },
  })

  const totalSalesThisMonth = await prismadb.order.aggregate({
    where: {
      ownerId: owner.id,
      createdAt: { gte: firstDayOfMonth },
    },
    _sum: {
      amount: true,
    },
  })

  const totalSalesLastMonth = await prismadb.order.aggregate({
    where: {
      ownerId: owner.id,
      createdAt: { gte: firstDayOfLastMonth, lt: firstDayOfMonth },
    },
    _sum: {
      amount: true,
    },
  })

  const customOrderChange = ordersLastMonth > 0 
    ? ((customOrdersThisMonth - ordersLastMonth) / ordersLastMonth) * 100 
    : 0

  const customSalesChange = totalSalesLastMonth._sum.amount && totalSalesLastMonth._sum.amount > 0
    ? ((totalSalesThisMonth._sum.amount! - totalSalesLastMonth._sum.amount) / totalSalesLastMonth._sum.amount) * 100
    : 0

  return {
    customOrdersThisMonth,
    totalCustomSalesThisMonth: totalSalesThisMonth._sum.amount || 0,
    customOrderChange,
    customSalesChange,
  }
}

export async function getRecentCustomOrders() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) {
    throw new Error("Unauthorized")
  }

  const owner = await prismadb.owner.findUnique({
    where: { id: user.id, user_id: user.id },
  })

  if (!owner) {
    throw new Error("Owner not found")
  }

  const orders = await prismadb.order.findMany({
    where: { ownerId: owner.id },
    include: {
      shippingAddress: true,
      configuration: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return orders
}


export async function updateOrderStatus(orderId: string, newStatus: orderStatus) {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) {
      throw new Error('Unauthorized')
    }

    const owner = await prismadb.owner.findUnique({
      where: { id: user.id, user_id: user.id },
    })

    if (!owner) {
      throw new Error('Owner not found')
    }

    const updatedOrder = await prismadb.order.updateMany({
      where: {
        id: orderId,
        ownerId: owner.id, // Ensure the order belongs to the authenticated owner
      },
      data: {
        status: newStatus,
      },
    })

    if (updatedOrder.count === 0) {
      throw new Error('Order not found or not authorized to update')
    }

    return true
  } catch (error) {
    console.error('Failed to update order status:', error)
    return false
  }
}