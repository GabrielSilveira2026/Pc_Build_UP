import { AppProps } from '@/componentes/types'
import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext<any>({})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [appList, setAppList] = useState<AppProps[]>([
        {   
            "id": 5,
            "estado": "unselected",
            "id_jogo_steam": 1151640,
            "imagem": "https://cdn.akamai.steamstatic.com/steam/apps/1151640/header.jpg?t=1667297464",
            "nome": "Horizon Zero Dawn™ Complete Edition",
            "preco": "R$ 199,90",
            "requisitosminimos": "{\"Armazenamento\": \" 100 GB available space\",\"Cpu\": \" Intel Core i5-2500K@3.3GHz or AMD FX 6300@3.5GHz\",\"Gpu\": \" Nvidia GeForce GTX 780 (3 GB) or AMD Radeon R9 290 (4GB)\",\"Ram\": \" 8 GB RAM\"}",
            "requisitosrecomendados": "{\"Armazenamento\": \" 100 GB available space\",\"Cpu\": \" Intel Core i7-4770K@3.5GHz or Ryzen 5 1500X@3.5GHz\",\"Gpu\": \" Nvidia GeForce GTX 1060 (6 GB) or AMD Radeon RX 580 (8GB)\",\"Ram\": \"8Gb ram\"}"
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