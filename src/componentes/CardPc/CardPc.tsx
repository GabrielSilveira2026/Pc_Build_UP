"use client"

import { montaPc } from "@/app/api/httpservices";
import { useAppListContext } from "@/context/AppList";
import { extraiRequisitosDeUmaListaDeApps } from "@/utils/utils";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { AppProps } from "../types";
import styles from "./cardpc.module.css"

interface CardPcProps {
    tipo: "minimo" | "recomendado"
}

interface PcProps {
    placa?: PecaProps,
    ram?: PecaProps,
    rom?: PecaProps,
    cpu?: PecaProps,
}

interface PecaProps {
    title: string;
    imagem?: string;
    preco?: string
}

export const CardPc = ({ tipo }: CardPcProps) => {
    const appList = useAppListContext()
    const { listaRequisitos, listaJogosSemRequisitos } = extraiRequisitosDeUmaListaDeApps(appList.appList, tipo)
    const [configuracao, setConfiguracao] = useState<PcProps>({})
    const source = axios.CancelToken.source()

    tipo === "minimo" && console.log(listaRequisitos);

    useEffect(() => {
        async function consultaConfig() {
            try {
                const response: AxiosResponse = await montaPc(listaRequisitos)
                setConfiguracao(response.data)
            }
            catch (error) {
                const err = error as AxiosError
                if (err?.response?.status === 500) {
                    console.log(err?.response);
                }
            }
        }
        consultaConfig()

        return () => {
            source.cancel('CleanUp')
        }
    }, [])

    return (
        <div className={styles.cardPc}>
            <h1>Configuração {tipo === "minimo" ? "Mínima" : "Recomendada"}</h1>
            <p>Para os jogos:</p>
            {appList.appList.map((app: AppProps) => <p>{app.nome}</p>)}
            <p>Memória ram: {configuracao?.ram?.title || "Não calculado"}</p>
            <p>Placa de vídeo: {configuracao?.placa?.title || "Não calculado"}</p>
            <p>Armazenamento: {configuracao?.rom?.title || "Não calculado"}</p>
        </div>
    )
}
