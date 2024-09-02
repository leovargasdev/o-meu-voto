import { Archive } from '@phosphor-icons/react'
import type { Candidate } from 'types/candidate'

import styles from './styles.module.scss'

export const PreviousElections = ({ eleicoesAnteriores }: Candidate) => {
  const data = eleicoesAnteriores.filter(
    e => e.situacaoTotalizacao !== 'Concorrendo'
  )

  return (
    <div className="card">
      <h2>
        <Archive />
        Eleições anteriores
      </h2>

      {data.length === 0 ? (
        <p className={styles.empty}>Não há dados registrados!</p>
      ) : (
        <div className={styles.list}>
          {data.map(item => (
            <div key={item.id} className={styles.item}>
              {/* <img src="/icons/PT.png" alt="" /> */}
              <div>
                <strong>
                  {item.cargo} em <span>{item.local.toLocaleLowerCase()}</span>
                </strong>

                <p>Em {item.nrAno}</p>
              </div>
              {/* https://omeuvoto.com.br/sc/80896-criciuma/candidato/240002290096-fabinho */}
              {item.situacaoTotalizacao === 'Eleito por QP' && (
                <span className={styles.partial}>Eleito por legenda</span>
              )}
              {item.situacaoTotalizacao === 'Não eleito' && (
                <span className={styles.fail}>Não eleito</span>
              )}
              {item.situacaoTotalizacao === 'Eleito' && (
                <span className={styles.success}>Eleito</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
