"use client"
import Link from "next/link"
import styles from "./navBar.module.css"
import { UserInfo } from "../UserInfo/UserInfo"
import { useEffect, useState } from "react"
import { UserProps } from "../types"
import { parseCookies } from "nookies"
import { useAuthContext } from "@/context/Auth/AuthContext"

export const NavBar = () => {
    const { logOut } = useAuthContext()

    const [user, setUser] = useState<UserProps | null>(null)

    function updateLogOut() {
        logOut()
        setUser(null)
    }

    useEffect(() => {
        const { UserInfo } = parseCookies()
        if (UserInfo) {
            setUser(JSON.parse(UserInfo))
        }
    },[])

    return (
        <nav className={styles.navBar}>
            <Link className={styles.linkHome} href="/">Pc Build</Link>

            {
                user ?
                    <>
                        <UserInfo user={user} />
                        <button
                            className={styles.logOut}
                            onClick={() => updateLogOut()}>Sair</button>
                    </>
                    :
                    <Link className={styles.linkLogin} href="/login">Login</Link>
            }
        </nav>
    )
}

