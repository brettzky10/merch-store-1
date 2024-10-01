"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export function MainNav({
    className,
    ...props 
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/`,
            label: 'Home',
            active: pathname === `/`,
        },
        {
            href: `/about`,
            label: 'About',
            active: pathname === `/about`,
        },
        {
            href: `/terms`,
            label: 'Policies & Terms',
            active: pathname === `/terms`,
        },
        
    ];

    return(
        <nav className={cn("flex-1", className)}>
            <Sheet>
            <SheetTrigger asChild>
              <Button className="" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Menu Toggle</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-y-3 pt-10">
                { routes.map((route)=>(
                <Link key={route.href} href={route.href} className={cn("text-medium font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                 {route.label}
                </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </nav> //Merge classname with classname var (a cn specific thing)

    )
};