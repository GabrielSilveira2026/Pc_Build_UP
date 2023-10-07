import axios from "axios";

const regex = /[^0-9a-zA-Z() " : , { } @ . / -]/gi

const enderecoBackend = "http://164.152.38.61"


export function jogosAleatorios(offset: number){
  return axios.get(`https://g4673849dbf8477-kh8pftimtcmp3b10.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/jogo_tb/?limit=40&offset=${offset}`)
}

export function consultaBanco(jogo: string, offset: number){
  return axios.get(`https://g4673849dbf8477-kh8pftimtcmp3b10.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/pesquisa/resultados/${jogo}?limit=10000&offset=` + offset)
}

export function montaPc(requisitos: any){
  return axios.post(`${enderecoBackend}/montaPc`, {requisitos:requisitos})
}

interface usuarioProps {
    nome: string;
    email: string;
    senha: string;
}

export function cadastraUsuario(usuario){
  return axios.post(`${enderecoBackend}/usuario/cadastro`, {usuario:usuario})
}

export function autenticaUsuario(usuario){
  return axios.post(`${enderecoBackend}/usuario/autentica`, {usuario:usuario})
}

export function favoritaPc(token, usuario, configSalva){
  return axios.post({usuario,configSalva},{headers:{token:token}})
}

export function validaToken(tokenjwt){
  return axios.post(`${enderecoBackend}/usuario/validaToken`, {}, {headers:{tokenjwt :tokenjwt}})
}
