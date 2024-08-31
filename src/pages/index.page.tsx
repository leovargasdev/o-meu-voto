import Link from 'next/link'
import Head from 'next/head'
import { NextPage } from 'next'

import styles from '../styles/home.module.scss'

const LoginPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Meu voto 2024 | Veja a lista dos pré-candidatos</title>
      </Head>

      <img src="/logo.png" />
      <h1>Veja a lista dos pré-candidatos do seu munípicio</h1>

      <Link href="/busca">Iniciar pesquisa</Link>
    </div>
  )
}

export default LoginPage
