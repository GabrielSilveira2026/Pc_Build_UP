import { CardPc } from "@/componentes/CardPc/CardPc"
import { Suspense, useState } from "react"
import styles from "./recomendados.module.css"

const recomendados = () => {
    return (
        <div className={styles.recomendadosContent}>
            <Suspense fallback={<p>Carregando configuração</p>}>
                <CardPc tipo="minimo" />
            </Suspense>
        </div>
    )
}

export default recomendados 