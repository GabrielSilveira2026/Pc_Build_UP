import { AppProps } from '@/componentes/types'
import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext<any>({})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [appList, setAppList] = useState<AppProps[]>([
        {   
            "id": 5,
            "estado": "selected",
            "id_jogo_steam": 1627720,
            "imagem": "https://cdn.akamai.steamstatic.com/steam/apps/1627720/header.jpg?t=1697438157",
            "nome": "Lies of P",
            "preco": "R$ 199,90",
            "requisitosminimos": "{\"Armazenamento\": \" 50 GB de espao disponvel\",\"Cpu\": \" AMD Ryzen 3 1200Intel Core i3-6300\",\"Gpu\": \" AMD Radeon RX 560 4GB / NVIDIA GeForce GTX 960 4GB\",\"Ram\": \" 8 GB de RAM\"}",
            "requisitosrecomendados": "{\"Armazenamento\": \" 50 GB de espao disponvel\",\"Cpu\": \" AMD Ryzen 3 1200Intel Core i3-6300\",\"Gpu\": \" AMD Radeon RX 6500 XT 4GB / NVIDIA GeForce GTX 1660 6GB\",\"Ram\": \" 16 GB de RAM\"}"
          }
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