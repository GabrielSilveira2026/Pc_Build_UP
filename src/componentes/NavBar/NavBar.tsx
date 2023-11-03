"use client"
import Link from "next/link"
import styles from "./navBar.module.css"
import { UserInfo } from "./UserInfo/UserInfo"

export const NavBar = () => {
    return (
        <nav className={styles.navBar}>
            <Link className={styles.linkHome} href="/">Pc Build</Link>
            <UserInfo/>
        </nav>
    )
}

