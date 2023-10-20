import { AppProps } from '@/componentes/types'
import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext<any>({})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [appList, setAppList] = useState<AppProps[]>([
    ])

    function addToAppList(appToAdd: AppProps) {
        if (appList.length < 5) {
            appToAdd.estado = "selected"
            setAppList((old) => ([
                ...old,
                appToAdd
            ]))
        }
    }

    function removeToAppList(appToRemove: AppProps) {
        appToRemove.estado = "unselected"
        let newAppList = appList.filter(app => app.id_jogo_steam !== appToRemove.id_jogo_steam)
        setAppList(newAppList)
    }

    function clearAppList() {
        appList.forEach(app => {
            app.estado = "unselected"
        });
        setAppList([])
    }
    return (
        <AppContext.Provider value={{ appList , addToAppList, removeToAppList, clearAppList }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppListContext = () =>{
    return useContext(AppContext)
}