"use server"

import prismadb from "@/lib/prismadb"
import { createClient } from "@/lib/supabase/supabase-server";

export const AddProduct = async (name: string, description: string, priceInCents: number, imagePath: string, quantity: number) => {
    const supabase = createClient();
  
    const {
        data: { user },
    } = await supabase.auth.getUser();
      if (!user) return
      try {
  
        const ownerInfo = await prismadb.owner.findUnique({
          where: {
              user_id: user.id,
              email: user.email,
          },
        })
    
        if (ownerInfo) {
          
            const newProduct = await prismadb.product.create({
              data: {
                  name,
                  ownerId: ownerInfo.id,
                  description,
                  priceInCents,
                  quantity,
                  imagePath,
              },
            })
    
            if (newProduct) {
              return { status: 200, message: 'Product successfully added' }
            }
          } else {
          return {
            status: 400,
            message:
              "Error adding product.",
          } }
        } catch (error) {
          console.log(error) //Change to Status{error}
        }
        return {
          status: 400,
          message: 'Product add error',
        }
    }




export async function saveProduct(formData: FormData) {

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const quantity = parseInt(formData.get('quantity') as string, 10)
  const isAvailableForPurchase = formData.get('isAvailableForPurchase') === 'true'
  //const priceInCents = parseInt(formData.get('priceInCents') as string, 10)
  const imageFile = formData.get('imagePath') as File
  //const imagePath = formData.get('imagePath') as string

  //Parse Currency
  const numericAmount = parseFloat((formData.get('priceInCents') as string).replace(/[^\d.]/g, ''))
  // Convert to cents for storage
  const amountInCents = Math.round(numericAmount * 100)
  const priceInCents = amountInCents
  //const createdAt = formData.get('createdAt') as Date
  //const category = formData.get('category') as string
  // Upload image to Supabase
  //const supabase = createClient()
  /* const { data, error } = await supabase.storage.from('store-files').upload(`products/${imageFile.name}`, imageFile)

  if (error) {
    throw new Error('Failed to upload image')
  } 
    
  const imagePath = data?.path
  */

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

  if(ownerInfo){

        //Add to Supabase Bucket
        const { storage } = createClient();
        const randomNameId = `${ownerInfo.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const bucket = 'products'
        const path = `${ownerInfo.id}-${randomNameId}`   //`products/${ownerInfo.id}-${name}`

        const { data, error } = await storage.from(bucket).upload(path, imageFile);

        if (error) {
          return { imageUrl: "", error: "Image upload failed" };
        }

        const imagePath = `${process.env
          .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
          data?.path
        }`;

      //Add Product

      if (id) {
        // Update existing product
        return await prismadb.product.update({
          where: { id },
          data: { name, description, quantity, isAvailableForPurchase, priceInCents, imagePath },
        })
      } else {
        // Create new product
        return await prismadb.product.create({
          data: { name, description, quantity, isAvailableForPurchase, priceInCents, imagePath, ownerId: ownerInfo.id },
        })
      }

    }else {
      return {
        status: 400,
        message:
          "Error adding product.",
      } }
}

export async function getProduct(id: string) {
  return await prismadb.product.findUnique({
    where: { id: id },
  })
}