import { createContext, useContext } from 'react'
import { useKoleksi } from '../hooks/useKoleksi.js'

export const KoleksiContext = createContext(null)

export function KoleksiProvider({ children }) {
  const value = useKoleksi()
  return (
    <KoleksiContext.Provider value={value}>
      {children}
    </KoleksiContext.Provider>
  )
}

export function useKoleksiContext() {
  const ctx = useContext(KoleksiContext)
  if (!ctx) {
    throw new Error('useKoleksiContext harus dipakai di dalam KoleksiProvider')
  }
  return ctx
}
