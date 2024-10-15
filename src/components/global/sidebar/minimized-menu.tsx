//import { SIDE_BAR_MENU } from '@/lib/sidebar-constants'

import React from 'react'
import { Box, FilePlus, LogOut, Receipt, Settings, ShirtIcon, ShoppingBag, Store, StoreIcon, Tag, Wand2 } from 'lucide-react'
import MenuItem from './menu-item'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { MenuLogoMin } from './menu-logo-min'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'



type MinMenuProps = {
  onShrink(): void
  current: string
  
}

type SIDE_BAR_MENU_PROPS = {
  label: string
  icon: JSX.Element
  path: string
}


export const MinMenu = ({
  onShrink,
  current,
}: MinMenuProps) => {
  //const params = useParams();

  const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
    {
      label: 'Dashboard',
      icon: <Store/>,
      path: `dashboard`,
    },
    {
      label: 'Inventory',
      icon: <ShirtIcon />,
      path: `inventory`,
    },
    /* {
      label: 'Discounts',
      icon: <Tag />,
      path: `discount-codes`,
    }, 
    {
      label: 'Orders',
      icon: <Box />,
      path: `orders`,
    },*/
    
  ]



  return (
    <div className="p-3 flex flex-col items-center h-full bg-sand">
      <span className="animate-fade-in  delay-300 fill-mode-forwards cursor-pointer">
        <MenuLogoMin onClick={onShrink}/>
      </span>
      
      <div>
      {/* <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="mx-2">
                        <a target="_blank" href={`https://${subDomain}.workerforge.com/`} rel="noopener noreferrer">
                    Preview Your Site
                </a>
                        </TooltipTrigger>
                        <TooltipContent>
                        {subDomain}.workerforge.com
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> */}
      </div>
      
      <div className="animate-fade-in  fill-mode-forwards delay-300 flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
        <Separator className='bg-black/50'/>
          {SIDE_BAR_MENU.map((menu, key) => (
            <TooltipProvider key={key}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger className='my-3'>
                  <MenuItem
                    size="min"
                    {...menu}
                    key={key}
                    current={current}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {menu.label}
                </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          ))} 
          <Separator className='bg-black/50'/>

          
          
        </div>
        <div className="flex flex-col mb-2">
          <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className='my-2 text-gray-500'>
              <MenuItem
                size="min"
                label="Settings"
                icon={<Settings />}
                path="settings"
              />
            </TooltipTrigger>
            <TooltipContent>
              Settings
            </TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger className='text-gray-500'>
                <MenuItem
                  size="min"
                  label="Sign out"
                  icon={<LogOut />}
                  path="logout"
                />
            </TooltipTrigger>
              <TooltipContent>
                Sign Out
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
