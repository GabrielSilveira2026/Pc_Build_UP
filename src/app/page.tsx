import AppList from '@/componentes/AppList/AppList'
import ResultArea from '@/app/homeComponents/ResultArea/ResultArea'
import { AppProps } from '@/componentes/types'
import { Suspense } from 'react'
import styles from './page.module.css'
import Search from './homeComponents/Search/Search'
import Link from 'next/link'

interface HomeProps {
  searchParams: {
    [key: string]: string | string[] | undefined,
  },
  app: AppProps,
}

export default async function Home({ searchParams }: HomeProps) {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 0
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined
  
  return (
    <div className={styles.homeContent}>
      <Search search={search} />
      <Suspense fallback={<>Carregando</>}>
        {/* @ts-expect-error Server Component */}
        <ResultArea appSearched={search} page={page}/>
      </Suspense>
      <AppList />
    </div>
  )
}
