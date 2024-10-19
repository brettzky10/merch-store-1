"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Copy, Truck, MoreVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Switch } from '@/components/ui/switch'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { order, shippingAddress, billingAddress, configuration, orderStatus } from '@prisma/client'
import { updateOrderStatus } from '@/lib/actions/dashboard/orders'
import StatusDropdown from './status-dropdown'

interface OrderDetailsProps {
  order: order & {
    shippingAddress: shippingAddress | null
    billingAddress: billingAddress | null
    configuration: configuration
  }
}

export default function CustomOrderDetails({ order }: OrderDetailsProps) {
  const [isShipped, setIsShipped] = useState(order.status === 'shipped')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [status, setStatus] = useState<orderStatus>(order.status)

  const handleStatusChange = async () => {
    if (status === 'shipped' || status === 'fulfilled') return // Prevent toggling back

    const newStatus: orderStatus = 'shipped'
    const success = await updateOrderStatus(order.id, newStatus)
    if (success) {
      setStatus(newStatus)
      setIsPopoverOpen(false)
    } else {
      // Handle error
      console.error('Failed to update order status')
    }
  }

  if (!order) {
    return null
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order {order.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Date: {new Date(order.createdAt).toLocaleDateString()}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button size="sm" variant="outline" className="h-8 gap-1" disabled>
                  <Truck className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Track Order
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                No tracking number yet
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center space-x-2">
            <Label htmlFor="shipped-status">Shipped</Label>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Switch
                  id="shipped-status"
                  checked={isShipped}
                  onCheckedChange={() => !isShipped && setIsPopoverOpen(true)}
                  disabled={isShipped}
                />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Confirm Status Change</h4>
                    <p className="text-sm text-muted-foreground">
                      Are you sure you want to mark this order as shipped?
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleStatusChange}>Continue</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
  <div className="grid gap-3">
    <div className="font-semibold">Order Details</div>
    <ul className="grid gap-3">
      <li className="flex items-center justify-between">
        <span className="text-muted-foreground">Total Cost</span>
        <span>${order.amount.toFixed(2)}</span>
      </li>
      <li className="flex items-center justify-between">
        <span className="text-muted-foreground">Status</span>
        <span className="capitalize"><StatusDropdown id={order.id} OrderStatus={order.status} /></span> {/* {order.status.replace('_', ' ')} */}
      </li>
      <li className="flex items-center justify-between">
        <span className="text-muted-foreground">Payment Status</span>
        <span>{order.isPaid ? 'Paid' : 'Unpaid'}</span>
      </li>
    </ul>
    <Separator className="my-2" />
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-3">
        <div className="font-semibold">Shipping Information</div>
        {order.shippingAddress ? (
          <address className="grid gap-0.5 not-italic text-muted-foreground">
            <span>{order.shippingAddress.name}</span>
            <span>{order.shippingAddress.street}</span>
            <span>{`${order.shippingAddress.city}, ${order.shippingAddress.state || ''} ${order.shippingAddress.postalCode}`}</span>
            <span>{order.shippingAddress.country}</span>
            {order.shippingAddress.phoneNumber && <span>Phone: {order.shippingAddress.phoneNumber}</span>}
          </address>
        ) : (
          <span className="text-muted-foreground">No shipping address provided</span>
        )}
      </div>
      <div className="grid auto-rows-max gap-3">
        <div className="font-semibold">Billing Information</div>
        {order.billingAddress ? (
          <address className="grid gap-0.5 not-italic text-muted-foreground">
            <span>{order.billingAddress.name}</span>
            <span>{order.billingAddress.street}</span>
            <span>{`${order.billingAddress.city}, ${order.billingAddress.state || ''} ${order.billingAddress.postalCode}`}</span>
            <span>{order.billingAddress.country}</span>
            {order.billingAddress.phoneNumber && <span>Phone: {order.billingAddress.phoneNumber}</span>}
          </address>
        ) : (
          <span className="text-muted-foreground">Same as shipping address</span>
        )}
      </div>
    </div>
    <Separator className="my-4" />
    <div className="grid gap-3">
      <div className="font-semibold">Product Configuration</div>
      <dl className="grid gap-3">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Model</dt>
          <dd className="capitalize">{order.configuration.model?.replace('iphone', 'iPhone ')}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Color</dt>
          <dd className="capitalize">{order.configuration.color}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Material</dt>
          <dd className="capitalize">{order.configuration.material}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Finish</dt>
          <dd className="capitalize">{order.configuration.finish}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Dimensions</dt>
          <dd>{`${order.configuration.width} x ${order.configuration.height}`}</dd>
        </div>
      </dl>
    </div>
  </div>
</CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime={order.updatedAt.toISOString()}>{new Date(order.updatedAt).toLocaleString()}</time>
        </div>
      </CardFooter>
    </Card>
  )
}




