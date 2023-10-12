import { AppProps } from '@/componentes/types'
import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext<any>({})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [appList, setAppList] = useState<AppProps[]>([])

    function addToAppList(app: AppProps) {
        setAppList((old) => ([
            ...old,
            app
        ]))
    }

    const removeToAppList = (id_app: number) => {
        let newAppList = appList.filter(app => app.id_jogo_steam !== id_app)
        // setAppList([])
        setAppList(newAppList)
    }
    return (
        <AppContext.Provider value={{ appList , addToAppList, removeToAppList }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppListContext = () =>{
    const cart = useContext(AppContext)
    return cart
}