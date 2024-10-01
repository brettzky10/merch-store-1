import { NextResponse } from 'next/server'
import  prismadb  from '@/lib/prismadb'

async function updateOrderInDatabase(orderData: any) {
  const {
    external_id,
    status,
    shipments,
    items,
    incomplete_items
  } = orderData

  const hasIncompleteItems = incomplete_items && incomplete_items.length > 0
  const hasDiscontinuedItems = items.some((item: any) => item.discontinued)
  const hasOutOfStockItems = items.some((item: any) => item.out_of_stock)

  const shipment = shipments[0] // Assuming we're dealing with the first shipment

  try {
    await prismadb.printfulOrder.update({
      where: { externalId: external_id },
      data: {
        status: status,
        trackingUrl: shipment?.tracking_url || null,
        shipDate: shipment?.ship_date ? new Date(shipment.ship_date) : null,
        hasIncompleteItems: hasIncompleteItems,
        hasDiscontinuedItems: hasDiscontinuedItems,
        hasOutOfStockItems: hasOutOfStockItems,
      },
    })
    console.log(`Order ${external_id} updated successfully`)
  } catch (error) {
    console.error(`Error updating order ${external_id}:`, error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const webhookData = await request.json()

    switch (webhookData.type) {
      case 'order_updated':
        try {
          await updateOrderInDatabase(webhookData.data.order)
          return NextResponse.json({ message: 'Order updated successfully' }, { status: 200 })
        } catch (error) {
          console.error('Error updating order:', error)
          return NextResponse.json({ message: 'Error updating order, but webhook received' }, { status: 200 })
        }

      /* case 'package_shipped':
        try {
          await updateOrderInDatabase(webhookData.data.order)
          return NextResponse.json({ message: 'Order shipped and updated successfully' }, { status: 200 })
        } catch (error) {
          console.error('Error updating shipped order:', error)
          return NextResponse.json({ message: 'Error updating shipped order, but webhook received' }, { status: 200 })
        } */

      default:
        console.log(`Unhandled webhook event: ${webhookData.type}`)
        return NextResponse.json({ message: 'Unhandled webhook event, but received successfully' }, { status: 200 })
    }
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ message: 'Error processing webhook, but received' }, { status: 200 })
  }
}