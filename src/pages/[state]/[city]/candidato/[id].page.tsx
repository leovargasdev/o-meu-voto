import classNames from 'classnames'
import type { Candidate } from 'types/candidate'
import { serviceGetCandidate } from 'services'
import { Mailbox } from '@phosphor-icons/react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { Layout } from 'components'
import { Profile } from './components/Profile'
import { Tags } from './components/Tags'
import { News } from './components/News'
import { Properties } from './components/Properties'

import styles from './styles.module.scss'

const CandidatePage = (candidate: Candidate) => {
  if (!candidate) {
    return <></>
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Profile {...candidate} />

        <div className={classNames('card', styles.content)}>
          <Tags {...candidate} />

          {candidate.emails && (
            <div>
              <h2>
                <Mailbox />
                Emails para contato
              </h2>

              <p>{candidate.emails.join(', ')}</p>
            </div>
          )}

          <News {...candidate} />

          <Properties {...candidate} />
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
