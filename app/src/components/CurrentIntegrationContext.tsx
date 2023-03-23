import React, { useContext, useEffect, useState } from 'react'

const CurrentIntegrationContext = React.createContext<useCurrentIntegrationProps>({
  currentIntegration: "",
  setCurrentIntegration: () => {}
})

export function useCurrentIntegration() {
  return useContext(CurrentIntegrationContext)
}

interface useCurrentIntegrationProps {
  currentIntegration: string
  setCurrentIntegration: React.Dispatch<React.SetStateAction<string>>
}

export function CurrentIntegrationProvider({ children }: { children: React.ReactNode }) {

  const [currentIntegration, setCurrentIntegration] = useState<string>("")

  useEffect(() => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    params.set('id', currentIntegration)
    url.search = params.toString()
    window.history.pushState({}, '', url.toString())
  }, [currentIntegration])

  const value: useCurrentIntegrationProps = {
    currentIntegration,
    setCurrentIntegration
  }

  return <CurrentIntegrationContext.Provider value={value}>{children}</CurrentIntegrationContext.Provider>
}