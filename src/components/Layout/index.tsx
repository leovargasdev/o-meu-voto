import Link from 'next/link'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { Footer } from 'components'

interface LayoutProps {
  title?: string | React.ReactNode
  children: React.ReactNode
}

export const Layout = ({ children, title = '' }: LayoutProps) => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      {router.pathname !== '/' && (
        <header className={styles.header}>
          <div>
            <Link href="/">
              <img src="/logo.png" alt="Logomarca meu voto 2024" />
            </Link>

            {title && <h1>{title}</h1>}
          </div>
        </header>
      )}

      <main>{children}</main>

      <Footer />
    </div>
  )
}
