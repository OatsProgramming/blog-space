import './globals.css'
import { Heebo } from 'next/font/google'

const heebo = Heebo({ subsets: ['latin'] })

export const metadata = {
  title: 'Sign in',
  description: "Either sign in or create a new account if you're a new user",
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={heebo.className}>
        {children}
      </body>
    </html>
  )
}
