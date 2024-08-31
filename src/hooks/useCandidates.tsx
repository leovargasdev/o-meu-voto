import type { CandidateSimple } from 'types'
import { createContext, useContext, useEffect, useState } from 'react'

export interface CandidatesContextData {
  filter: string[]
  handleChangeFilter: (value: string) => void
  candidates: CandidateSimple[]
}

interface CandidatesProviderProps {
  candidates: CandidateSimple[]
  children: React.ReactNode
}

const CandidatesContext = createContext({} as CandidatesContextData)

export function CandidatesProvider({
  candidates,
  children
}: CandidatesProviderProps) {
  const [filter, setFilter] = useState<string[]>([])

  const handleChangeFilter = (keyFilter: string) => {
    setFilter(state => {
      if (state.includes(keyFilter)) {
        return state.filter(s => s !== keyFilter)
      }

      return [...state, keyFilter]
    })
  }

  useEffect(() => {
    if (filter.length > 0) {
      setFilter([])
    }
  }, [candidates])

  return (
    <CandidatesContext.Provider
      value={{ filter, handleChangeFilter, candidates }}
    >
      {children}
    </CandidatesContext.Provider>
  )
}

export function useCandidates() {
  const context = useContext(CandidatesContext)
  return context
}
