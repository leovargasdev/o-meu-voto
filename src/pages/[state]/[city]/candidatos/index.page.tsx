import { GetStaticPaths, GetStaticProps } from 'next'

import { CandidatesProvider } from 'hooks'
import { serviceGetCandidates } from 'services'
import type { CandidateSimple } from 'types/candidate'

import { Layout, SEO } from 'components'
import { SearchForm } from './components/Form'
import { SearchFilter } from './components/Filter'
import { Candidates } from './components/Candidates'

import styles from './styles.module.scss'
import { cities } from 'data/cities'
import { maskOnlyNumber } from 'utils/mask'

interface PageProps {
  city: string
  mayor: CandidateSimple[]
  councilor: CandidateSimple[]
}

const CandidatesPage = ({ mayor, councilor, city }: PageProps) => {
  if (!mayor || mayor.length === 0) {
    return (
      <div className={styles.loading}>
        <span />
      </div>
    )
  }

  const title = `Eleições 2024 em ${city} - Confira a lista de candidatos`
  const description = `Veja a lista completa com nomes, partidos e números de urna dos candidatos a prefeito e vereador em ${city} nas eleições municipais de 2024.`

  return (
    <CandidatesProvider candidates={{ mayor, councilor }}>
      <Layout
        title={
          <>
            Eleições 2024 em <span>{city}</span>
          </>
        }
      >
        <SEO title={title} description={description} />

        <div className={styles.container}>
          <aside className={styles.form__and__filter}>
            <SearchForm />
            <SearchFilter />
          </aside>

          <Candidates />
        </div>
      </Layout>
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
      { params: { state: 'rs', city: '88412-santa-maria' } },
      { params: { state: 'rs', city: '87912-pelotas' } },
      { params: { state: 'rs', city: '89630-viamao' } },
      { params: { state: 'pr', city: '75353-curitiba' } },
      { params: { state: 'pr', city: '76910-maringa' } },
      { params: { state: 'pr', city: '77771-ponta-grossa' } },
      { params: { state: 'pr', city: '75639-foz-do-iguacu' } },
      { params: { state: 'pr', city: '74934-cascavel' } },
      // { params: { state: 'sp', city: '71072-sao-paulo' } },
      { params: { state: 'sp', city: '64777-guarulhos' } },
      { params: { state: 'sp', city: '67890-osasco' } },
      { params: { state: 'sp', city: '71455-sorocaba' } },
      { params: { state: 'ms', city: '90514-campo-grande' } },
      { params: { state: 'ms', city: '90735-dourados' } },
      { params: { state: 'ms', city: '91650-tres-lagoas' } },
      { params: { state: 'ms', city: '90638-corumba' } },
      { params: { state: 'ms', city: '98035-costa-rica' } },
      // { params: { state: 'rj', city: '60011-rio-de-janeiro' } },
      { params: { state: 'rj', city: '58130-cabo-frio' } },
      { params: { state: 'rj', city: '58033-araruama' } },
      { params: { state: 'rj', city: '58653-niteroi' } },
      { params: { state: 'rj', city: '58696-nova-iguacu' } },
      { params: { state: 'ba', city: '38490-salvador' } },
      { params: { state: 'ba', city: '37710-palmeiras' } }
    ]
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let cityId = (params?.city as string) ?? ''
  cityId = maskOnlyNumber(cityId)

  const isInvalidCity = !cities.find(city => city.value === cityId)

  if (isInvalidCity) {
    const destination = '/nao-encontrado/cidade'
    return { props: {}, redirect: { destination, permanent: true } }
  }

  const data = await serviceGetCandidates(cityId)
  const revalidate = data.mayor.length === 0 ? 60 : false

  return { props: data, revalidate }
}

export default CandidatesPage
