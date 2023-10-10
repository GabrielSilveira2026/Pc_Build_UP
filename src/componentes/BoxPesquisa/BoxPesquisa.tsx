"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useState } from 'react'
import { Button } from '../Button/Button'
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
    const [listaApps, setListaApps] = useState<AppProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [viewAppList, setViewAppList] = useState<boolean>(false)

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
                app.estado = jogoEstaSelecionado ? 'check-circle' : 'circle'
                listaAuxiliar.push(app)
            }
            offset += 10000
        } while (response.hasMore === true);


        setLoading(false)
        if (listaAuxiliar.length !== 0) {
            setListaApps(listaAuxiliar)
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
                    listaApps.map((app) => {
                        return (
                            <CardApp key={app.id} app={app} />
                        )
                    })
                }
            </div>
            <div
                className={styles.appListIcon}
                id="cart-icon"
                onClick={()=>{setViewAppList(!viewAppList)}}>
                <div>
                    {appList.appList.length ? appList.appList.length : 0}
                </div>
                <ul className={`${styles.appListList} ${viewAppList ? styles['viewList']: ""}`}>
                    {appList.appList.map((app: AppProps) => { return <li>{app.nome}</li> })}
                </ul>
            </div>

        </div>
    )
}
