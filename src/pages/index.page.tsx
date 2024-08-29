import Link from 'next/link'
import { NextPage } from 'next'

import styles from '../styles/home.module.scss'

const LoginPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <img src="/logo.png" />
      <h1>Veja a lista dos pré-candidatos do seu munípicio</h1>

      <Link href="/busca">Iniciar busca</Link>
    </div>
  )
}

export default LoginPage
