import { BoxPesquisa } from '@/componentes/BoxPesquisa/BoxPesquisa'
import { Input } from '@/componentes/Input/Input'
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
      Pagina Principal
      <BoxPesquisa/>
    </main>
  )
}
