'use client'

import { useEffect, useState } from 'react'
import { printfulOrder } from '@prisma/client'
import OrderDetails from './order-details'
import { 
  ChevronLeft, ChevronRight, Copy, CreditCard, File, Home, 
  LineChart, ListFilter, MoreVertical, Package, Package2, 
  PanelLeft, Search, Settings, ShoppingCart, TrendingDown, TrendingUp, Truck, Users2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from '../ui/progress'

interface OrdersDashboardProps {
    initialOrders: printfulOrder[]
    ordersThisMonth: { ordersThisMonth: number; percentIncrease: number } | null
    totalSalesThisMonth: { totalSalesThisMonth: number; percentIncrease: number } | null
  }

export function OrdersDashboard({ initialOrders, ordersThisMonth, totalSalesThisMonth }: OrdersDashboardProps) {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState<printfulOrder | null>(null)

  useEffect(() => {
    console.log('ordersThisMonth:', ordersThisMonth)
    console.log('totalSalesThisMonth:', totalSalesThisMonth)
  }, [ordersThisMonth, totalSalesThisMonth])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
    
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Orders This Month
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {ordersThisMonth ? (
                    <>
                      <div className="text-2xl font-bold">{ordersThisMonth.ordersThisMonth}</div>
                      <Progress value={ordersThisMonth.ordersThisMonth} max={1000} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        {ordersThisMonth.percentIncrease >= 0 ? (
                          <span className="text-green-500 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {ordersThisMonth.percentIncrease.toFixed(2)}% from last month
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center">
                            <TrendingDown className="h-4 w-4 mr-1" />
                            {Math.abs(ordersThisMonth.percentIncrease).toFixed(2)}% from last month
                          </span>
                        )}
                      </p>
                    </>
                  ) : (
                    <p>Loading orders data...</p>
                  )}
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
                  {totalSalesThisMonth ? (
                    <>
                      <div className="text-2xl font-bold">${totalSalesThisMonth.totalSalesThisMonth.toFixed(2)}</div>
                      <Progress value={totalSalesThisMonth.totalSalesThisMonth} max={1000} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        {totalSalesThisMonth.percentIncrease >= 0 ? (
                          <span className="text-green-500 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {totalSalesThisMonth.percentIncrease.toFixed(2)}% from last month
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center">
                            <TrendingDown className="h-4 w-4 mr-1" />
                            {Math.abs(totalSalesThisMonth.percentIncrease).toFixed(2)}% from last month
                          </span>
                        )}
                      </p>
                    </>
                  ) : (
                    <p>Loading sales data...</p>
                  )}
                </CardContent>
              </Card>
            
            </div>
            <Card>
              <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>Recent orders from your store.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">Type</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order: printfulOrder) => (
                      <TableRow key={order.id} className="cursor-pointer hover:bg-accent" onClick={() => setSelectedOrder(order)}>
                        <TableCell>
                          <div className="font-medium">{order.recipientName}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">{order.recipientEmail}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">Printful</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">{order.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{`${order.totalCost} ${order.currency}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <OrderDetails order={selectedOrder} />
        </div>
      </div>
    </div>
  )
}