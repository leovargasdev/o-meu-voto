import type { CandidateSimple } from 'types/candidate'

import styles from './styles.module.scss'

interface SearchFilterProps {
  candidates: CandidateSimple[]
  filter: string[]
  setFilter: (key: string) => void
}

const formatSigla = (value: string) => {
  return value
    .normalize('NFD')
    .replace(/\s/g, '')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
}

export const SearchFilter = ({
  filter,
  setFilter,
  candidates
}: SearchFilterProps) => {
  const partidos = candidates.reduce((acc, item) => {
    const key = formatSigla(item.partido.sigla)
    acc[key] = acc[key] ? acc[key] + 1 : 1

    return acc
  }, {} as Record<string, number>)

  return (
    <div className={styles.filter}>
      {Object.keys(partidos).map(partido => (
        <button
          type="button"
          key={partido}
          aria-pressed={filter.includes(partido) || filter.length === 0}
          onClick={() => setFilter(partido)}
        >
          <img
            loading="lazy"
            width={32}
            height="auto"
            src={`/icons/${partido}.png`}
          />
          <span>({partidos[partido]})</span>
        </button>
      ))}
    </div>
  )
}
