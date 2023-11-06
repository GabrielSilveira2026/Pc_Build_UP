import FormCadastro from '@/app/(usuario)/Forms/FormCadastro'
import Link from 'next/link'
import styles from '../cadastroLogin.module.css'

function Cadastro() {
    return (
        <div className={styles.container}>
            <div className={styles.contentBox}>
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