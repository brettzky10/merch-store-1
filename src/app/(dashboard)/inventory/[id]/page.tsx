/* import prismadb from "@/lib/prismadb";
import { ProductForm } from "@/components/products/add-product-form";

const ProductPage = async ({
    params
}: {
    params: {productId: string}
})=>{

    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
    });

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    initialData={product}
                />
            </div>
        </div>
    );
};
export default ProductPage; */

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page