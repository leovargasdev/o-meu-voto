import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import api from 'lib/api'
import type { CandidateSimple } from 'types/candidate'

import { SearchForm } from './components/Form'
import { SearchFilter } from './components/Filter'
import { AnimationForm } from './components/AnimationForm'
import { Candidates } from './components/Candidates'

import styles from './styles.module.scss'

const loadCandidates = async (city: string, role: string) => {
  try {
    const route = `/listar/2024/${city}/2045202024/${role}/candidatos`
    const response = await api.get<{ candidatos: CandidateSimple[] }>(route)

    return response.data.candidatos.filter(
      c => c.descricaoSituacao !== 'Indeferido'
    )
  } catch (err) {
    console.log(err)
  }

  return []
}

const SearchPage = () => {
  const { query } = useRouter()

  const city = (query?.city as string) ?? ''
  const role = (query?.role as string) ?? ''

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['candidates', role, city],
    queryFn: () => loadCandidates(city, role),
    enabled: !!role && !!city
  })

  const loading = !data || isFetching || isLoading

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
  }, [role, city])

  return (
    <div className={styles.container}>
      {!city && !role && <AnimationForm />}

      <div className={styles.form__and__filter}>
        <SearchForm />

        {!loading && (
          <SearchFilter
            candidates={data}
            setFilter={handleChangeFilter}
            filter={filter}
          />
        )}
      </div>

      {!loading && <Candidates candidates={data} filter={filter} />}
    </div>
  )
}

export default SearchPage
