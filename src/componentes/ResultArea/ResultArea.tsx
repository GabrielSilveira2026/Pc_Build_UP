import styles from './resultArea.module.css'
import { CardApp } from '../CardApp/CardApp'
import { AppProps } from '../types'
import { iniciaLista, pesquisaApps } from '@/app/api/httpservices'
import { AxiosResponse } from 'axios'

const ResultArea = async ({ appSearched }: { appSearched?: string }) => {
    let response: AxiosResponse
    let resultList: AppProps[] = []

    if (appSearched) {
        try {
            response = await pesquisaApps(appSearched, 0)
            resultList = response.data.items
        } catch (error) {
            resultList = []
        }
    }
    else{
        response = await iniciaLista()
        resultList = response.data.items
    }

    return (
        <div className={styles.resultArea}>
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
        </div>
    )
}

export default ResultArea