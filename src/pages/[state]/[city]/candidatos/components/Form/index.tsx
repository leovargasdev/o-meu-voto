import { Option } from 'types'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

import { citiesByState, states } from 'data/cities/'
import { maskOnlyNumber, maskToParamsURL } from 'utils/mask'

import styles from './styles.module.scss'
import { useCandidates } from 'hooks'

// const roles = [
//   { value: '11', label: 'Prefeito' },
//   { value: '12', label: 'Vice-prefeito' },
//   { value: '13', label: 'Vereador' }
// ]

export const SearchForm = () => {
  const params = useParams()
  const { query, ...router } = useRouter()
  const { handleChangeNameFilter } = useCandidates()

  const [state, setState] = useState<Option | undefined | null>()
  const [city, setCity] = useState<Option | undefined | null>()
  // const [role, setRole] = useState<Option | undefined | null>()
  const [loading, setLoading] = useState<boolean>(false)

  const [name, setName] = useState<string>('')

  const cities = state ? citiesByState[state.value] : []

  const handleSearchCandidates = async (event: FormEvent) => {
    event.preventDefault()

    if (city && state) {
      // const roleQuery = role ? `?role=${role}` : ''
      const cityPath = city.value + '-' + maskToParamsURL(city.label)
      const nameQuery = name ? `?name=${encodeURIComponent(name)}` : ''
      const route = `/${state.value}/${cityPath}/candidatos${nameQuery}`

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
      setName(query.name as string)
      handleChangeNameFilter(query.name as string)
      // setRole(roles.find(r => r.value === query.role))
    }
  }, [params])

  const handleChangeState = (value: Option | null) => {
    setState(value)
    setCity(null)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    handleChangeNameFilter(newName)
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
          value={name}
          className={styles.input}
          placeholder="Digite o nome do candidato"
          onChange={handleNameChange}
        />
      </fieldset>

      {/* <fieldset>
        <label>Cargo</label>
        <Select
          value={role}
          placeholder="Selecionar"
          onChange={setRole}
          defaultValue={role}
          options={roles}
        />
      </fieldset> */}

      <button type="submit" disabled={loading}>
        Buscar
      </button>
    </form>
  )
}
