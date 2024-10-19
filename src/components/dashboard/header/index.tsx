import React from 'react'

const DashboardBannerCard = () => {
  return (
    <div className='py-10 bg-zinc-100'>
    <a className="mx-20 block border border-gray-200 rounded-lg hover:shadow-sm focus:outline-none dark:border-neutral-700" href="/legal/privacy">
      <div className="relative flex items-center overflow-hidden">
        <img className="w-32 sm:w-48 h-full absolute inset-0 object-cover rounded-s-lg" src="/images/promotions/winter.jpg" alt="promotion Image"/>
    
        <div className="grow p-4 ms-32 sm:ms-48 bg-gradient-to-tr from-zinc-950 to-zinc-700 rounded-lg">
          <div className="min-h-24 flex flex-col justify-center">
            <h3 className="font-semibold text-3xl md:text-3xl text-gray-300 dark:text-neutral-300">
              Your Orders
            </h3>
            <p className="mt-1 text-gray-500 dark:text-neutral-500">
                Click on an order to view information about the order, including delivery and fulfillment options
            </p>
          </div>
        </div>
      </div>
    </a>
    </div>
  )
}

export default DashboardBannerCard