import { Newspaper } from '@phosphor-icons/react'
import type { Candidate } from 'types/candidate'

import styles from './styles.module.scss'

export const News = (candidate: Candidate) => {
  const queryName = candidate.nomeCompleto.replace(/ /g, '+')

  return (
    <div>
      <h2>
        <Newspaper />
        Pesquise notícias
      </h2>

      <ul className={styles.news}>
        <li>
          <a
            href={`https://g1.globo.com/busca/?q=${queryName}`}
            target="_blank"
            rel="noreferrer"
          >
            G1 - Globo
          </a>
        </li>
        <li>
          <a
            href={`https://congressoemfoco.uol.com.br/?s=${queryName}`}
            target="_blank"
            rel="noreferrer"
          >
            UOL
          </a>
        </li>
        <li>
          <a
            href={`https://search.folha.uol.com.br/search?q=${queryName}`}
            target="_blank"
            rel="noreferrer"
          >
            Folha de São Paulo
          </a>
        </li>
        <li>
          <a
            href={`https://www.cnnbrasil.com.br/?s=${queryName}`}
            target="_blank"
            rel="noreferrer"
          >
            CNN Brasil
          </a>
        </li>
      </ul>
    </div>
  )
}
