import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import cities from 'data/mock-cities.json'

import styles from './styles.module.scss'

export const SearchForm = () => {
  const router = useRouter()

  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [role, setRole] = useState('')

  const handleSearchCandidates = async (event: FormEvent) => {
    event.preventDefault()
    router.replace({ query: { role, city, state } })
  }

  return (
    <form className={styles.form} onSubmit={handleSearchCandidates}>
      <h1>Filtros</h1>

      <fieldset>
        <label htmlFor="">Estado</label>
        <select name="state" onChange={e => setState(e.target.value)}>
          <option value="sc">Santa Catarina</option>
          <option value="pr">Paraná</option>
          <option value="rs">Rio Grande do Sul</option>
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor="">Cidade</label>
        <select name="city" onChange={e => setCity(e.target.value)}>
          {cities.map(city => (
            <option value={city.codigo} key={city.codigo}>
              {city.nome}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor="">Cargo</label>
        <select name="role" onChange={e => setRole(e.target.value)}>
          <option value="11">Prefeito</option>
          <option value="12">Vice-prefeito</option>
          <option value="13">Vereador</option>
        </select>
      </fieldset>

      <button type="submit">Buscar</button>
    </form>
  )
}
