'use client';

//import { SIDE_BAR_MENU } from '@/lib/sidebar-constants'
import { Box, FilePlus, LogOut, Menu, Receipt, Settings, ShirtIcon, Store, Tag, Wand2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import MenuItem from './menu-item'
//import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
//import DomainMenu from './domain-menu'
//import { useParams, usePathname } from "next/navigation";
//import { cn } from '@/lib/utils';

type Props = {
  onExpand(): void
  current: string
}

type SIDE_BAR_MENU_PROPS = {
  label: string
  icon: JSX.Element
  path: string
}

const MaxMenu = ({ current, onExpand}: Props) => {


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
  }, */
/*   {
    label: 'Orders',
    icon: <Box />,
    path: `orders`,
  }, */
]

const storeId = useParams()

  return (
    <div className="py-3 px-4 flex flex-col h-full bg-sand">
      <div className="flex justify-between items-center">
        <Image
          src="/images/neon.svg"
          alt="LOGO"
          sizes="20vw"
          className="animate-fade-in  delay-300 fill-mode-forwards"
          style={{
            width: '30px',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
        {/* <Menu className='w-6 h-6'/> */}
        <Button onClick={onExpand}variant="ghost">
          {/* <Image src='/potion.png' width={20} height={20} alt='logo' /> */}
          <Menu className='w-6 h-6 cursor-pointer animate-fade-in  delay-300 fill-mode-forwards'/>
        </Button>
      </div>
      <div className="animate-fade-in  delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          <p className="text-xs text-black/60 mb-3">MENU</p>
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem
              size="max"
              {...menu}
              key={key}
              current={current}
            />
          ))}

        </div>
        
        <div className="flex flex-col">
        
          <p className="text-xs text-black/60 mb-3">OPTIONS</p>
          {/* <MenuItem
            size="max"
            label="Mobile App"
            icon={<MonitorSmartphone />}
          /> */}
          <MenuItem
            size="max"
            label="Settings"
            icon={<Settings />}
            path="settings"
          />
          <MenuItem
            size="max"
            label="Sign out"
            icon={<LogOut />}
            path="logout"
            
          />
        </div>
      </div>
    </div>
  )
}

export default MaxMenu
