import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import Steps from '@/components/products/cover/steps'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper className='flex-1 flex flex-col'>
      <Steps />
      {children}
    </MaxWidthWrapper>
  )
}

export default Layout
