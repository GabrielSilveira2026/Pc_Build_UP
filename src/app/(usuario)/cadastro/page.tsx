import Form from '@/app/componentes/Form/Form'
import Link from 'next/link'
import styles from './cadastro.module.css'

function Cadastro() {
    return (
        <div className={styles.divCadastro}>
            <h1>Cadastro</h1>
            <Form />
            <p>
                Já tem cadastro?
                <br />
                <Link className={styles.link} href="/login">Clique Aqui!</Link>
            </p>
        </div>
    )
}

export default Cadastro