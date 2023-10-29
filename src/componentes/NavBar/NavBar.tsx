import Link from "next/link"
import styles from "./navBar.module.css"
import { UserInfo } from "../UserInfo/UserInfo"

export const NavBar = async () => {

    return (
        <header className={styles.navBar}>
            <Link className={styles.linkHome} href="/">Pc Build</Link>
            <Link style={{ color: "white", textDecoration: "none" }} href="/api/auth/signin">Login</Link>
        </header>
    )
}

