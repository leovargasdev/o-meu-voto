import Link from 'next/link'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import api from 'lib/api'
import { SearchForm } from './components/Form'
import type { CandidateSimple } from 'types/candidate'

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

  const partidos = data?.reduce((acc, item) => {
    const key = item.partido.sigla

    acc[key] = acc[key] ? acc[key] + 1 : 1

    return acc
  }, {} as Record<string, number>)

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
      <SearchForm />

      <div className={styles.content}>
        <h1>Lista dos candidatos</h1>

        {!loading && (
          <>
            {partidos && (
              <div className={styles.filter}>
                {Object.keys(partidos).map(partido => (
                  <button
                    type="button"
                    key={partido}
                    onClick={() => handleChangeFilter(partido)}
                  >
                    {partido} ({partidos[partido]})
                  </button>
                ))}
              </div>
            )}

            <div className={styles.candidates}>
              {data
                .filter(candidate =>
                  filter.length === 0
                    ? candidate
                    : filter.includes(candidate.partido.sigla)
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
                      <img src="/icons/MDB.png" width="auto" height={48} />

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
          </>
        )}
      </div>
    </div>
  )
}

export default SearchPage
