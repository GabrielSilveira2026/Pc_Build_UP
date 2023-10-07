
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "../Button/Button";
import { AppProps } from "../types";
import styles from "./cardApp.module.css"

interface CardProps {
    key: number,
    app: AppProps
}

export const CardApp = ({ app }: CardProps) => {

    console.log(styles.btnSelect);
    

    function capture() {
        app.estado = "check-circle"
        console.log(app.estado);
    }

    return (
        <div className={styles.cardContainer}>
            <img className={styles.image} src={app.imagem} />
            <p>{app.nome}</p>
            <Button style={styles.btnSelect} onClick={() => capture()} text={app.estado === "check-circle"? "Selecionado" : "Adicionar"}/>
        </div>
    )
}
