import { getOrders, getOrdersThisMonth, getTotalSalesThisMonth, getCustomOrders, getCustomOrderStats } from '@/lib/actions/dashboard/orders'

import { OrdersDashboard } from '@/components/dashboard/orders-dashboard'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, CreditCard } from "lucide-react"
//import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CustomOrderTable from '@/components/dashboard/custom/custom-order-table'
import DashboardBannerCard from '@/components/dashboard/header'
import { notFound } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { Progress } from '@/components/ui/progress'
import { formatPrice } from '@/lib/utils'

export default async function OrdersPage() {

 /*  const [orders, ordersThisMonth, totalSalesThisMonth, customOrders ] = await Promise.all([
    getOrders(),
    getOrdersThisMonth(),
    getTotalSalesThisMonth(),
    getCustomOrders(),
    
  ]) */

  const orders = await getOrders()
  const ordersThisMonth = await getOrdersThisMonth()
  const totalSalesThisMonth = await getTotalSalesThisMonth()
  const customOrders = await getCustomOrders()
  

  
/*     const customTotalOrders = await prismadb.order.findMany({
      where: {
        isPaid: true,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        owner: true,
        shippingAddress: true,
      },
    }) */
  
    const lastWeekSum = await prismadb.order.aggregate({
      where: {
        isPaid: true,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      _sum: {
        amount: true,
      },
    })
  
    const lastMonthSum = await prismadb.order.aggregate({
      where: {
        isPaid: true,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
      _sum: {
        amount: true,
      },
    })
  
    const WEEKLY_GOAL = 500
    const MONTHLY_GOAL = 2500

  const { customOrdersThisMonth, totalCustomSalesThisMonth, customOrderChange, customSalesChange } = await getCustomOrderStats()

  return (
  <div className='lg:ml-12 flex flex-col'>
      <DashboardBannerCard/>
      <Tabs defaultValue="custom" className="w-full">
      <TabsList className="grid w-[200px] grid-cols-2">
        <TabsTrigger value="custom">Custom</TabsTrigger>
        <TabsTrigger value="printful">Dropship</TabsTrigger>
      </TabsList>
      <TabsContent value="custom">
      <div className="container mx-auto py-10 space-y-10">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders This Month
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customOrdersThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              {customOrderChange.toFixed(2)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales This Month
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalCustomSalesThisMonth.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {customSalesChange.toFixed(2)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
                <CardHeader className='pb-2'>
                  <CardDescription>Goal: Last Week</CardDescription>
                  <CardTitle className='text-4xl'>
                    {formatPrice(lastWeekSum._sum.amount ?? 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-sm text-muted-foreground'>
                    of {formatPrice(WEEKLY_GOAL)} goal
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                  />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className='pb-2'>
                  <CardDescription>Goal: Last Month</CardDescription>
                  <CardTitle className='text-4xl'>
                    {formatPrice(lastMonthSum._sum.amount ?? 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-sm text-muted-foreground'>
                    of {formatPrice(MONTHLY_GOAL)} goal
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
                  />
                </CardFooter>
              </Card>
      </div>
        <CustomOrderTable
        orders={customOrders}
        />
        </div>
      </TabsContent>
      <TabsContent value="printful">
        <OrdersDashboard 
          initialOrders={orders} 
          ordersThisMonth={ordersThisMonth} 
          totalSalesThisMonth={totalSalesThisMonth} 
        />
      </TabsContent>
    </Tabs>
      
    </div>
  )
}

