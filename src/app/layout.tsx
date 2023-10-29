import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { AppListProvider } from '@/context/AppList/AppListProvider'

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
        <AppListProvider>
          <header style={{
            background: "linear-gradient(90deg ,var(--blue-medium), var(--color-low-light))",
            height: 50,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            fontSize: 25
          }}>
            <Link style={{ color: "white", textDecoration: "none" }} href="/">Home</Link>
            <Link style={{ color: "white", textDecoration: "none" }} href="/login">Login</Link>
          </header>
          {children}
        </AppListProvider>
      </body>
    </html>
  )
}
