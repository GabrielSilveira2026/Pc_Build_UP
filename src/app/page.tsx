import ResultArea from '@/componentes/ResultArea/ResultArea'
import Search from '@/componentes/Search/Search'
import { Suspense } from 'react'
import styles from './page.module.css'

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // const page = typeof searchParams === 'string' ? Number(searchParams.page) : 1
  // const limit =  typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined

  return (
    <div className={styles.homeContent}>
      <Search search={search} />
      <Suspense fallback={<>Carregando</>}>
        <ResultArea appSearched={search} />
      </Suspense>
    </div>
  )
}
