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

export function extraiRequisitosDeUmaLista(listaDeJogos: AppProps[]) {
  let listaRequisitosMinimos: RequisitoProps[] = []
  let listaRequisitosRecomendados: RequisitoProps[] = []
  let listaJogosSemRequisitosMinimos: JogoSemRequisito[] = []
  let listaJogosSemRequisitosRecomendados: JogoSemRequisito[] = []
  for (let app of listaDeJogos) {
    if (app.requisitosminimos) {
      let anotaNome: string = ""
      let campos: string[] = []
      let requisitosJson = JSON.parse(app.requisitosminimos)
      for (const campo in requisitosJson) {
        if (requisitosJson[campo] === 'undefined') {
          anotaNome = app.nome
          campos.push(campo)
          delete requisitosJson[campo]
        }
      }
      if (anotaNome) {
        listaJogosSemRequisitosMinimos.push(
          {
            nome: anotaNome,
            campos: campos.length < 4 ? campos : ["Sem requisitos minimos"],
          }
        )
      }

      JSON.stringify(requisitosJson) !== "{}" && listaRequisitosMinimos.push(requisitosJson)
    }
    else {
      listaJogosSemRequisitosMinimos.push({ nome: app.nome, campos: ["Sem requisitos mínimos"] })
    }

    if (app.requisitosrecomendados) {
      let anotaNome: string = ""
      let campos: string[] = []
      let requisitosJson = JSON.parse(app.requisitosrecomendados)
      for (const campo in requisitosJson) {
        if (requisitosJson[campo] === 'undefined') {
          anotaNome = app.nome
          campos.push(campo)
          delete requisitosJson[campo]
        }
      }
      if (anotaNome) {
        listaJogosSemRequisitosRecomendados.push(
          {
            nome: anotaNome,
            campos: campos.length < 4 ? campos : ["Sem requisitos minimos"],
          }
        )
      }

      JSON.stringify(requisitosJson) !== "{}" && listaRequisitosRecomendados.push(requisitosJson)
    }
    else {
      listaJogosSemRequisitosRecomendados.push({ nome: app.nome, campos: ["Sem requisitos mínimos"] })
    }
  }
  return { listaRequisitosMinimos, listaRequisitosRecomendados, listaJogosSemRequisitosMinimos, listaJogosSemRequisitosRecomendados }
}

export async function extraiRequisitosDeUmaListaDeApps(listaDeJogos: AppProps[], tipo: "minimo" | "recomendado") {
  let listaRequisitos: RequisitoProps[] = []
  let listaJogosSemRequisitos: JogoSemRequisito[] = []
  for (let app of listaDeJogos) {
    let tipoRequisito: string = "requisitos" + tipo + "s"
    if (app[tipoRequisito as keyof AppProps]) {
      let anotaNome: string = ""
      let campos: string[] = []
      let requisitosJson = JSON.parse(app.requisitosminimos)
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