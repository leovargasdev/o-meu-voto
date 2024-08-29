import Link from 'next/link'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      {router.pathname !== '/' && (
        <header className={styles.header}>
          <nav>
            <Link href="/">
              <img src="/logo.png" />
            </Link>
          </nav>
        </header>
      )}
      <main>{children}</main>
      <footer>
        <p>
          Fonte dos dados
          <br />
          <a>TSE - Divulgação de Candidaturas e Contas Eleitorais</a>
        </p>

        <p>
          Desenvolvido por <a>Leo Vargas</a>
        </p>
      </footer>
    </div>
  )
}
