import FormCadastro from '@/app/componentes/Forms/FormCadastro'
import Link from 'next/link'
import styles from '../CadastroLogin.module.css'

function Cadastro() {
    return (
        <div className={styles.body}>
            <div className={styles.divContainer}>
                <h1>Cadastro</h1>
                <FormCadastro/>
                <p>
                    Já tem cadastro?
                    <br />
                    <Link className={styles.link} href="/login">Clique Aqui!</Link>
                </p>
            </div>
        </div>
    )
}

export default Cadastro