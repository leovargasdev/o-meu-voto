import Head from 'next/head'
import { Option } from 'types'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

import { citiesByState, states } from 'data/cities/'
import { maskOnlyNumber, maskToParamsURL } from 'utils/mask'

import styles from './styles.module.scss'

// const roles = [
//   { value: '11', label: 'Prefeito' },
//   { value: '12', label: 'Vice-prefeito' },
//   { value: '13', label: 'Vereador' }
// ]

export const SearchForm = () => {
  const params = useParams()
  const { query, ...router } = useRouter()

  const [state, setState] = useState<Option | undefined | null>()
  const [city, setCity] = useState<Option | undefined | null>()
  // const [role, setRole] = useState<Option | undefined | null>()
  const [loading, setLoading] = useState<boolean>(false)

  const cities = state ? citiesByState[state.value] : []

  const handleSearchCandidates = async (event: FormEvent) => {
    event.preventDefault()

    if (city && state) {
      // const roleQuery = role ? `?role=${role}` : ''
      const cityPath = city.value + '-' + maskToParamsURL(city.label)
      const route = `/${state.value}/${cityPath}/candidatos`

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
      // setRole(roles.find(r => r.value === query.role))
    }
  }, [params])

  const handleChangeState = (value: Option | null) => {
    setState(value)
    setCity(null)
  }

  return (
    <form className={styles.form} onSubmit={handleSearchCandidates}>
      <Head>
        <title>
          Lista de Candidatos a Prefeito e Vereador em {city?.label} - Eleições
          2024
        </title>

        <meta
          name="description"
          content={`Confira a lista completa dos candidatos a prefeito e vereador na cidade ${city?.label} do estado de ${state?.label} para as eleições de 2024. Informações atualizadas e completas.`}
        />

        <link
          rel="canonical"
          href={'https://omeuvoto.com.br' + router.asPath}
        />
      </Head>

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
