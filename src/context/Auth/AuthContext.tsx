import React, { createContext, useContext, useState } from 'react'
import Router from "next/router"
import { setCookie } from "nookies"

import { autenticaUsuario } from '@/app/api/httpservices'
import { UsuarioProps } from '@/componentes/types'

interface AuthContextProp {
    isAuthenticated: boolean
}

export const AuthContext = createContext<any>({} as AuthContextProp)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UsuarioProps | null>(null)
    const isAuthenticated = false

    async function sigiIn({ email, senha }: UsuarioProps) {
        const response = await autenticaUsuario({ email, senha })
        const { token, usuario } = response.data
        
        setCookie(undefined, "PcBuildToken", token, {
            maxAge: 60 * 60 * 1//1 hora
        })

        setUser(usuario)

        Router.push("/")
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, sigiIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}