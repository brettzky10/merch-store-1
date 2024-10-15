'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getProduct, saveProduct } from '@/lib/actions/my-products'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
//import { createClient } from '@/lib/supabase/supabase-client'
import { Product } from '@/lib/types'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'



export default function ProductForm({ productId }: { productId: string}) {
  const [product, setProduct] = useState<Product>({
    id: productId,
    imagePath: '/icons/placeholder.svg',
    name: '',
    description: '',
    //category: '',
    isAvailableForPurchase: true,
    priceInCents: 0,
    quantity: 1,
    createdAt: new Date(),
  })
  const [isLoading, setIsLoading] = useState(true)
  const [charCount, setCharCount] = useState(0)
  const [rawValue, setRawValue] = useState('')
  const [displayValue, setDisplayValue] = useState('')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  
  const handleTextChange = (event: any) => {
    setCharCount(event.target.value.length)
  }

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProduct(productId)
      if(data){
        setProduct(data)
      }
      setIsLoading(false)
    }
    fetchProduct()
  }, [productId])

  //Handle Price Input
    const formatAsCurrency = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '')
    
    // Convert to cents
    const cents = parseInt(digits, 10)
    
    // Format as currency
    return cents ? `$${(cents / 100).toFixed(2)}` : ''
  }



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    
    // Remove dollar sign and decimal for raw value
    const raw = input.replace(/[\$,]/g, '')
    setRawValue(raw)

    // Format for display
    setDisplayValue(formatAsCurrency(raw))
  }

  const handleBlur = () => {
    // Ensure proper formatting when leaving the input
    setDisplayValue(formatAsCurrency(rawValue))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await saveProduct(formData)
    toast.success("New Product Created",{ description: 'Your product was added successfully!'})
    setIsLoading(false)
  }

  

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setCapturedImage(imageUrl)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <Label htmlFor="image-capture">Capture Image</Label>
          <div 
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
            onClick={handleImageClick}
          >
            <div className="space-y-1 text-center">
              {capturedImage ? (
                <Image
                  src={capturedImage}
                  alt="Captured image"
                  width={100}
                  height={100}
                  className="mx-auto object-cover rounded-md"
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="image-capture"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                >
                  <span>{capturedImage ? 'Change photo' : 'Capture photo'}</span>
                  <Input
                    id="imagePath" name="imagePath" 
                    required
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="sr-only"
                    onChange={handleImageCapture}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 3MB</p>
            </div>
          </div>
        </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <Input type="text" id="name" name="name" defaultValue={product?.name || ''} placeholder='Product Name' required className="mt-1 block w-full" />
      </div>
      <div className='relative'>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea
          id='description' name='description' defaultValue={product?.description || ''} placeholder='Product Description' required maxLength={300}
          onChange={handleTextChange}
        />
        <div className="absolute bottom-3 right-3 text-sm text-muted-foreground">{charCount}/300</div>
        {/* <Input type="text" id="description" name="description" defaultValue={product?.description || ''} required className="mt-1 block w-full" /> */}
      </div>
        <div className='flex flex-row items-center justify-between gap-5'>
        <div>
        <label htmlFor="priceInCents" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <Input
          type="text"
          id="priceInCents"
          name="priceInCents"
          required
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="$0.00"
        />
       {/*  <Input type="number" id="priceInCents" name="priceInCents" defaultValue={product?.priceInCents || 0} required className="mt-1 block w-full" /> */}
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <Input type="number" id="quantity" name="quantity" defaultValue={product?.quantity || 1} required className="mt-1 block w-full" />
      </div>
        </div>



      <div className=''>
        <label htmlFor="isAvailableForPurchase" className="block text-sm font-medium text-gray-700">
          Available for Purchase
        </label>
        <select id="isAvailableForPurchase" name="isAvailableForPurchase" defaultValue={product?.isAvailableForPurchase ? 'true' : 'false'} required className="mt-1 block w-full border border-black rounded-xl h-8 px-2">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      
      <Button type="submit" className="w-full">
        {!isLoading ? 'Save Product' : 'Loading..'}
      </Button>
    </form>
  )
}