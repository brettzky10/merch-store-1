import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import React from 'react'

type MenuLogoProps = {
  onClick(): void
}

export const MenuLogoMin = ({ onClick }: MenuLogoProps) => {
  return (
    <Button onClick={onClick} variant="ghost">
      <Menu className='w-6 h-6'/>
    </Button>
  )
}
