import Link from 'next/link'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import api from 'lib/api'
import { SearchForm } from './components/Form'
import type { CandidateSimple } from 'types/candidate'

import styles from './styles.module.scss'
import { SearchFilter } from './components/Filter'
import { AnimationForm } from './components/AnimationForm'

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

const formatSigla = (value: string) => {
  return value
    .normalize('NFD')
    .replace(/\s/g, '')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
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

      <div className={styles.content}>
        <h1>Lista dos candidatos</h1>

        {!loading && (
          <div className={styles.candidates}>
            {data
              .filter(candidate =>
                filter.length === 0
                  ? candidate
                  : filter.includes(formatSigla(candidate.partido.sigla))
              )
              .map(candidate => {
                const code = candidate.numero.toString().split('')

                return (
                  <Link
                    target="_blank"
                    href={`/cidade/${candidate.ufCandidatura}/candidato/${candidate.id}`}
                    className={classNames('card', styles.candidate)}
                    key={candidate.id}
                  >
                    <div className={styles.info}>
                      <strong>{candidate.nomeUrna}</strong>
                      <p>{candidate.nomeCompleto}</p>
                    </div>

                    <div className={styles.code}>
                      {code.map(item => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </Link>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
