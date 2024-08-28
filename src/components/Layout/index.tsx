import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      {/* <header>header</header> */}
      <main>{children}</main>
      {/* <footer>rodape</footer> */}
    </div>
  )
}
