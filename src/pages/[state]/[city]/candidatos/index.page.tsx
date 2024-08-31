import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'

import { CandidatesProvider } from 'hooks'
import { serviceGetCandidates } from 'services'
import type { CandidateSimple } from 'types/candidate'

import { Layout } from 'components'
import { SearchForm } from './components/Form'
import { SearchFilter } from './components/Filter'

import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { Candidates } from './components/Candidates'

interface PageProps {
  city: string
  mayor: CandidateSimple[]
  councilor: CandidateSimple[]
}

const CandidatesPage = ({ mayor, councilor, city }: PageProps) => {
  const router = useRouter()
  if (!mayor || mayor.length === 0) {
    return (
      <div className={styles.loading}>
        <span />
      </div>
    )
  }

  return (
    <CandidatesProvider candidates={{ mayor, councilor }}>
      <Layout
        title={
          <>
            Eleições 2024 em <span>{city}</span>
          </>
        }
      >
        <Head>
          <title>Eleições 2024 em {city} - Confira a lista de candidatos</title>

          <meta
            name="description"
            content={`Veja a lista completa com nomes, partidos e números de urna dos candidatos a prefeito e vereador em ${city} nas eleições municipais de 2024.`}
          />

          <link
            rel="canonical"
            href={'https://omeuvoto.com.br' + router.asPath}
          />
        </Head>
        {/* <h2>Candidatos a prefeito</h2>
        <h2>Candidatos a vereador</h2> */}

        <div className={styles.container}>
          <div className={styles.form__and__filter}>
            <SearchForm />
            <SearchFilter />
          </div>

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
  const data = await serviceGetCandidates(params?.city as string)
  const revalidate = data.mayor.length === 0 ? 60 : false

  return { props: data, revalidate }
}

export default CandidatesPage
