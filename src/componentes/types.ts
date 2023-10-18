export interface AppProps {
    estado: "selected" | "unselected",
    id: number,
    id_jogo_steam: number,
    imagem: string,
    nome: string,
    preco: string,
    requisitosminimos: string,
    requisitosrecomendados: string,
}

export interface UsuarioProps {
    nome: string;
    email: string;
    senha: string;
}