import { CardPc } from "@/componentes/CardPc/CardPc"
import { Suspense } from "react"
import styles from "./recomendados.module.css"

const recomendados = () => {
    return (
        <div className={styles.recomendadosContent}>
            <Suspense fallback={<p>Carregando configuração</p>}>
                <CardPc tipo="minimo"/>
            </Suspense>
            <Suspense fallback={<p>Carregando configuração</p>}>
                <CardPc tipo="recomendado"/>
            </Suspense>
        </div>
    )
}

export default recomendados 