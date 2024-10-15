"use client"

import React from 'react'
import AppDrawer from '@/components/global/drawer'
import { Plus } from 'lucide-react'
import { Loader } from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import ProductForm from '@/components/products/add-product-form'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

const AddProductDrawer = () => {

    const params = useParams()

  return (
    <div>
        <TooltipProvider>
          <Tooltip delayDuration={1}>
            <TooltipTrigger className=' text-white'>
              <AppDrawer 
                description="create a product for your store"
                title="Add Product"
                onOpen={
                  <Button className="cursor-pointer text-white rounded-full border-2 flex flex-row items-center gap-2 text-sm font-light">
                    <Plus className='border border-white rounded-full w-4 h-4'/>
                    Add Product
                  </Button>
                }
              >
                <ProductForm productId=''/>
              </AppDrawer>
            </TooltipTrigger>
            <TooltipContent>
              Create Product 
            </TooltipContent>
          </Tooltip>
      </TooltipProvider>
      </div>
  )
}

export default AddProductDrawer