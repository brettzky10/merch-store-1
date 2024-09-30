"use client"

import React, { useCallback, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Product } from '@/lib/types/Product';
import Link from 'next/link'
import ProductCard from './ProductCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


  interface ProductGridProps {
    products: Product[];
  }


  const ProductCarousel: React.FC<ProductGridProps> = ({ products }) => {


  return (
  
        <Carousel className=" w-3/4">
      <CarouselContent>

          {products.map((product) => (
            <CarouselItem key={product.sync_product.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <ProductCard product={product} key={product.sync_product.id} />
            </CarouselItem>
          ))}
          </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default ProductCarousel;