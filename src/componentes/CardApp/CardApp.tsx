
import { AppProps } from "../types";
import styles from "./cardApp.module.css"

interface CardProps {
    key: number,
    app: AppProps
}

export const CardApp = ( {app} : CardProps) => {
    console.log(app);
    
    return (
        <div className={styles.cardContainer}>
            <p>{app.nome}</p>
        </div>
    )
}
