"use client"
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import styles from './boxPesquisa.module.css'

type AplicativoProps = {
    estado: string,
    id: number,
    id_jogo_steam: number,
    imagem: string,
    nome: string,
    preco: string,
    requisitosminimos: string,
    requisitosrecomendados: string,

}

export const BoxPesquisa = () => {
    const [aplicativo, setAplicativo] = useState<string>("")
    const [listaAplicativos, setListaAplicativos] = useState<AplicativoProps[]>([])

    //Nota: Mover essa função para um arquivo "httpservices"
    async function pesquisaAplicativos(aplicativo:string, offset: number) {
        const response = await fetch(`https://g4673849dbf8477-kh8pftimtcmp3b10.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/pesquisa/resultados/${aplicativo}?limit=10000&offset=${offset}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar aplicativos');
        }
        return response.json();
    }

    async function pesquisa(aplicativo: string) {
        // let regex = /[^0-9a-zA-Z]/gm
        // aplicativo = aplicativo.replace(regex, "") 
        if (aplicativo !== "") {
            let offset: number = 0
            let response
            let listaAuxiliar: AplicativoProps[] = [] //!
            do {
                response = await pesquisaAplicativos(aplicativo, offset)

                listaAuxiliar.push(
                    response?.items.map(
                        (aplicativo:AplicativoProps)=>(
                            {...aplicativo, estado: "no-check"}
                        )
                    )
                )
                // for (var i = 0; i < response.data.items.length; i++) {
                //     let dadosJogo = response?.data?.items[i]
                //     // let jogoEstaSelecionado = selecionados.cart.find(jogo => jogo.id_jogo_steam === dadosJogo.id_jogo_steam)
                //     // dadosJogo.estado = jogoEstaSelecionado ? 'check-circle' : 'circle'
                //     listaAuxiliar.push(dadosJogo)
                // }
                offset =+ 10000
            } while (response.hasMore === true);

            // setListaJogos(listaAuxiliar)
            if (listaAuxiliar.length === 0) {
                // setListaJogos(listaInicial)
                alert("Nenhum jogo encontrado")
            }
            console.log(listaAuxiliar);
        }
        else {
            // setListaJogos(listaInicial)
            alert("Nenhum jogo pesquisado")
        }
        
    }

    return (
        <div className={styles.searchContent}>
            <form
                className={styles.searchArea}
                onSubmit={(event) => {
                    event.preventDefault();
                    aplicativo && pesquisa(aplicativo)
                }}
            >
                <Input onChange={(event) => setAplicativo(event.target.value)}placeholder="Procurar" />
                <Button onClick={()=>{pesquisa(aplicativo)}} text="Pesquisar" />
            </form>
        </div>
    )
}
