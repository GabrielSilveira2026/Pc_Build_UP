
import { useAppListContext } from "@/context/AppList";
import { AppProps } from "../types";
import styles from "./cardApp.module.css"

interface CardProps {
    key: number,
    app: AppProps
}

export const CardApp = ({ app }: CardProps) => {
    const appList = useAppListContext()

    const mudaEstado = () => {
        if (app.estado === "unselected") {
            appList.addToAppList(app)
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
