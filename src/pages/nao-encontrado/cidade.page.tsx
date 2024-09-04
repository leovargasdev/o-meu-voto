import Link from 'next/link'
import Head from 'next/head'
import { EmptyStateLocation, Layout } from 'components'

import styles from './styles.module.scss'

const EmptyPage = () => {
  return (
    <Layout>
      <Head>
        <title>Falha ao carregar dados do município</title>
      </Head>

      <div className={styles.container}>
        <EmptyStateLocation />

        <div>
          <h1>Ops... falha ao carregar dados!</h1>
          <h2>Não foi possível localizar os dados do município!</h2>
        </div>

        <Link href="/">página inicial</Link>
      </div>
    </Layout>
  )
}

export default EmptyPage
