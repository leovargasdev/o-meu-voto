import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import { maskToParamsURL } from 'utils/mask'
import type { CandidateSimple } from 'types/candidate'

import styles from './styles.module.scss'

const formatSigla = (value: string) => {
  return value
    .normalize('NFD')
    .replace(/\s/g, '')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
}

interface CandidatesProps {
  filter: string[]
  candidates: CandidateSimple[]
}

const Candidate = (candidate: CandidateSimple) => {
  const { asPath } = useRouter()
  const baseUrl = asPath.split('/candidatos')[0]

  const code = candidate.numero.toString().split('')
  const name = maskToParamsURL(candidate.nomeUrna)

  const href = baseUrl + `/candidato/${candidate.id}-${name}`

  return (
    <Link href={href} className={classNames('card', styles.candidate)}>
      <div className={styles.info}>
        <strong>{candidate.nomeUrna}</strong>
        <p>{candidate.nomeCompleto.toLocaleLowerCase()}</p>
      </div>

      <div className={styles.code}>
        {code.map(item => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </Link>
  )
}

export const Candidates = ({ filter, candidates }: CandidatesProps) => {
  if (candidates.length === 0) {
    return <></>
  }

  const candidatesFiltred =
    filter.length === 0
      ? candidates
      : candidates.filter(c => filter.includes(formatSigla(c.partido.sigla)))

  return (
    <div className={styles.candidates}>
      {candidatesFiltred.map(candidate => (
        <Candidate {...candidate} key={candidate.id} />
      ))}
    </div>
  )
}
