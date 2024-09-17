import classNames from 'classnames'
import { Mailbox } from '@phosphor-icons/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { WarningCircle } from '@phosphor-icons/react/dist/ssr'

import { cities } from 'data/cities'
import { maskOnlyNumber } from 'utils/mask'
import { serviceGetCandidate } from 'services'
import type { Candidate } from 'types/candidate'

import { Layout } from 'components'
import { Profile } from './components/Profile'
import { Tags } from './components/Tags'
import { News } from './components/News'
import { Properties } from './components/Properties'
import { PreviousElections } from './components/PreviousElections'
import { ShareCandidate } from './components/Share'
import { Breadcrumb } from './components/Breadcrumb'
import { CandidateSkeleton } from './components/Skeleton'
import { InfoPoliticalParty } from './components/InfoPoliticalParty'

import styles from './styles.module.scss'

const CandidatePage = (candidate: Candidate) => {
  if (!candidate?.nomeUrna) {
    return <CandidateSkeleton />
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.head}>
          <Breadcrumb {...candidate} />
          <ShareCandidate />
        </div>

        <div className={styles.content}>
          <Profile {...candidate} />

          <div className={styles.cards}>
            {candidate.reelicao.eleito && (
              <div className={styles.alert}>
                <div>
                  <WarningCircle size={36} color="#FF9800" weight="regular" />{' '}
                  <div>
                    <strong>Releição de cargo</strong>
                    <p>
                      O candidato <b>{candidate.nomeCompleto}</b> foi eleito em
                      2020 para o cargo de {candidate.cargo.nome}!
                    </p>
                  </div>
                </div>
                {candidate.reelicao.proposta && (
                  <a
                    href={candidate.reelicao.proposta}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Acessar plano de governo de 2020
                  </a>
                )}
              </div>
            )}

            <div className={classNames('card', styles.info)}>
              <Tags {...candidate} />
              <News {...candidate} />
              {candidate.emails && (
                <div>
                  <h2>
                    <Mailbox />
                    Emails para contato
                  </h2>

                  <p>{candidate.emails.join(', ')}</p>
                </div>
              )}
            </div>

            <InfoPoliticalParty {...candidate} />

            <Properties {...candidate} />

            <PreviousElections {...candidate} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: true, paths: [] }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let cityId = (params?.city as string) ?? ''
  cityId = maskOnlyNumber(cityId)

  const isInvalidCity = !cities.find(city => city.value === cityId)

  if (isInvalidCity) {
    const destination = '/nao-encontrado/cidade'
    return { props: {}, redirect: { destination, permanent: true } }
  }

  return serviceGetCandidate(params)
}

export default CandidatePage
