import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface FetchResponse<T> extends Response {
  json: () => Promise<T>
}

const AuthContext = React.createContext<useAuthProps>({
  logout: () => {},
  login: () => {},
  apiFetch: () => new Promise((resolve, reject) => {}),
  user: ""
})

export function useAuth() {
  return useContext(AuthContext)
}

interface useAuthProps {
  logout: () => void
  login: (email: string) => any
  apiFetch: <T>(path: string, init?: RequestInit | undefined) => Promise<FetchResponse<T>>
  user: string
}

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<string>("")
  const params = new URLSearchParams(document.location.search)
  const tekstid = params.get("tekstid")

  useEffect(() => {
    if (tekstid) {
      localStorage.setItem('user', tekstid)
    }
    const user = localStorage.getItem('user')
    if (user) {
      setUser(user)
    }
  }, [])

  async function apiFetch<T = any>(path: string, init: RequestInit | undefined = {}): Promise<FetchResponse<T>> {
    init.headers = {
      'Content-Type': 'application/json',
      ...init.headers,
    }
    const url = new URL(process.env.REACT_APP_SERVER_BASE_URL + path)
    const res: Promise<FetchResponse<T>> = fetch(`${url.toString()}`, {
      ...init,
    })
    return res
  }


  async function logout() {
  }

  async function login(email: string) {

  }

  const value: useAuthProps = {
    logout: logout,
    login: login,
    apiFetch: apiFetch,
    user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}