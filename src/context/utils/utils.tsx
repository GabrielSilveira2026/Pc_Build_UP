import { AppProps } from "next/dist/shared/lib/router/router"

export function extraiRequisitosDeUmaLista(listaDeJogos: AppProps[]){

    let listaRequisitosMinimos = []
    let listaRequisitosRecomendados = []
    let listaJogosSemRequisitosMinimos = []
    let listaJogosSemRequisitosRecomendados = []
    for (let app of listaDeJogos) {
      if (app.requisitosminimos) {
        let anotaNome
        let campos = []
        let requisitosJson = JSON.parse(app.requisitosminimos)
        for (const campo in requisitosJson) {
            if(requisitosJson[campo] === 'undefined'){
              anotaNome = app.nome
              campos.push(campo)
              delete requisitosJson[campo]
            }
        }
        anotaNome?listaJogosSemRequisitosMinimos.push({nome: anotaNome, campos:campos.length<4?campos:["Sem requisitos minimos"]}):null
        
        JSON.stringify(requisitosJson) !=="{}"?
          listaRequisitosMinimos.push(requisitosJson)
        :
          null
      }
      else{
        listaJogosSemRequisitosMinimos.push({nome: app.nome, campos:["Sem requisitos mínimos"]})
      }
  
      if (app.requisitosrecomendados) {
        let anotaNome
        let campos = []
        let requisitosJson = JSON.parse(app.requisitosrecomendados)
        for (const campo in requisitosJson) {
            if(requisitosJson[campo] === 'undefined'){
              anotaNome = app.nome
              campos.push(campo)
              delete requisitosJson[campo]
            }
        }
        anotaNome?listaJogosSemRequisitosRecomendados.push({nome: anotaNome, campos:campos.length<4?campos:["Sem requisitos recomendados"]}):null
        
        JSON.stringify(requisitosJson) !=="{}"?
          listaRequisitosRecomendados.push(requisitosJson)
        :
          null
      }
      else{
        listaJogosSemRequisitosRecomendados.push({nome: app.nome, campos:["Sem requisitos Recomendados"]})
      }
    }
    return {listaRequisitosMinimos, listaRequisitosRecomendados, listaJogosSemRequisitosMinimos, listaJogosSemRequisitosRecomendados}
  }