import { useCandidates } from 'hooks'
import partidos from 'data/partidos'

import styles from './styles.module.scss'

type Sigla = keyof typeof partidos

export const SearchFilter = () => {
  const { candidates, filter, handleChangeFilter } = useCandidates()

  const data = candidates.mayor.concat(candidates.councilor)

  const siglas = data.reduce((acc, item) => {
    const key = item.partidoSigla
    acc[key] = acc[key] ? acc[key] + 1 : 1

    return acc
  }, {} as Record<string, number>)

  return (
    <div className={styles.filter}>
      {Object.keys(siglas).map(sigla => (
        <button
          type="button"
          key={sigla}
          onClick={() => handleChangeFilter(sigla)}
          aria-pressed={filter.includes(sigla) || filter.length === 0}
        >
          <img
            loading="lazy"
            width={32}
            height="auto"
            src={`/icons/${sigla}.png`}
            alt={`Logo do partido ${sigla}`}
            title={`Logo do partido ${sigla}`}
          />
          <p>{partidos[sigla.toLocaleLowerCase() as Sigla]?.name}</p>
          <span>({siglas[sigla]})</span>
        </button>
      ))}
    </div>
  )
}
