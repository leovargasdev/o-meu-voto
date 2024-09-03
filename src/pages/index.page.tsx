import Link from 'next/link'
import { NextPage } from 'next'
import { Footer, SEO } from 'components'

import styles from '../styles/home.module.scss'

const LoginPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <SEO
        title="Meu voto 2024"
        description="Busque os candidatos do seu munípicio para as eleições de 2024"
      />

      <main className={styles.content}>
        <img src="/logo.png" />
        <h1>Veja a lista dos candidatos do seu munípicio</h1>

        <Link href="/busca">Iniciar busca</Link>
      </main>

      <Footer />
    </div>
  )
}

export default LoginPage
