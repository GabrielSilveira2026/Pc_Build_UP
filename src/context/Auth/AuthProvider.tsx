"use client"
import { AppProvider } from "./AuthContext"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return <AppProvider>{children}</AppProvider>
}