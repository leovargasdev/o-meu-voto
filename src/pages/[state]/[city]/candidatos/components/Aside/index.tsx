import Select from 'react-select'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import type { Option } from 'types'
import { useCandidates } from 'hooks'
import listParties from 'data/partidos'
import { citiesByState, states } from 'data/cities/'
import { maskOnlyNumber, maskToParamsURL } from 'utils/mask'

import styles from './styles.module.scss'

type Sigla = keyof typeof listParties

export const Aside = () => {
  const {
    candidates: data,
    filter,
    handleChangeFilter,
    handleChangeFilterParties
  } = useCandidates()

  const candidates = data.mayor.concat(data.councilor)

  const params = useParams()
  const { query, ...router } = useRouter()

  const [state, setState] = useState<Option | undefined | null>()
  const [city, setCity] = useState<Option | undefined | null>()
  const [loading, setLoading] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const cities = state ? citiesByState[state.value] : []

  const parties = candidates.reduce((acc, item) => {
    const key = item.partidoSigla
    acc[key] = acc[key] ? acc[key] + 1 : 1

    return acc
  }, {} as Record<string, number>)

  const handleSearchCandidates = async (event: FormEvent) => {
    event.preventDefault()

    if (city && state) {
      const cityPath = city.value + '-' + maskToParamsURL(city.label)
      const route = `/${state.value}/${cityPath}/candidatos/`

      router.push(route)
      setLoading(true)
    }
  }

  useEffect(() => {
    if (params?.state && params?.city) {
      loading && setLoading(false)
      setState(states.find(s => s.value === query.state))

      const city = maskOnlyNumber(params.city as string)
      setCity(citiesByState[query.state as string].find(c => c.value === city))
    }
  }, [params])

  const handleChangeState = (value: Option | null) => {
    setState(value)
    setCity(null)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const candidateName = e.target.value.trimStart()

    timeoutId && clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => handleChangeFilter({ candidateName }), 500))
  }

  return (
    <aside className={styles.container}>
      <form className={styles.form} onSubmit={handleSearchCandidates}>
        <fieldset>
          <label>Estado</label>
          <Select
            placeholder="Selecionar"
            onChange={handleChangeState}
            options={states}
            value={state}
          />
        </fieldset>

        <fieldset>
          <label>Cidade</label>
          <Select
            value={city}
            placeholder="Selecionar"
            onChange={setCity}
            options={cities}
          />
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className={styles.form__button}
        >
          Buscar
        </button>
      </form>

      <div className={styles.search}>
        <MagnifyingGlass />
        <input
          type="text"
          className={styles.input}
          placeholder="Digite o nome do candidato"
          onChange={handleNameChange}
        />
      </div>

      <div className={styles.filter__parties}>
        {Object.keys(parties).map(party => (
          <button
            type="button"
            key={party}
            onClick={() => handleChangeFilterParties(party)}
            aria-pressed={
              filter.parties.includes(party) || filter.parties.length === 0
            }
          >
            <img
              width={32}
              height="auto"
              loading="lazy"
              src={`/icons/${party}.png`}
              alt={`Logo do partido ${party}`}
              title={`Logo do partido ${party}`}
            />
            <p>{listParties[party.toLocaleLowerCase() as Sigla]?.name}</p>
            <span>({parties[party]})</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
