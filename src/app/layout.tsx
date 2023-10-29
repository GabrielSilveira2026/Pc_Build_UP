import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { AppListProvider } from '@/context/AppList/AppList'
import { AuthProvider } from '@/context/Auth/AuthContext'
import { NavBar } from '@/componentes/NavBar/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pc Build Up',
  description: 'Monte o computador IDEAL para as suas Necessidades',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppListProvider>
            <NavBar/>
            {children}
          </AppListProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
