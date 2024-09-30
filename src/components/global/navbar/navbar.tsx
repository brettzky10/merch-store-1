
//import { currentUser } from "@clerk/nextjs/server";
//import prismadb from "@/lib/prismadb";
import { MainNav } from "@/components/global/navbar/navbar-links";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
//import { getCredits } from "@/lib/actions/get-credits";
import Link from "next/link";
import Image from "next/image";
import UserDropdownMenu from "@/components/global/navbar/user-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import {
    ClerkLoaded,
    ClerkLoading,
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
import { Loader2 } from "lucide-react";
import { Bungee } from "next/font/google";
import ShoppingCart from "../store/cart/ShoppingCart";

const font = Bungee({ subsets: ["latin"], weight: "400" });

const NavbarDashboard = async ()=> {


    
    //const credits = await getCredits()

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
                        <span className={`text-xl font-bold group-hover:text-teal-700 ${font.className}`}> Store</span>
                    </Link>
                </aside>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                    <ClerkLoading>
                        <Loader2 className=" animate-spin h-8 w-8"/>
                    </ClerkLoading>
                    <ClerkLoaded>
                    <SignedIn>
                        {/* <Badge variant="gradient">
                            <span className="text-sm font-normal text-white dark:text-zinc-400">
                            <span className="font-black text-lg dark:text-white ">{credits} credits</span>{" "}
                            </span>
                        </Badge> */}
                    <ShoppingCart />
                    <UserDropdownMenu>
                        <Image
                        src="/icons/user.svg"
                        width={32}
                        height={32}
                        className="rounded-full ring-1 ring-offset-1 ring-offset-black/50 ring-teal-900 hover:bg-gradient-to-tr hover:from-slate-600/70 hover:via-teal-900/70 hover:to-primary-foreground hover:cursor-pointer"
                        alt={'user'}
                        />
                    </UserDropdownMenu>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    </ClerkLoaded>
                </div>
            </div>
        </div>
    )
}

export default NavbarDashboard;