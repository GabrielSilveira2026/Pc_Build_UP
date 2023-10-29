"use client"
import { AppProvider } from "./AppList"

export const AppListProvider = ({ children }: { children: React.ReactNode }) => {
    return <AppProvider>{children}</AppProvider>
}