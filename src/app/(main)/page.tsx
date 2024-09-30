import React from 'react'
import getProducts from '@/lib/actions/getProducts';
import productShuffle from '@/lib/utils';
import ProductGrid from "@/components/global/store/product/ProductGrid";
import ProductCarousel from '@/components/global/store/product/ProductCarousel';



export default async function Home() {
  const products = await getProducts();

  const productData = await productShuffle(products);
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ProductGrid products={productData} />
        <ProductCarousel products={productData}/>
      </section>
    </>
  );
}


