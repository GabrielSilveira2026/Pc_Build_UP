import { AppProps } from "@/componentes/types"

interface RequisitoProps {
  Armazenamento?: string,
  Cpu?: string,
  Gpu?: string,
  Ram?: string
}

interface JogoSemRequisito {
  nome: string,
  campos: string[]
}

export function extraiRequisitosDeUmaListaDeApps(listaDeJogos: AppProps[], tipo: "minimo" | "recomendado") {
  let listaRequisitos: RequisitoProps[] = []
  let listaJogosSemRequisitos: JogoSemRequisito[] = []
  for (let app of listaDeJogos) {
    const requisito = app["requisitos" + tipo + "s" as keyof AppProps]

    if (requisito) {
      let anotaNome: string = ""
      let campos: string[] = []
      let requisitosJson = JSON.parse(`${requisito}`);
      for (const campo in requisitosJson) {
        if (requisitosJson[campo] === 'undefined') {
          anotaNome = app.nome
          campos.push(campo)
          delete requisitosJson[campo]
        }
      }
      if (anotaNome) {
        listaJogosSemRequisitos.push(
          {
            nome: anotaNome,
            campos: campos.length < 4 ? campos : ["Sem requisitos minimos"],
          }
        )
      }

      JSON.stringify(requisitosJson) !== "{}" && listaRequisitos.push(requisitosJson)
    }
    else {
      listaJogosSemRequisitos.push({ nome: app.nome, campos: ["Sem requisitos mínimos"] })
    }
  }

  return { listaRequisitos, listaJogosSemRequisitos }
}