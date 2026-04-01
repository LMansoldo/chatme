import { useState } from 'react'

const SESSION_KEY = 'lm_auth'
const PASSWORD = import.meta.env.VITE_AUTH_PASSWORD as string

function getInitialState(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1'
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialState)

  function authenticate(pin: string): boolean {
    if (pin === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }

  return { isAuthenticated, authenticate, logout }
}
