import AppList from '@/componentes/AppList/AppList'
import ResultArea from '@/app/homeComponents/ResultArea/ResultArea'
import { AppProps } from '@/componentes/types'
import { Suspense } from 'react'
import styles from './page.module.css'
import Search from './homeComponents/Search/Search'

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined },
  app: AppProps
}

export default async function Home({ searchParams}: HomeProps) {
  // const page = typeof searchParams === 'string' ? Number(searchParams.page) : 1
  // const limit =  typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined
  
  return (
    <div className={styles.homeContent}>
      <Search search={search} />
      <Suspense fallback={<>Carregando</>}>
        {/* @ts-expect-error Server Component */}
        <ResultArea appSearched={search} />
      </Suspense>
      <AppList/>
    </div>
  )
}
