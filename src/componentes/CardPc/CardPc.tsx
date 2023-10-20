"use client"

import { montaPc } from "@/app/api/httpservices";
import { useAppListContext } from "@/context/AppList";
import { extraiRequisitosDeUmaLista, extraiRequisitosDeUmaListaDeApps } from "@/utils/utils";
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

export const CardPc = async ({ tipo }: CardPcProps) => {
    const appList = useAppListContext()
    const {listaRequisitos, listaJogosSemRequisitos} = extraiRequisitosDeUmaListaDeApps(appList.appList, tipo)

    const response = await montaPc(listaRequisitos)
    let configuracao: PcProps = response.data
    console.log(configuracao);

    return (
        <div onClick={() => { console.log("clicado") }} className={styles.cardPc}>
            <h1>Configuração {tipo === "minimo"? "Mínima" : "Recomendada"}</h1>
            <p>Memória ram: {configuracao?.ram?.title || "Não calculado"}</p>
            <p>Placa de vídeo: {configuracao?.placa?.title || "Não calculado"}</p>
            <p>Armazenamento: {configuracao?.rom?.title || "Não calculado"}</p>
        </div>
    )
}
