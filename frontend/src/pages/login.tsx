// src/pages/login.tsx
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { UserRole } from '../constants/roles'

interface LoginProps {
  userRole: UserRole | null
  setUserRole: (role: UserRole | null) => void
}

const Login: React.FC<LoginProps> = ({ userRole, setUserRole }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('regular')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUserRole(selectedRole)
    router.push('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 text-primary text-center">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block text-primary mb-1">Email</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full p-2 border border-primary rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="********"
            className="w-full p-2 border border-primary rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary mb-1">Tipo de Usuario</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            className="w-full p-2 border border-primary rounded"
          >
            <option value="regular">Usuario Regular</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-primary text-white p-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
