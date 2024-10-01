import Link from "next/link"
import { Menu, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import getProducts from '@/lib/actions/getProducts';
import productShuffle from '@/lib/utils';
import ProductGrid from "@/components/global/store/product/ProductGrid";
import ProductCarousel from '@/components/global/store/product/ProductCarousel';
import { artworks, categories } from "@/lib/data/data"


export default async function Home() {

  //Printful Products
  const products = await getProducts();
  const productData = await productShuffle(products);

  


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-18 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <img
                alt={artworks[0].name}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height="550"
                src={artworks[0].images[0]}
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Unique Artworks
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Explore our curated collection of contemporary art from emerging and established artist ViV.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Shop Now</Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Artworks</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {artworks.map((artwork) => (
                <div key={artwork.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    alt={artwork.name}
                    className="h-60 w-full object-cover transition-transform group-hover:scale-105"
                    height="300"
                    src={artwork.images[0]}
                    width="400"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity group-hover:opacity-100 opacity-0 flex items-center justify-center">
                    <Button variant="secondary">View Details</Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{artwork.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{artwork.category}</p>
                    <p className="mt-2 font-bold">${artwork.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ProductGrid products={productData} />
        <ProductCarousel products={productData}/>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Browse by Category</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/${category.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    alt={category}
                    className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                    height="200"
                    src={`/placeholder.svg?height=200&width=300&text=${category}`}
                    width="300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{category}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-100 dark:bg-gray-800">
        <div className="container flex flex-col gap-4 py-8 md:flex-row md:gap-8">
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-medium">ViV </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Curating exceptional artworks from Canada, bringing beauty and inspiration to your space.
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/shipping">Shipping & Returns</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          {/* <div className="flex-1 space-y-4">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <form className="flex flex-col gap-2 sm:flex-row">
              <Input placeholder="Enter your email" type="email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div> */}
        </div>
        <div className="border-t py-6 text-center text-sm">
          <p>© 2024 ViV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}



/* import React from 'react'
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
} */


