import styles from './resultArea.module.css'
import { CardApp } from '../../../componentes/CardApp/CardApp'
import { AppProps } from '../../../componentes/types'
import { iniciaLista, pesquisaApps } from '@/app/api/httpservices'
import { AxiosResponse } from 'axios'
import Link from 'next/link'

interface ResultAreaProps {
    appSearched?: string,
    page: number
}

interface PreviousAndNextProps {
    page: number, 
    appSearched?: string, 
    hasMore: boolean
}

const PreviousAndNext = ({page, appSearched, hasMore}: PreviousAndNextProps) => {
    return (
        <div className={styles.btnsContainer}>
                {
                    page > 0 &&
                    <Link 
                        className={styles.buttons}
                        href={{
                        pathname: "/",
                        query: {
                            search: appSearched,
                            page: page > 0 ? page - 1 : 0
                        }
                    }}>
                        Anterior
                    </Link>
                }
                {
                    hasMore &&
                    <Link 
                        className={styles.buttons}
                        href={{
                        pathname: "/",
                        query: {
                            search: appSearched,
                            page: page + 1
                        }
                    }}>
                        Próxima
                    </Link>
                }
            </div>
    )
}

const ResultArea = async ({ appSearched, page }: ResultAreaProps) => {
    let response: AxiosResponse
    let resultList: AppProps[] = []
    let hasMore = false
    if (appSearched) {
        try {
            response = await pesquisaApps(appSearched, page)
            resultList = response.data.items
            hasMore = response.data.hasMore
        } catch (error) {
            resultList = []
        }
    }
    else {
        response = await iniciaLista()
        resultList = response.data.items
    }

    return (
        <div className={styles.resultArea}>
            <PreviousAndNext page={page} appSearched={appSearched} hasMore={hasMore}/>
            {
                resultList.length ?
                    <div className={styles.resultList}>
                        {
                            resultList.map((app: AppProps) => {
                                return (
                                    <CardApp key={app.id_jogo_steam} app={app} />
                                )
                            })
                        }
                    </div>
                    :
                    <h1>Nenhum aplicativo encontrado :(</h1>
            }
            <PreviousAndNext page={page} appSearched={appSearched} hasMore={hasMore}/>
        </div>
    )
}

export default ResultArea