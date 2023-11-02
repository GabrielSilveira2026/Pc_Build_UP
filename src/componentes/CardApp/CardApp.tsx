
"use client"
import { useAppListContext } from "@/context/AppList/AppList";
import { AppProps } from "../types";
import styles from "./cardApp.module.css"

interface CardProps {
    key: number,
    app: AppProps
}

export const CardApp = ({ app }: CardProps) => {
    const appList = useAppListContext()
    const appSelect = appList.appList.some((appList: AppProps) => appList.id_jogo_steam === app.id_jogo_steam)

    app.estado = appSelect ? "selected" : "unselected"
    const mudaEstado = () => {
        if (app.estado === "unselected") {
            appList.addToAppList(app)
            console.log(appList.appList);
            
        }
        else {
            appList.removeToAppList(app)
        }
    }

    return (
        <div className={styles.cardContainer}>
            <img className={styles.image} src={app.imagem} />
            <p>{app.nome}</p>
            <div
            className={styles.boxButtons}>
                <a 
                    href={`https://store.steampowered.com/app/${app.id_jogo_steam}`}
                    target="_blank"
                    className={styles.buttons}
                >
                    Steam
                </a>

                <button
                    className={styles.buttons}
                    onClick={() => mudaEstado()}
                >
                    {app.estado === "selected" ? "Remover" : "Adicionar"}
                </button>
            </div>
        </div>
    )
}
