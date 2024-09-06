import Head from 'next/head'
import classNames from 'classnames'
import { Layout } from 'components'
import { useParams } from 'next/navigation'
import { Archive, Receipt } from '@phosphor-icons/react'

import styles from './styles.module.scss'

export const CandidateSkeleton = () => {
  const params = useParams()

  return (
    <Layout>
      <Head>
        <title>Carregando candidato...</title>
      </Head>

      <div className={styles.container}>
        <div className={classNames('card', styles.profile)}>
          <picture className={styles.flag}>
            <img
              loading="lazy"
              src={`/flags/flag-${params?.state}.jpg`}
              alt={`Bandeira do estado de ${params?.state}`}
            />
          </picture>

          <div>
            <span className={classNames('skeleton', styles.profile__image)} />

            <div className={styles.code}>
              <span>0</span>
              <span>0</span>
              <span>0</span>
              <span>0</span>
              <span>0</span>
            </div>

            <div className={classNames('skeleton', styles.title)} />

            <div className={styles.description}>
              <span className="skeleton" />
              <span className="skeleton" />
              <span className="skeleton" />
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          <div className="card">
            <div className={styles.tags}>
              <span style={{ width: 215 }} className="skeleton" />
              <span style={{ width: 249 }} className="skeleton" />
              <span style={{ width: 122 }} className="skeleton" />
              <span style={{ width: 208 }} className="skeleton" />
              <span style={{ width: 150 }} className="skeleton" />
              <span style={{ width: 300 }} className="skeleton" />
            </div>
          </div>

          <div className="card">
            <h2>
              <Receipt />
              Patrimônio declarado
            </h2>

            <span className={classNames('skeleton', styles.property)} />

            <span className={classNames('skeleton', styles.property)} />
          </div>

          <div className="card">
            <h2>
              <Archive />
              Eleições anteriores
            </h2>

            <span className={classNames('skeleton', styles.election)} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
