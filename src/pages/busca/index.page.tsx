import { useState } from 'react'
import Select from 'react-select'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import type { Option } from 'types'
import { MapBrazil, SEO } from 'components'
import { maskToParamsURL } from 'utils/mask'
import { citiesByState } from 'data/cities/'

import styles from './styles.module.scss'

interface QuestionProps {
  label: string
  enabled: boolean
  children: React.ReactNode
}

const Question = ({ label, enabled, children }: QuestionProps) => (
  <div className={classNames(styles.carrousel__item, enabled && styles.enable)}>
    <div className={styles.question}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  </div>
)

const SearchPage = () => {
  const router = useRouter()
  const [question, setQuestion] = useState<number>(0)
  const [state, setState] = useState<string>('')

  const handleQuestionUF = (value: string) => {
    setState(value)
    setQuestion(1)
  }

  const handleQuestionCity = (option: Option | null) => {
    if (option) {
      setQuestion(2)

      const cityPath = option.value + '-' + maskToParamsURL(option.label)
      router.push(`/${state}/${cityPath}/candidatos`)
    }
  }

  const cities = state ? citiesByState[state] : []

  return (
    <div className={styles.container}>
      <SEO
        title="Busque os candidatos a Prefeito e Vereador - Eleições 2024"
        description="Escolha um estado e uma cidade para localizar os candidatos do seu município."
      />

      <img src="/logo.png" alt="Logomarca do site meuvoto2024" />

      <div
        className={styles.content}
        style={{ transform: `translateX(${-100 * question}vw)` }}
      >
        <Question label="Escolha um estado do Brasil" enabled={question === 0}>
          <div className={styles.map}>
            <MapBrazil selectState={handleQuestionUF} />
          </div>
        </Question>

        <Question label="Selecione um município" enabled={question === 1}>
          <div className={styles.cities}>
            <Select
              placeholder="Selecionar"
              isSearchable
              options={cities}
              onChange={handleQuestionCity}
            />
          </div>
        </Question>
      </div>
    </div>
  )
}

export default SearchPage
