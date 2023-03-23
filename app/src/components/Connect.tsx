import React, { useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Connect() {

  const { apiFetch } = useAuth()
  const emailRef = useRef<HTMLInputElement | null>(null)

  async function handleConnectWithOutlook() {
    const email = emailRef.current?.value
    const res = await apiFetch<string>(`/connect?type=outlook&email=${email}`)
    const authUrl = await res.json()
    window.location.href = authUrl
  }

  async function handleConnectWithOther() {
    const email = emailRef.current?.value
    const res = await apiFetch<string>(`/connect?email=${email}`)
    const authUrl = await res.json()
    window.location.href = authUrl
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="connect-form">
      <input ref={emailRef} type="text" />
      <button onClick={() => handleConnectWithOutlook()}>Connect with Outlook</button>
      <button onClick={() => handleConnectWithOther()}>Connect with other mail</button>
    </form>
  )
}
