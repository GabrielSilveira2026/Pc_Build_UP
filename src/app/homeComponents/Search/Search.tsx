"use client"
import styles from "./search.module.css"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/componentes/Input/Input";

export function Search({ search }: { search?: string }){
    const router = useRouter()
    const [appSearched, setAppSearched] = useState<string>(search||"")

    function searchApp(app: string) {
        app = app.replace(/[^0-9A-Za-z\s]/g, '').trim()
        app.length && router.push(`/?search=${app}`)
    }

    return (
        <form
            className={styles.searchArea}
            onSubmit={(event) => {
                event.preventDefault();
                appSearched && searchApp(appSearched)
            }}
        >
            <Input onChange={(event) => setAppSearched(event.target.value)} value={appSearched} placeholder="Procurar" />
            <FontAwesomeIcon
                className={styles.btnSearch}
                onClick={() => { appSearched && searchApp(appSearched)}}
                icon={faSearch}
            />
        </form>
    )
}

export default Search