import styles from './styles.module.scss'
import type { CandidateSimple } from 'types/candidate'

interface SearchFilterProps {
  candidates: CandidateSimple[]
  filter: string[]
  setFilter: (key: string) => void
}

export const SearchFilter = ({
  filter,
  setFilter,
  candidates
}: SearchFilterProps) => {
  const partidos = candidates.reduce((acc, item) => {
    const key = item.partidoSigla
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
