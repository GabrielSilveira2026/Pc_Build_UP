
import { useAppListContext } from "@/context/AppList";
import { Button } from "../Button/Button";
import { AppProps } from "../types";
import styles from "./cardApp.module.css"

interface CardProps {
    key: number,
    app: AppProps
}

export const CardApp = ({ app }: CardProps) => {
    const appList = useAppListContext()

    const mudaEstado = () => {
        if (app.estado === "circle") {
            if (appList.appList.length < 5) {
                app.estado = "check-circle"
                appList.addToAppList(app)

            }
            else {
                alert("Você já selecionou 5 apps. Por favor, remova algum deles para adicionar um outro")
            }
        }
        else {
            app.estado = "circle"
            appList.removeToAppList(app.id_jogo_steam)
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
                    target="blank"
                    className={styles.btnSteam}
                >
                    Steam
                </a>

                <button
                    className={styles.btnSelect}
                    onClick={() => mudaEstado()}
                >
                    {app.estado === "check-circle" ? "Remover" : "Adicionar"}
                </button>

            </div>
            {/* <Button style={styles.btnSelect} onClick={() => mudaEstado()} text={app.estado === "check-circle"? "x" : "+"}/> */}
        </div>
    )
}
