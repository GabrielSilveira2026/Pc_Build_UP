import { UsuarioProps } from "@/componentes/types";
import axios from "axios";

const regex = /[^0-9a-zA-Z() " : , { } @ . / -]/gi

// const enderecoBackend = "http://164.152.38.61"
const enderecoBackend = "http://localhost:3005"


export function pesquisaApps(app: string, offset: number) {
  return axios.get(`https://g4673849dbf8477-kh8pftimtcmp3b10.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/pesquisa/resultados/${app}?limit=10000&offset=` + offset)
}

export function montaPc(requisitos: any) {
  return axios.post(`${enderecoBackend}/montaPc`, { requisitos: requisitos })
}

export function cadastraUsuario(usuario: UsuarioProps){
  return axios.post(`${enderecoBackend}/usuario/cadastro`, {usuario:usuario})
}

export function autenticaUsuario(usuario: UsuarioProps) {
  return axios.post(`${enderecoBackend}/usuario/autentica`, { usuario: usuario })
}

// export function favoritaPc(token: string, usuario: any, configSalva: any){
//   return axios.post({usuario, configSalva},{headers:{token:token}})
// }

// export function validaToken(tokenjwt){
//   return axios.post(`${enderecoBackend}/usuario/validaToken`, {}, {headers:{tokenjwt :tokenjwt}})
// }
