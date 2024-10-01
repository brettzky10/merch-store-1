

import { MainNav } from "@/components/global/navbar/navbar-links";
import Link from "next/link";
import Image from "next/image";
import {  Home, MenuIcon, Paintbrush, } from "lucide-react";
import { Bungee } from "next/font/google";
import ShoppingCart from "../store/cart/ShoppingCart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const font = Bungee({ subsets: ["latin"], weight: "400" });

const NavbarDashboard = async ()=> {

    return (
        <div className="border-b">
            <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-30 dark:bg-primary-foreground/40 bg-white/30 backdrop-blur-lg">
                <div className="flex flex-row">
                <MainNav className="mx-2 md:hidden"/>
                <aside className="flex items-center group cursor-pointer">
                    <Link href="/" className="items-center flex flex-row">
                        <Image
                        src={'/images/neon.svg'}
                        width={40}
                        height={40}
                        alt=" logo"
                        className='rounded-xl'
                        />
                        <span className={`text-xl font-bold group-hover:text-teal-700 ${font.className}`}>ViV Store</span>
                    </Link>
                </aside>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                    <ShoppingCart />
                    <Sheet>
                        <SheetTrigger asChild>
                        <Button className="md:hidden" size="icon" variant="outline">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Launch Potion</span>
                        </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                        <div className="grid gap-6 p-6">
                            <Link
                            className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                            href="/"
                            >
                                <Home className="h-5 w-5" />
                                Home
                            </Link>
                            <Link
                            className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                            href="#"
                            >
                                <Paintbrush className="h-5 w-5" />
                                Products
                            </Link>
                        </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}

export default NavbarDashboard;