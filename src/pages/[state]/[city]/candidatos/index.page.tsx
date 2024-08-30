import { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import api from 'lib/api'
import type { CandidateSimple } from 'types/candidate'

import { SearchForm } from './components/Form'
import { SearchFilter } from './components/Filter'
import { Candidates } from './components/Candidates'

import styles from './styles.module.scss'
import { maskNumber } from 'utils/mask'
import { useParams } from 'next/navigation'

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

interface PageProps {
  candidates: CandidateSimple[]
}

const SearchPage = ({ candidates }: PageProps) => {
  const params = useParams()
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
  }, [params])

  if (!candidates) {
    return (
      <div className={styles.loading}>
        <span />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.form__and__filter}>
        <SearchForm />

        <SearchFilter
          candidates={candidates}
          setFilter={handleChangeFilter}
          filter={filter}
        />
      </div>

      <Candidates candidates={candidates} filter={filter} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      { params: { state: 'sc', city: '80810-chapeco' } },
      { params: { state: 'sc', city: '81051-florianopolis' } }
    ]
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const city = maskNumber(params?.city as string) as never

  try {
    const [prefeito, vice, vereador] = await Promise.all([
      loadCandidates(city, '11'),
      loadCandidates(city, '12'),
      loadCandidates(city, '13')
    ])
    return { props: { candidates: prefeito.concat(vice).concat(vereador) } }
  } catch (e) {
    console.log(e)
  }

  return { props: { candidates: [] } }
}

export default SearchPage
