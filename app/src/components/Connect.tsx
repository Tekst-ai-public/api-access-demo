import React, { useRef } from 'react'
import { apiFetch } from '../utils/apiFetch'

export default function Connect() {

  const emailRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  async function handleConnectWithOutlook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = emailRef.current?.value
    const name = nameRef.current?.value
    const res = await apiFetch<string>(`/connect?type=outlook&email=${email}&name=${name}`)
    const authUrl = await res.json()
    window.location.href = authUrl
  }

  return (
    <div style={{ width: "500px", border: "2px solid black", padding: ".5rem 1rem" }}>
      <form onSubmit={(e) => handleConnectWithOutlook(e)} className="connect-form">
        <label htmlFor="email">Email</label>
        <input id="email" ref={emailRef} type="text" />
        <label htmlFor="name">Name</label>
        <input id="name" ref={nameRef} type="text" />
        <button type="submit">Connect with Outlook</button>
      </form>
    </div>
  )
}
