import type { CandidateSimple } from 'types'
import { createContext, useContext, useEffect, useState } from 'react'

export interface CandidatesContextData {
  filter: string[]
  handleChangeFilter: (value: string) => void
  candidates: {
    mayor: CandidateSimple[]
    councilor: CandidateSimple[]
  }
  nameFilter: string
  handleChangeNameFilter: (value: string) => void
}

interface CandidatesProviderProps {
  candidates: {
    mayor: CandidateSimple[]
    councilor: CandidateSimple[]
  }
  children: React.ReactNode
}

const CandidatesContext = createContext({} as CandidatesContextData)

export function CandidatesProvider({
  candidates,
  children
}: CandidatesProviderProps) {
  const [filter, setFilter] = useState<string[]>([])
  const [nameFilter, setNameFilter] = useState<string>('')

  const handleChangeFilter = (keyFilter: string) => {
    setFilter(state => {
      if (state.includes(keyFilter)) {
        return state.filter(s => s !== keyFilter)
      }

      return [...state, keyFilter]
    })
  }

  const handleChangeNameFilter = (value: string) => {
    setNameFilter(value)
  }

  useEffect(() => {
    if (filter.length > 0) {
      setFilter([])
    }
  }, [candidates])

  return (
    <CandidatesContext.Provider
      value={{
        filter,
        handleChangeFilter,
        candidates,
        nameFilter,
        handleChangeNameFilter
      }}
    >
      {children}
    </CandidatesContext.Provider>
  )
}

export function useCandidates() {
  const context = useContext(CandidatesContext)
  return context
}
