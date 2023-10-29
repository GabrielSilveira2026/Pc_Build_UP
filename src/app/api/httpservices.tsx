import { UserProps } from "@/componentes/types";
import axios from "axios";

const enderecoBackend = "http://164.152.38.61"

export function pesquisaApps(app: string, offset: number) {
  return axios.get(`https://g4673849dbf8477-kh8pftimtcmp3b10.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/pesquisa/resultados/${app}?limit=10000&offset=` + offset)
}

export function montaPc(requisitos: any) {
  return axios.post(`${enderecoBackend}/montaPc`, { requisitos: requisitos })
}

export function cadastraUsuario(user: UserProps) {
  return axios.post(`${enderecoBackend}/usuario/cadastro`, { usuario: user })
}

export function autenticaUsuario(user: UserProps) {
  return axios.post(`${enderecoBackend}/usuario/autentica`, { usuario: user })
}