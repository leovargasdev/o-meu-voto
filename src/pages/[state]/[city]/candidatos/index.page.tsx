import { useParams } from 'next/navigation'
import { GetStaticPaths, GetStaticProps } from 'next'

import { cities } from 'data/cities'
import { CandidatesProvider } from 'hooks'
import { maskOnlyNumber } from 'utils/mask'
import { serviceGetCandidates } from 'services'
import type { CandidateSimple } from 'types/candidate'

import { Layout, SEO } from 'components'
import { Aside } from './components/Aside'
import { Candidates } from './components/Candidates'
import { FilterMobile } from './components/FilterMobile'
import { CandidatesSkeleton } from './components/Skeleton'

import styles from './styles.module.scss'

// import paths from 'data/static-paths-candidate.json'

interface PageProps {
  mayor: CandidateSimple[]
  deputyMayor: CandidateSimple[]
  councilor: CandidateSimple[]
}

const CandidatesPage = ({
  mayor = [],
  deputyMayor = [],
  councilor = []
}: PageProps) => {
  const params = useParams()

  const cityId = params?.city ? maskOnlyNumber(params.city as string) : ''
  const city = cities.find(c => c.value === cityId)?.label

  const title = `Eleições 2024 em ${city} - Confira a lista de candidatos`
  const description = `Veja a lista completa com nomes, partidos e números de urna dos candidatos a prefeito e vereador em ${city} nas eleições municipais de 2024.`

  const isLoading = mayor.length === 0 && councilor.length === 0

  // eslint-disable-next-line prettier/prettier
  const elemTitle = (<>Eleições 2024 em <span>{city}</span></>)

  return (
    <CandidatesProvider candidates={{ mayor, deputyMayor, councilor }}>
      <Layout title={elemTitle}>
        <SEO title={title} description={description} />

        {isLoading ? (
          <CandidatesSkeleton />
        ) : (
          <div className={styles.container}>
            <Candidates />
            <Aside />
            <FilterMobile />
          </div>
        )}
      </Layout>
    </CandidatesProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: true, paths: [] }
}

const handleRedirect = (permanent = true) => {
  const destination = '/nao-encontrado/cidade'
  return { props: {}, redirect: { destination, permanent } }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let cityId = (params?.city as string) ?? ''
  cityId = maskOnlyNumber(cityId)

  const isInvalidCity = !cities.find(city => city.value === cityId)

  if (isInvalidCity) return handleRedirect()

  const data = await serviceGetCandidates(cityId)

  if (!data) return handleRedirect(false)

  const revalidate = data.mayor.length === 0 ? 60 : false

  return { props: data, revalidate }
}

export default CandidatesPage
