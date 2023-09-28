import FormLogin from '@/app/componentes/Forms/FormLogin'
import Link from 'next/link'
import styles from './login.module.css'

function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.divLogin}>
                <h1>Login</h1>
                <FormLogin/>
                <p>
                    Ainda não tem cadastro?
                    <br />
                    <Link className={styles.link} href="/cadastro">Clique Aqui!</Link>
                </p>
            </div>
        </div>
    )
}

export default Login