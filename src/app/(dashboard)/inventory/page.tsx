import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
//import { formatter } from "@/lib/utils";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { createClient } from "@/lib/supabase/supabase-server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


const InventoryPage = async ({
    
}: {
    
})=> {

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const products = await prismadb.owner.findUnique({
        where: {
            id: user.id,
            user_id: user.id,
            //email: user.email
        },
        select: {
            products: true
        },
    });

    const formattedProducts: ProductColumn[] = products!.products.map((item)=>({
        id: item.id,
        name: item.name,
        isAvailableForPurchase: item.isAvailableForPurchase,
        priceInCents: item.priceInCents,
        description: item.description,
        quantity: item.quantity,
        imagePath: item.imagePath,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
    <div className="flex-col ml-10">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                    <Link href={`/dashboard`}>Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                    <Link href={`/inventory`}>Inventory</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                
                </BreadcrumbList>
            </Breadcrumb>
            
            {/* <ProductClient data={formattedProducts} /> */}
        </div>

    </div>
    )
}

export default InventoryPage;