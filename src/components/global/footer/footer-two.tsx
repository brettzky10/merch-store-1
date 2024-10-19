import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Bungee } from "next/font/google";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DumbbellIcon, FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import Image from 'next/image';

const font = Bungee({ subsets: ["latin"], weight: "400" });


type Props = {}

const FooterSection = (props: Props) => {
  return (
    <footer className="bg-muted py-12">
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            {/* <DumbbellIcon className="w-8 h-8 text-primary mx-1" /> */}
            
              <Image
                src={'/images/neon.svg'}
                width={50}
                height={50}
                alt=" logo"
                className='rounded-xl h-full'
              />
            <span className={`text-xl font-bold ${font.className}`}>Case Cobra</span>
          </Link>
          <p className="text-muted-foreground">
            We are here to make the difference in getting you that sale.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="font-semibold">Blog</h3>
          <Link href="/blog" className="hover:underline" prefetch={false}>
            Sell faster on Kijiji with these tools
          </Link>
          <Link href="/blog" className="hover:underline" prefetch={false}>
            Need better product images?
          </Link>
          <Link href="/blog" className="hover:underline" prefetch={false}>
            Better resell value with a better images
          </Link>
          <Link href="/blog" className="hover:underline" prefetch={false}>
            Resell your products
          </Link>
        </div>
        <div className="grid gap-2">
          <h3 className="font-semibold">Site</h3>
          <Link href="/buy" className="hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="/buy" className="hover:underline" prefetch={false}>
            Pricing
          </Link>
          <Link href="/terms" className="hover:underline" prefetch={false}>
            Terms
          </Link>
          <Link href="/join" className="hover:underline" prefetch={false}>
            Contact
          </Link>
        </div>
        <div className="grid gap-2">
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex gap-2">
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <FacebookIcon className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <InstagramIcon className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <TwitterIcon className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <YoutubeIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection


{/*  */}