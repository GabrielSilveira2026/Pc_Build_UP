import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useAuthContext } from "@/context/Auth/AuthContext"
import styles from "./userInfo.module.css"
interface UserInfoProps {
  user: {
    nome?: string | null;
    email?: string | null;
  } | undefined
}

export const UserInfo = () => {

  const { logOut, user, isAuthenticated } = useAuthContext()

  return (
    <div className={styles.userInfo}>
      {
        isAuthenticated ?
          <>
            <FontAwesomeIcon
              className={styles.userIcon}
              icon={faUser}
            />
            <p className={styles.userName}>Olá, {user?.nome}</p>
            <button
              onClick={() => logOut()}
              className={styles.btnLogOut}
            >
              Sair
            </button>
          </>
          :
          <Link className={styles.btnLogin} href="/login">Login</Link>}
    </div>
  )
}
