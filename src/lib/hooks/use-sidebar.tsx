 'use client'
import { usePathname} from 'next/navigation'
import { useState } from 'react'


const useSideBar = () => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined)
  //const router = useRouter()
  const pathname = usePathname()
  //const [realtime, setRealtime] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  

  const onExpand = () => setExpand((prev) => !prev)
  const page = pathname.split('/').pop()
  return {
    expand,
    onExpand,
    loading,
    page,
  }
}

export default useSideBar
