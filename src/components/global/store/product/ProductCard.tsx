"use client"
// import Image from 'next/image';
import { Product } from '@/lib/types/Product';
//import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedVariant] = useState(product.sync_variants[0]);

  return (
    <>
      <Link href={`/products/${product.sync_product.id}`}
      >
        <Card key={product.sync_product.id} onClick={() => console.log("item pressed")}>
          <CardContent className="overflow-visible p-0 bg-[#999999]">
            <Image
              //removeWrapper
              width={100}
              height={100}
              alt={product.sync_product.name}
              className="w-full object-cover h-auto"
              src={product.sync_product.thumbnail_url}
              fetchPriority='auto'
            />
          </CardContent>
          <CardFooter className="text-sm flex flex-col justify-between">
            <b>{product.sync_product.name}</b>
            <p className="text-current">${selectedVariant.retail_price} {selectedVariant.currency}</p>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default ProductCard;
