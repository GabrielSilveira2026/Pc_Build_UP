"use client"
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import styles from './boxPesquisa.module.css'

export const BoxPesquisa = () => {
    return (
        <div>
            <form onSubmit={() => { }} className={styles.searchArea}>
                <Input placeholder="Procurar" />
                <Button text="Pesquisar" />
            </form>
        </div>
    )
}
