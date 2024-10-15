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


const InventoryPage = async ({
    
}: {
    
})=> {

    const supabase = createClient();
  
  const {
      data: { user },
  } = await supabase.auth.getUser();
    if (!user) return

    const ownerInfo = await prismadb.owner.findUnique({
      where: {
          user_id: user.id,
          email: user.email,
      },
    })

    const products = await prismadb.owner.findUnique({
        where: {
            user_id: user.id,
            email: user.email
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
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            {/* <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                    <Link href={`/store/${params.storeId}/dashboard`}>Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                    <Link href={`/store/${params.storeId}/products`}>Products</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                
                </BreadcrumbList>
            </Breadcrumb> */}
            
            <ProductClient data={formattedProducts} />
        </div>

    </div>
    )
}

export default InventoryPage;