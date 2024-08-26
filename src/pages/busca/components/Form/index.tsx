import { Option } from 'types'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { citiesByState, states } from 'data/cities/'

import styles from './styles.module.scss'

export const SearchForm = () => {
  const router = useRouter()

  const [state, setState] = useState<Option | null>(null)
  const [city, setCity] = useState<Option | null>(null)
  const [role, setRole] = useState<Option | null>({
    value: '11',
    label: 'Prefeito'
  })

  const handleSearchCandidates = async (event: FormEvent) => {
    event.preventDefault()

    if (city && role) {
      const query = {
        role: role.value,
        city: city.value
      }
      router.replace({ query })
    }
  }

  const cities = state ? citiesByState[state.value] : []

  return (
    <form className={styles.form} onSubmit={handleSearchCandidates}>
      <fieldset>
        <label>Estado</label>
        <Select placeholder="Selecionar" onChange={setState} options={states} />
      </fieldset>

      <fieldset>
        <label>Cidade</label>
        <Select
          placeholder="Selecionar"
          onChange={setCity}
          isSearchable
          options={cities}
        />
      </fieldset>

      <fieldset>
        <label>Cargo</label>
        <Select
          placeholder="Selecionar"
          onChange={setRole}
          defaultValue={role}
          options={[
            { value: '11', label: 'Prefeito' },
            { value: '12', label: 'Vice-prefeito' },
            { value: '13', label: 'Vereador' }
          ]}
        />
      </fieldset>

      <button type="submit">Buscar</button>
    </form>
  )
}
