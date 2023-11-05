"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import {useRouter} from "next/navigation"
import { setCookie, parseCookies, destroyCookie } from "nookies"

import { autenticaUsuario } from '@/app/api/httpservices'
import { UserProps } from '@/componentes/types'

interface AuthContextProp {
    isAuthenticated: boolean,
    user: UserProps,
    logIn: (data:UserProps) => Promise<void>
}

export const AuthContext = createContext<any>({} as AuthContextProp)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [user, setUser] = useState<UserProps | null>(null)
    
    useEffect(()=>{
        const { UserInfo } = parseCookies()

        if (UserInfo) {
            setUser(JSON.parse(UserInfo))
        }
    },[])

    const isAuthenticated = !!user

    async function logIn({ email, senha }: UserProps) {
        const response = await autenticaUsuario({ email, senha })
        
        const { token, 'usuario': user } = response.data
        
        setCookie(undefined, "PcBuildToken", token, {
            maxAge: 60 * 60 * 1//1 hora
        })
        
        setCookie(undefined, "UserInfo", JSON.stringify(user), {
            maxAge: 60 * 60 * 1//1 hora
        })

        setUser(user)
        router.back()
    }

    function logOut() {
        destroyCookie(undefined, "UserInfo")
        destroyCookie(undefined, "PcBuildToken")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user , isAuthenticated, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}