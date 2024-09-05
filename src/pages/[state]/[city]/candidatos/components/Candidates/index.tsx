import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import { useCandidates } from 'hooks'
import { maskToParamsURL } from 'utils/mask'
import type { CandidateSimple } from 'types/candidate'

import styles from './styles.module.scss'

const Candidate = (candidate: CandidateSimple) => {
  const { asPath } = useRouter()
  const baseUrl = asPath.split('/candidatos')[0]

  const code = candidate.numero.toString().split('')
  const name = maskToParamsURL(candidate.nomeUrna)

  const href = baseUrl + `/candidato/${candidate.id}-${name}`

  return (
    <Link
      href={href}
      prefetch={false}
      className={classNames('card', styles.candidate)}
    >
      <div className={styles.info}>
        <strong>{candidate.nomeUrna}</strong>
        <p>{candidate.nomeCompleto}</p>
      </div>

      <div className={styles.code}>
        {code.map(item => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </Link>
  )
}

export const Candidates = () => {
  const { candidates: data, filter, nameFilter } = useCandidates()

  const candidates = data.mayor.concat(data.councilor)

  if (candidates.length === 0) {
    return <></>
  }

  const candidatesFiltered = candidates.filter(c => {
    const partyMatch = filter.length === 0 || filter.includes(c.partidoSigla)
    const nameMatch = nameFilter
      ? c.nomeUrna.toLowerCase().includes(nameFilter.toLowerCase()) ||
        c.nomeCompleto.toLowerCase().includes(nameFilter.toLowerCase())
      : true

    return partyMatch && nameMatch
  })
  return (
    <div className={styles.candidates}>
      {candidatesFiltered.map(candidate => (
        <Candidate {...candidate} key={candidate.id} />
      ))}
    </div>
  )
}
