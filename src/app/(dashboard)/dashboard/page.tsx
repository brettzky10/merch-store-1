import { getOrders, getOrdersThisMonth, getTotalSalesThisMonth } from '@/lib/actions/orders'
import { OrdersDashboard } from '@/components/dashboard/orders-dashboard'


export default async function OrdersPage() {
  const [orders, ordersThisMonth, totalSalesThisMonth] = await Promise.all([
    getOrders(),
    getOrdersThisMonth(),
    getTotalSalesThisMonth()
  ])

  return <OrdersDashboard 
    initialOrders={orders} 
    ordersThisMonth={ordersThisMonth} 
    totalSalesThisMonth={totalSalesThisMonth} 
  />
}