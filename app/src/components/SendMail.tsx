import React, { useRef } from 'react'
import { apiFetch } from '../utils/apiFetch'
import { useCurrentIntegration } from './CurrentIntegrationContext'

export default function SendMail() {
  const toRef = useRef<HTMLInputElement>(null)
  const subjectRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const { currentIntegration } = useCurrentIntegration()

  async function handleSendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const to = toRef.current?.value
    const subject = subjectRef.current?.value
    const body = messageRef.current?.value
    const res = await apiFetch<string>(`/send/${currentIntegration}`, {
      method: "post",
      body: JSON.stringify({ to: to?.split(","), subject, body }),
    })
    const data = await res.json()
  }

  if (!currentIntegration) {
    return <></>
  }

  return (
    <div style={{ width: "500px", border: "2px solid black", padding: ".5rem 1rem" }}>
      <form onSubmit={(e) => handleSendEmail(e)} className="connect-form">
        <label htmlFor="to">To</label>
        <input id="to" ref={toRef} type="text" />
        <label htmlFor="subject">Subject</label>
        <input id="name" ref={subjectRef} type="text" />
        <label htmlFor="body">Messag</label>
        <textarea id="name" ref={messageRef} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
