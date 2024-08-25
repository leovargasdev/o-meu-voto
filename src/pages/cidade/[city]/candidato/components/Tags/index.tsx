import * as emoji from 'node-emoji'
import { differenceInYears } from 'date-fns'
import type { Candidate } from 'types/candidate'

import styles from './styles.module.scss'

export const Tags = (candidate: Candidate) => (
  <div className={styles.tags}>
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://cnpj.biz/${candidate.cnpjcampanha}`}
    >
      <span>{emoji.find('📝')?.emoji}</span>
      {candidate.cnpjcampanha.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/g,
        '$1.$2.$3/$4-$5'
      )}
    </a>

    <span>
      <span>{emoji.find('📍')?.emoji}</span>
      {candidate.nomeMunicipioNascimento} - {candidate.sgUfNascimento}
    </span>

    <span>
      <span>{emoji.find('🎁')?.emoji}</span>
      {differenceInYears(new Date(), new Date(candidate.dataDeNascimento))} anos
    </span>

    <span>
      <span>{emoji.find('📚')?.emoji}</span>
      {candidate.grauInstrucao}
    </span>

    <span>
      <span>{emoji.find('💼')?.emoji}</span>
      {candidate.ocupacao}
    </span>
  </div>
)
