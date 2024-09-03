import Link from 'next/link'
import type { Candidate } from 'types'
import { useRouter } from 'next/router'
import { CaretRight, City, IdentificationCard } from '@phosphor-icons/react'

import styles from './styles.module.scss'

export const Breadcrumb = (candidate: Candidate) => {
  const router = useRouter()
  const hostCity = router.asPath.split('/candidato/')[0]

  return (
    <div className={styles.breadcrumb}>
      <Link href="/">Eleições 2024</Link>

      <CaretRight size={12} />

      <Link href={hostCity + '/candidatos'}>
        <City size={17} />
        <p>
          <span>{candidate.localCandidatura}</span>
        </p>
      </Link>

      <CaretRight size={12} />

      <span>
        <IdentificationCard size={17} />
        <p>
          Candidato(a) <span>{candidate.nomeUrna.toLocaleLowerCase()}</span>
        </p>
      </span>
    </div>
  )
}
