"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import {useRouter} from "next/navigation"
import { setCookie, parseCookies } from "nookies"

import { autenticaUsuario } from '@/app/api/httpservices'
import { UserProps } from '@/componentes/types'

interface AuthContextProp {
    isAuthenticated: boolean,
    user: UserProps,
    sigiIn: (data:UserProps) => Promise<void>
}

export const AuthContext = createContext<any>({} as AuthContextProp)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [user, setUser] = useState<UserProps | null>(null)

    //recuperar informações do usuario atualizadas

    // useEffect(()=>{
    //     const { 'PcBuildToken':token } = parseCookies()

    //     if (token) {
            
    //     }
    // },[])

    const isAuthenticated = !!user

    async function sigiIn({ email, senha }: UserProps) {
        const response = await autenticaUsuario({ email, senha })
        
        const { token, 'usuario': user } = response.data
        
        setCookie(undefined, "PcBuildToken", token, {
            maxAge: 60 * 60 * 1//1 hora
        })
        console.log(user);
        
        setCookie(undefined, "UserInfo", JSON.stringify(user), {
            maxAge: 60 * 60 * 1//1 hora
        })

        setUser(user)
        router.push("/")
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