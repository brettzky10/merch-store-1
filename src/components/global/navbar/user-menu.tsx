"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { ReactNode } from "react";
import { CoinsIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
/**
 * This menu is used to display the user's options on the <Navbar /> component.
 */
export default function UserDropdownMenu({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/billing" className="">
          <DropdownMenuItem className="hover:bg-white/20 hover:cursor-pointer ">
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='my-2 flex flex-row items-center'>
                  <CoinsIcon className="size-4 mr-2" />
                  Billing
              </TooltipTrigger>
              <TooltipContent>
                Billing
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
            
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="hover:cursor-pointer">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='my-2'>
                <SignOutButton/>
              </TooltipTrigger>
              <TooltipContent>
                Sign out
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
