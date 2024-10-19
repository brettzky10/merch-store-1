import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default async function productShuffle(products: any) {
  let shuffledProducts = [...products];

  for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
  }
  return shuffledProducts;

}


export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(price)
}

export function constructMetadata({
  title = 'CaseCobra - custom high-quality phone cases',
  description = 'Create custom high-quality phone cases in seconds',
  image = '/images/site/thumbnail.png',
  icons = '/images/site/favicon.ico',
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@joshtriedcoding',
    },
    icons,
    metadataBase: new URL("https://casecobra.vercel.app/")
  }
}