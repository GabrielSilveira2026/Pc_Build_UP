import FormLogin from '@/app/componentes/Forms/FormLogin'
import Link from 'next/link'
import styles from '../CadastroLogin.module.css'

function Login() {
    return (
        <div className={styles.body}>
            <div className={styles.divContainer}>
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