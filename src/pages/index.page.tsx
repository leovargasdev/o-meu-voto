import Link from 'next/link'
import { NextPage } from 'next'
import { EmptyStateService, Footer, SEO } from 'components'

import styles from '../styles/home.module.scss'

const SERVICE_OUT = true

const LoginPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <SEO
        title="Meu voto 2024"
        description="Busque os candidatos do seu município para as eleições de 2024"
      />

      <main className={styles.content}>
        <img src="/logo.png" />
        <h1>Veja a lista dos candidatos do seu município</h1>

        <div className={styles.alert}>
          <EmptyStateService />

          <div>
            <h2>
              O dados do{' '}
              <a
                href="https://divulgacandcontas.tse.jus.br/"
                target="_blank"
                rel="noreferrer"
              >
                TSE
              </a>{' '}
              não estão disponíveis no momento!
            </h2>
            <p>Desculpe o transtorno, tente novamente mais tarde!</p>
          </div>
        </div>

        <Link href="/busca" aria-disabled={SERVICE_OUT}>
          Iniciar busca
        </Link>
      </main>

      <Footer />
    </div>
  )
}

export default LoginPage
