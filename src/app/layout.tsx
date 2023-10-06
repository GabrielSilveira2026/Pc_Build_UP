import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pc Build Up',
  description: 'Monte o PC IDEAL para as suas Necessidades',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header style={{
          // backgroundColor: "var(--color-medium)",
          background: "linear-gradient(90deg ,#2a22ba, #723b7c)",
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
      </body>
    </html>
  )
}
