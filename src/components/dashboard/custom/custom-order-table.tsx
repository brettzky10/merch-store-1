"use client"

import { useState, useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CustomOrderDetails from './custom-order-details'
import { order, shippingAddress, billingAddress, configuration } from '@prisma/client'
import { ArrowUpDown  } from 'lucide-react'


type OrderWithRelations = order & {
  shippingAddress: shippingAddress | null
  billingAddress: billingAddress | null
  configuration: configuration
}

const columnHelper = createColumnHelper<OrderWithRelations>()

export default function CustomOrderTable({ orders }: { orders: OrderWithRelations[] }) {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo(() => [
    columnHelper.accessor('shippingAddress.name', {
      header: 'Customer',
      cell: info => info.getValue() || 'N/A',
    }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('amount', {
      header: 'Total',
      cell: info => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => info.getValue().replace('_', ' ').charAt(0).toUpperCase() + info.getValue().slice(1),
    }),
    columnHelper.accessor('id', {
      header: 'Order ID',
      cell: info => info.getValue(),
    }),
  ], [])

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="w-full">
        
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <Button
                      variant="ghost"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <Dialog key={row.id}>
              <DialogTrigger asChild>
                <TableRow className="cursor-pointer hover:bg-muted/50">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Custom Order Details</DialogTitle>
                </DialogHeader>
                <CustomOrderDetails order={row.original} />
              </DialogContent>
            </Dialog>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}