import Select from 'react-select'
import { citiesByState } from 'data/cities/'

import BrazilSVG from 'components/BrazilSVG'

import styles from './animation.module.scss'

const AnimationPage = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.content}>
        <label>Escolha uma região do pais</label>

        <div>
          <button>Norte</button>
          <button>Nordeste</button>
          <button>Centro Oeste</button>
          <button>Sudeste</button>
          <button>Sul</button>
        </div>
      </div> */}

      {/* <div className={styles.form}>
        <label>Selecione um munípio</label>

        <Select
          placeholder="Selecionar"
          isSearchable
          options={citiesByState.sc}
        />
      </div> */}

      {/* <div className={styles.content}>
        <label>Escolha o cargo do pré-candidato</label>

        <div>
          <button>Prefeito</button>
          <button>Vice-prefeito</button>
          <button>Vereador</button>
        </div>
      </div> */}

      <div className={styles.states}>
        <BrazilSVG />
      </div>
    </div>
  )
}

export default AnimationPage
