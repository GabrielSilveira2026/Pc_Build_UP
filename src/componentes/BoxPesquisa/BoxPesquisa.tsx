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
    const [app, setApp] = useState<string>("")
    const [listaApps, setListaApps] = useState<AppProps[]>([])

    //Nota: Mover essa função para um arquivo "httpservices"
    async function pesquisaApps(app: string, offset: number) {
        const response = await fetch(`https://g4673849dbf8477-kh8pftimtcmp3b10.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/pesquisa/resultados/${app}?limit=10000&offset=${offset}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar apps');
        }
        return response.json();
    }

    async function pesquisa(app: string) {
        let offset: number = 0
        let response: Response
        let listaAuxiliar: AppProps[] = []//!
        do {
            response = await pesquisaApps(app, offset)
            console.log(response);

            for (var i = 0; i < response.count; i++) {
                let app: AppProps = response?.items[i]
                // let jogoEstaSelecionado = selecionados.cart.find(jogo => jogo.id_jogo_steam === dadosJogo.id_jogo_steam)
                // app.estado = jogoEstaSelecionado ? 'check-circle' : 'circle'
                app.estado = "circle"
                listaAuxiliar.push(app)
            }
            offset += 10000
        } while (response.hasMore === true);

        setListaApps(listaAuxiliar)

        if (listaAuxiliar.length === 0) {
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
                    icon = { faSearch }
                />
            </form>
            <div className={styles.ResultArea}>
                {
                    listaApps.map((app) => { 
                        return(
                            <CardApp key={app.id} app={app}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
