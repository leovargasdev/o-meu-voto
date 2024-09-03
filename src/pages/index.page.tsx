import Link from 'next/link'
import Head from 'next/head'
import { NextPage } from 'next'
import { Footer } from 'components'

import styles from '../styles/home.module.scss'

const LoginPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Meu voto 2024 | Veja a lista dos pré-candidatos</title>

        <meta
          property="twitter:title"
          content="Meu voto 2024 | Veja a lista dos pré-candidatos"
        />
        {/* <meta property="twitter:description" content="" /> */}

        <meta
          property="og:title"
          content="Meu voto 2024 | Veja a lista dos pré-candidatos"
        />
        {/* <meta property="og:description" content="" /> */}
        <meta property="og:url" content="https://www.omeuvoto.com.br" />
      </Head>

      <main className={styles.content}>
        <img src="/logo.png" />
        <h1>Veja a lista dos pré-candidatos do seu munípicio</h1>

        <Link href="/busca">Iniciar busca</Link>
      </main>

      <Footer />
    </div>
  )
}

export default LoginPage
