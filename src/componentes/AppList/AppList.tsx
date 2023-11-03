"use client"
import { useAppListContext } from "@/context/AppList/AppList"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AppProps } from "../types"
import styles from "./appList.module.css"

const AppList = () => {
    const appList = useAppListContext()
    const router = useRouter()
    const lengthAppList: number = appList.appList.length
    const [viewAppList, setViewAppList] = useState<boolean>(true)

    return (
        <div className={styles.containerListList}
        >
            {
                lengthAppList > 0 &&
                <button onClick={() => { router.push("recomendados") }} className={styles.btnPcBuild}>
                    Montar Pc
                </button>
            }

            <div className={`${styles.containerListHeader} ${viewAppList && styles.containerListHeaderOpen} `}
                onClick={() => { lengthAppList > 0 && setViewAppList(!viewAppList) }}
            >
                <span>{lengthAppList == 0 ? "Lista de aplicativos" : lengthAppList + "/5 apps"}</span>
                <div className={styles.clearList_ArrowIcon}>
                    {
                        viewAppList && lengthAppList > 0 &&
                        <button
                            className={styles.btnClearAppList}
                            onClick={() => { appList.clearAppList() }}
                        >
                            Limpar lista
                        </button>
                    }

                    <FontAwesomeIcon
                        className={styles.btnArrowIcon}
                        icon={viewAppList && lengthAppList > 0 ? faAngleDown : faAngleUp}
                    />
                </div>

            </div>

            <div className={`${styles.containerListBody}`}
                style={{ height: viewAppList && lengthAppList > 0 ? lengthAppList * 60 : 0 }}
            >
                <div className={`${styles.appListList} `}>
                    {appList.appList.map((app: AppProps) => {
                        return (
                            <div key={app.id} className={styles.itemAppList}>
                                <img className={styles.imgItemAppList} src={app.imagem} onClick={() => { router.push(`/?search=${app.nome}`)} } />
                                <p onClick={() => { router.push(`/?search=${app.nome}`)} }>{app.nome}</p>
                                <button
                                    className={styles.btnDeselect} onClick={() => {
                                        app.estado = "unselected"
                                        appList.removeToAppList(app);
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        )
                    })
                    }
                </div>
            </div>

        </div>
    )
}

export default AppList