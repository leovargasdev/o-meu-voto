import type { CandidateSimple } from 'types'
import { createContext, useContext, useState } from 'react'

interface Filter {
  parties: string[]
  candidateName: string
}

export interface CandidatesContextData {
  filter: Filter
  candidates: {
    mayor: CandidateSimple[]
    councilor: CandidateSimple[]
  }
  handleChangeFilter: (value: Partial<Filter>) => void
  handleChangeFilterParties: (value: string) => void
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
  const [filter, setFilter] = useState<Filter>({
    parties: [],
    candidateName: ''
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

  // useEffect(() => {
  //   if (filter.length > 0) {
  //     setFilter([])
  //   }
  // }, [candidates])

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
