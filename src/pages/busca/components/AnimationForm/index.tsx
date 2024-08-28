import { useState } from 'react'
import Select from 'react-select'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { citiesByState } from 'data/cities/'

import { MapBrazil } from 'components'

import styles from './styles.module.scss'

export const AnimationForm = () => {
  const router = useRouter()
  const [question, setQuestion] = useState(0)
  const [search, setSearch] = useState({
    state: '',
    city: '',
    role: ''
  })

  const handleQuestionUF = (state: string) => {
    setSearch(currentState => ({ ...currentState, state }))
    setQuestion(1)
  }

  const handleQuestionCity = (city: string) => {
    setSearch(currentState => ({ ...currentState, city }))
    setQuestion(2)
  }

  const handleQuestionRole = (role: string) => {
    const query = { ...search, role }
    router.replace({ query })
    setQuestion(3)
  }

  return (
    <div
      className={styles.carrousel}
      style={{ transform: `translateX(${-100 * question}vw)` }}
    >
      <span
        className={classNames(
          styles.carrousel__item,
          question === 0 && styles.enable
        )}
      >
        <div className={styles.question}>
          <label>Escolha um estado do Brasil</label>
          <div className={styles.map}>
            <MapBrazil selectState={handleQuestionUF} />
          </div>
        </div>
      </span>

      <span
        className={classNames(
          styles.carrousel__item,
          question === 1 && styles.enable
        )}
      >
        <div className={styles.question}>
          <label>Selecione um munípio</label>

          <div className={styles.cities}>
            <Select
              placeholder="Selecionar"
              isSearchable
              options={citiesByState[search.state]}
              onChange={option => handleQuestionCity(option?.value as string)}
            />
          </div>
        </div>
      </span>

      <span
        className={classNames(
          styles.carrousel__item,
          question === 2 && styles.enable
        )}
      >
        <div className={styles.question}>
          <label>Escolha o cargo do pré-candidato</label>

          <div className={styles.roles}>
            <button type="button" onClick={() => handleQuestionRole('11')}>
              Prefeito
            </button>
            <button type="button" onClick={() => handleQuestionRole('12')}>
              Vice-prefeito
            </button>
            <button type="button" onClick={() => handleQuestionRole('13')}>
              Vereador
            </button>
          </div>
        </div>
      </span>
    </div>
  )
}
