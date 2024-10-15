'use server'

import { revalidatePath } from 'next/cache'
import prismadb from '../prismadb'



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