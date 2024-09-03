import styles from './styles.module.scss'

export const Footer = () => (
  <footer className={styles.container}>
    <p>
      Fonte dos dados
      <br />
      <a
        href="https://divulgacandcontas.tse.jus.br/divulga/#/home"
        target="_blank"
        rel="noreferrer"
      >
        TSE - Divulgação de Candidaturas e Contas Eleitorais
      </a>
    </p>

    <p>
      Desenvolvido por{' '}
      <a
        href="https://www.leonardovargas.dev/"
        target="_blank"
        rel="noreferrer"
      >
        Leonardo Vargas
      </a>
    </p>
  </footer>
)
