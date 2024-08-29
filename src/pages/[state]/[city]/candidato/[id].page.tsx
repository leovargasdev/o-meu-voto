import api from 'lib/api'
import Head from 'next/head'
import classNames from 'classnames'
import { Candidate } from 'types/candidate'
import { Mailbox } from '@phosphor-icons/react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { Profile } from './components/Profile'
import { Tags } from './components/Tags'
import { News } from './components/News'
import { Properties } from './components/Properties'

import { maskNumber } from 'utils/mask'

import styles from './styles.module.scss'

const CandidatePage = (candidate: Candidate) => {
  if (!candidate) {
    return <></>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{candidate.nomeCompleto}</title>
      </Head>

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
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = maskNumber(params?.id as string)
  const city = maskNumber(params?.city as string)

  try {
    const response = await api.get(
      `/buscar/2024/${city}/2045202024/candidato/${id}`
    )
    return { props: response.data }
  } catch (e) {
    console.log(e)
  }

  return { props: {} }
}

export default CandidatePage
