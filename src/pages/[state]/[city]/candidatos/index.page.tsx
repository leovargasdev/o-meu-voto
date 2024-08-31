import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { GetStaticPaths, GetStaticProps } from 'next'

import { serviceGetCandidates } from 'services'
import type { CandidateSimple } from 'types/candidate'

import { SearchForm } from './components/Form'
import { SearchFilter } from './components/Filter'
import { Candidates } from './components/Candidates'

import styles from './styles.module.scss'
import { CandidatesProvider } from 'hooks'

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
    <CandidatesProvider candidates={candidates}>
      <div className={styles.container}>
        <div className={styles.form__and__filter}>
          <SearchForm />
          <SearchFilter />
        </div>

        <Candidates />
      </div>
    </CandidatesProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      { params: { state: 'sc', city: '80810-chapeco' } },
      { params: { state: 'sc', city: '81051-florianopolis' } },
      { params: { state: 'sc', city: '80470-blumenau' } },
      { params: { state: 'sc', city: '81795-joinville' } },
      { params: { state: 'sc', city: '80896-criciuma' } },
      { params: { state: 'sc', city: '80390-balneario-camboriu' } },
      { params: { state: 'rs', city: '88013-porto-alegre' } },
      { params: { state: 'rs', city: '85995-caxias-do-sul' } },
      { params: { state: 'rs', city: '87718-novo-hamburgo' } },
      { params: { state: 'pr', city: '75353-curitiba' } },
      { params: { state: 'pr', city: '76910-maringa' } },
      { params: { state: 'pr', city: '77771-ponta-grossa' } },
      { params: { state: 'pr', city: '75639-foz-do-iguacu' } },
      { params: { state: 'pr', city: '74934-cascavel' } },
      { params: { state: 'sp', city: '71072-sao-paulo' } },
      { params: { state: 'sp', city: '64777-guarulhos' } },
      { params: { state: 'sp', city: '67890-osasco' } },
      { params: { state: 'sp', city: '71455-sorocaba' } }
    ]
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const candidates = await serviceGetCandidates(params?.city as string)
  const revalidate = candidates.length === 0 ? 60 : false

  return { props: { candidates }, revalidate }
}

export default SearchPage
