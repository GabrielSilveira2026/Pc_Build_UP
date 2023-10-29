import React, { createContext, useContext, useState } from 'react'
import Router from "next/router"
import { setCookie } from "nookies"

import { autenticaUser } from '@/app/api/httpservices'
import { UserProps } from '@/componentes/types'

interface AuthContextProp {
    isAuthenticated: boolean,
    user: UserProps,
    sigiIn: (data:UserProps) => Promise<void>
}

export const AuthContext = createContext<any>({} as AuthContextProp)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProps | null>(null)

    const isAuthenticated = !!user

    async function sigiIn({ email, senha }: UserProps) {
        const response = await autenticaUser({ email, senha })
        const { token, user } = response.data
        
        setCookie(undefined, "PcBuildToken", token, {
            maxAge: 60 * 60 * 1//1 hora
        })

        setUser(user)

        Router.push("/")
    }

    return (
        <AuthContext.Provider value={{user , isAuthenticated, sigiIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}