import React, { useEffect, useState } from 'react'
import { apiFetch } from '../utils/apiFetch'
import { useCurrentIntegration } from './CurrentIntegrationContext'

export default function AllIntegrations() {

  const [integrations, setIntegrations] = useState([])
  const { setCurrentIntegration, currentIntegration } = useCurrentIntegration()
  
  function setId(id: string) {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    params.set('id', id)
    url.search = params.toString()
    window.history.pushState({}, '', url.toString())
  }

  useEffect(() => {
    apiFetch('/integrations')
      .then(res => res.json())
      .then(data => {
        setIntegrations(data)
      })
  }, [])

  return (
    <div style={{ width: "500px", border: "2px solid black", padding: ".5rem 1rem" }}>
      <div>{integrations.filter((i: any) => i.type == "outlook").map((integration: any) => {
        return <div style={{ backgroundColor: integration.id == currentIntegration ? "rgba(128, 128, 128, 0.4)" : "rgba(128, 128, 128, 0.144)" }}onClick={() => setCurrentIntegration(integration.id)} className="integration">{integration.id}, {integration.name}</div>
      })}</div>
    </div>
  )
}
