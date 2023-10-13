"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useState } from 'react'
import { Input } from '../Input/Input'
import styles from './boxPesquisa.module.css'
import { CardApp } from '../CardApp/CardApp';
import { AppProps } from '../types';
import { useAppListContext } from '@/context/AppList';

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
    const [app, setApp] = useState<string>("")
    const [listAppResults, setListAppResults] = useState<AppProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [viewAppList, setViewAppList] = useState<boolean>(true)
    const lengthAppList = appList.appList.length

    //Nota: Mover essa função para um arquivo "httpservices"
    async function pesquisaApps(app: string, offset: number) {
        const response = await fetch(`https://g4673849dbf8477-kh8pftimtcmp3b10.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/pesquisa/resultados/${app}?limit=10000&offset=${offset}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar apps');
        }
        return response.json();
    }

    async function pesquisa(app: string) {
        setLoading(true)
        let offset: number = 0
        let response: Response
        let listaAuxiliar: AppProps[] = []//!
        do {
            response = await pesquisaApps(app, offset)

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
            // setListaJogos(listaInicial)
            alert("Nenhum jogo encontrado")
        }
    }

    return (
        <div className={styles.searchContent}>
            <form
                className={styles.searchArea}
                onSubmit={(event) => {
                    event.preventDefault();
                    app && pesquisa(app)
                }}
            >
                <Input onChange={(event) => setApp(event.target.value)} placeholder="Procurar" />
                <FontAwesomeIcon
                    className={styles.btnSearch}
                    onClick={() => { app && pesquisa(app) }}
                    icon={faSearch}
                />
            </form>
            {loading && <>Carregando</>}
            <div className={styles.ResultArea}>
                {
                    listAppResults.map((app) => {
                        return (
                            <CardApp key={app.id} app={app} />
                        )
                    })
                }
            </div>
            <div
                className={`${styles.containerListList}`}
                style={{ width: viewAppList ? "auto" : "min-content" }}
            >

                <div
                    className={`${styles.containerListHeader} ${styles.containerListHeaderOpen} `}
                    onClick={() => { lengthAppList > 0 && setViewAppList(!viewAppList) }}
                >
                    <span>{lengthAppList == 0 ? "Lista de aplicativos" : lengthAppList + "/5 apps"}</span>
                    <div className={styles.clearList_ArrowIcon}>
                        {
                            viewAppList &&
                            lengthAppList > 0 &&
                            <button
                                className={styles.btnClearAppList}
                                onClick={() => { appList.clearAppList() }}
                            >
                                Limpar lista
                            </button>
                        }

                        <FontAwesomeIcon
                            className={styles.btnArrowIcon}
                            icon={viewAppList && lengthAppList > 0? faAngleDown : faAngleUp}
                        />
                    </div>

                </div>

                <div
                    className={`${styles.containerListBody}`}
                    style={{ height: viewAppList && lengthAppList > 0 ? "auto": 0 }}
                >
                    <ul className={`${styles.appListList} `}>
                        {appList.appList.map((app: AppProps) => {
                            return (
                                <div className={styles.itemAppList}>
                                    <li key={app.id}>{app.nome}</li>
                                    <button
                                        className={styles.btnDeselect} onClick={() => {
                                            app.estado = "unselected"
                                            appList.removeToAppList(app.id_jogo_steam);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
