import prismadb from '@/lib/prismadb'
import { notFound } from 'next/navigation'
import DesignPreview from './components/design-preview'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams

  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const configuration = await prismadb.configuration.findUnique({
    where: { id },
  })

  if(!configuration) {
    return notFound()
  }

  return <DesignPreview configuration={configuration} />
}

export default Page
