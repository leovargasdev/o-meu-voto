import type { Candidate } from 'types/candidate'

import styles from './styles.module.scss'

export const News = (candidate: Candidate) => {
  const role = candidate.cargo.nome
  const name = candidate.nomeUrna.toLocaleLowerCase().replace(/ /g, '%20')
  const city = candidate.localCandidatura.replace(/ /g, '%20')

  const querySearch = `${name}%20cargo%20de%20${role}%20${city}&hl=pt-BR&gl=BR&ceid=BR%3Apt-419`

  return (
    <a
      href={`https://news.google.com/search?q=${querySearch}`}
      target="_blank"
      rel="noreferrer"
      className={styles.googlenews}
    >
      <img src="/google-news.png" alt="Logomarca google news" />
      Google News - Veja notícias sobre o candidato
    </a>
  )
}
