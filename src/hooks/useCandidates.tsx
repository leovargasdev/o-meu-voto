import type { CandidateSimple } from 'types'
import { createContext, useContext, useEffect, useState } from 'react'

interface Filter {
  parties: string[]
  candidateName: string
  role: string
}

interface Candidates {
  mayor: CandidateSimple[]
  deputyMayor: CandidateSimple[]
  councilor: CandidateSimple[]
}

export interface CandidatesContextData {
  filter: Filter
  candidates: Candidates
  handleChangeFilter: (value: Partial<Filter>) => void
  handleChangeFilterParties: (value: string) => void
}

interface CandidatesProviderProps {
  candidates: Candidates
  children: React.ReactNode
}

const CandidatesContext = createContext({} as CandidatesContextData)

export function CandidatesProvider({
  candidates,
  children
}: CandidatesProviderProps) {
  const [filter, setFilter] = useState<Filter>({
    parties: [],
    candidateName: '',
    role: ''
  })

  const handleChangeFilter = (update: Partial<Filter>) => {
    setFilter(state => ({ ...state, ...update }))
  }

  const handleChangeFilterParties = (partyId: string) => {
    if (filter.parties.includes(partyId)) {
      const parties = filter.parties.filter(p => p !== partyId)
      handleChangeFilter({ parties })
      return
    }

    handleChangeFilter({ parties: [...filter.parties, partyId] })
  }

  useEffect(() => {
    if (filter.parties.length > 0) {
      handleChangeFilter({ parties: [] })
    }
  }, [candidates])

  return (
    <CandidatesContext.Provider
      value={{
        filter,
        candidates,
        handleChangeFilter,
        handleChangeFilterParties
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
