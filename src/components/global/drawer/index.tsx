import React from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

type Props = {
  onOpen: JSX.Element
  children: React.ReactNode
  title: string
  description: string
}

const AppDrawer = ({ children, description, onOpen, title }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger>{onOpen}</DrawerTrigger>
      <DrawerContent className='bg-white '>
        <div className="container flex flex-col items-center gap-2 pb-10 pt-5">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AppDrawer