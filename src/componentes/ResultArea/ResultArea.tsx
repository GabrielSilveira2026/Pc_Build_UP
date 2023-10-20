import styles from './resultArea.module.css'
import { CardApp } from '../CardApp/CardApp'
import { AppProps } from '../types'

const ResultArea = async({resultList}: {resultList: AppProps[]}) => {
    return (
        <div className={styles.resultArea}>
            {
                resultList.map((app) => {
                    return (
                        <CardApp key={app.id_jogo_steam} app={app} />
                    )
                })
            }
        </div>
    )
}

export default ResultArea