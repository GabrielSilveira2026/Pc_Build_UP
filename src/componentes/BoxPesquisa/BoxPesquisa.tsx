"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useState } from 'react'
import { Input } from '../Input/Input'
import styles from './boxPesquisa.module.css'
import { CardApp } from '../CardApp/CardApp';
import { AppProps } from '../types';
import { useAppListContext } from '@/context/AppListContext/AppList';
import { pesquisaApps } from '@/app/api/httpservices';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

interface Response {
    items: AppProps[],
    hasMore: boolean,
    limit: number,
    offset: number,
    count: number,
    links: {
        rel: string,
        href: string
    }[]
}

export const BoxPesquisa = () => {
    const appList = useAppListContext()
    const router = useRouter()
    const [appSearched, setAppSearched] = useState<string>("")
    const [listAppResults, setListAppResults] = useState<AppProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [viewAppList, setViewAppList] = useState<boolean>(true)
    const lengthAppList: number = appList.appList.length

    async function pesquisa(app: string) {
        setLoading(true)
        let offset: number = 0
        let response: Response
        let listaAuxiliar: AppProps[] = []

        app = app.replace(/[^0-9A-Za-z\s]/g, "").trim()
        if (app != "") {
            try {
                do {
                    let responseAxios: AxiosResponse = await pesquisaApps(app, offset)
                    response = responseAxios.data
                    for (var i = 0; i < response.count; i++) {
                        let app: AppProps = response?.items[i]
                        let jogoEstaSelecionado = appList.appList.find((appList: AppProps) => appList.id_jogo_steam === app.id_jogo_steam)
                        app.estado = jogoEstaSelecionado ? 'selected' : 'unselected'
                        listaAuxiliar.push(app)
                    }
                    offset += 10000
                } while (response.hasMore === true);
    
    
                setLoading(false)
                if (listaAuxiliar.length !== 0) {
                    setListAppResults(listaAuxiliar)
                } else {
                    alert("Nenhum jogo encontrado")
                }
            } 
            catch (error) {    
                console.log(error);
                
                alert("Desculpe, ocorreu um erro no servidor")
            }
        }
        setLoading(false)
    }

    return (
        <div className={styles.searchContent}>
            <form
                className={styles.searchArea}
                onSubmit={(event) => {
                    event.preventDefault();
                    pesquisa(appSearched)
                }}
            >
                <Input onChange={(event) => setAppSearched(event.target.value)} value={appSearched} placeholder="Procurar" />
                <FontAwesomeIcon
                    className={styles.btnSearch}
                    onClick={() => { pesquisa(appSearched) }}
                    icon={faSearch}
                />
            </form>

            {loading && <>Carregando</>}

            <div className={styles.resultArea}>
                {
                    listAppResults.map((app) => {
                        return (
                            <CardApp key={app.id_jogo_steam} app={app} />
                        )
                    })
                }
            </div>

            <div className={`${styles.containerListList}`}
            >
                {   
                    lengthAppList > 0 &&
                    <button onClick={() =>{router.push("recomendados")}}  className={styles.btnPcBuild}>
                        Montar Pc
                    </button>
                }

                <div className={`${styles.containerListHeader} ${viewAppList && styles.containerListHeaderOpen} `}
                    onClick={() => { lengthAppList > 0 && setViewAppList(!viewAppList) }}
                >
                    <span>{lengthAppList == 0 ? "Lista de aplicativos" : lengthAppList + "/5 apps"}</span>
                    <div className={styles.clearList_ArrowIcon}>
                        {
                            viewAppList && lengthAppList > 0 &&
                            <button
                                className={styles.btnClearAppList}
                                onClick={() => { appList.clearAppList() }}
                            >
                                Limpar lista
                            </button>
                        }

                        <FontAwesomeIcon
                            className={styles.btnArrowIcon}
                            icon={viewAppList && lengthAppList > 0 ? faAngleDown : faAngleUp}
                        />
                    </div>

                </div>

                <div className={`${styles.containerListBody}`}
                    style={{ height: viewAppList && lengthAppList > 0 ? lengthAppList * 60 : 0 }}
                >
                    <div className={`${styles.appListList} `}>
                        {appList.appList.map((app: AppProps) => {
                            return (
                                <div key={app.id} className={styles.itemAppList}>
                                    <img className={styles.imgItemAppList} src={app.imagem} onClick={()=>{setListAppResults([app])}}/>
                                    <p onClick={()=>{setListAppResults([app])}}>{app.nome}</p>
                                    <button
                                        className={styles.btnDeselect} onClick={() => {
                                            app.estado = "unselected"
                                            appList.removeToAppList(app);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
