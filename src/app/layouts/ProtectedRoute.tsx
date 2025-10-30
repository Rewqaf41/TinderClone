import { useAuthStore } from '@/features/auth'
import { ROUTES } from '@/shared/constants/routes'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.REGISTRATION} replace />
  }

  return <>{children}</>
}
