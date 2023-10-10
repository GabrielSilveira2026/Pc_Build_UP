"use client"
import { AppProvider } from "./AppList"

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return <AppProvider>{children}</AppProvider>
}