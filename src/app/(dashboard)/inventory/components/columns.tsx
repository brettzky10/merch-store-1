"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";


export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  isAvailableForPurchase: boolean;
  quantity: number;
  imagePath: string;
  createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  /* {
    accessorKey: "imagePath",
    header: "Image",
    cell: ({ row })=> (
        
        <Image
          src={row.original.imagePath}
          alt={row.original.name}
          width={30}
          height={30}
          className="rounded-md"
        />
        
    )
  }, */
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "priceInCents",
    header: "Price",
    cell: ({ row })=> (
        ( row.original.priceInCents / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})
    )
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "isAvailableForPurchase",
    header: "Available",
    cell: ({ row })=> (
      row.original.isAvailableForPurchase == true
      ? <Badge variant={"gradient"}>True</Badge>
      : <Badge variant={"destructive"}>False</Badge>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row})=> <CellAction data={row.original}/>
  }
]
