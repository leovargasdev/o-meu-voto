import { Option } from 'types'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { useCandidates } from 'hooks'
import { citiesByState, states } from 'data/cities/'
import { maskOnlyNumber, maskToParamsURL } from 'utils/mask'

import styles from './styles.module.scss'

export const SearchForm = () => {
  const params = useParams()
  const { query, ...router } = useRouter()
  const { handleChangeNameFilter } = useCandidates()

  const [state, setState] = useState<Option | undefined | null>()
  const [city, setCity] = useState<Option | undefined | null>()
  const [loading, setLoading] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const cities = state ? citiesByState[state.value] : []

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
    const value = e.target.value.trimStart()

    timeoutId && clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => handleChangeNameFilter(value), 500))
  }

  return (
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
          isSearchable
          options={cities}
          className={styles.input}
        />
      </fieldset>

      <fieldset>
        <label>Nome</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Digite o nome do candidato"
          onChange={handleNameChange}
        />
      </fieldset>

      <button type="submit" disabled={loading}>
        Buscar
      </button>
    </form>
  )
}
