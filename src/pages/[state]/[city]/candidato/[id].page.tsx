import classNames from 'classnames'
import { Mailbox } from '@phosphor-icons/react'
import type { Candidate } from 'types/candidate'
import { serviceGetCandidate } from 'services'
import { GetStaticPaths, GetStaticProps } from 'next'

import { Layout } from 'components'
import { Profile } from './components/Profile'
import { Tags } from './components/Tags'
import { News } from './components/News'
import { Properties } from './components/Properties'
import { PreviousElections } from './components/PreviousElections'
import { ShareCandidate } from './components/Share'
import { Breadcrumb } from './components/Breadcrumb'

import styles from './styles.module.scss'

const CandidatePage = (candidate: Candidate) => {
  if (!candidate) {
    return <></>
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

            <Properties {...candidate} />

            <PreviousElections {...candidate} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return serviceGetCandidate(params)
}

export default CandidatePage
