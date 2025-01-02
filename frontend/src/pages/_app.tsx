// src/pages/_app.tsx

import '../styles/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { UserRole } from '../constants/roles'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

// Configura la fuente Inter usando next/font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

interface MyAppProps extends AppProps {}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Redirigir al usuario a la página de login si no tiene un rol asignado
    // Aquí puedes implementar la lógica de redirección
  }, [userRole, router])

  return (
    <div className={`${inter.variable} font-sans min-h-screen`}>
      <Component {...pageProps} userRole={userRole} setUserRole={setUserRole} />
    </div>
  )
}

export default MyApp
