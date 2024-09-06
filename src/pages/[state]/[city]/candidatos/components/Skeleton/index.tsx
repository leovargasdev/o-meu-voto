import { Aside } from '../Aside'
import { BookmarkSimple } from '@phosphor-icons/react'

import styles from './styles.module.scss'

export const CandidatesSkeleton = () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <section>
        <h2>
          <BookmarkSimple weight="fill" />
          Cargo de Prefeito
        </h2>
        <div className={styles.candidates}>
          <span className="skeleton silver" />
          <span className="skeleton silver" />
        </div>
      </section>

      <section>
        <h2>
          <BookmarkSimple weight="fill" />
          Cargo de Vereador
        </h2>
        <div className={styles.candidates}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
            <span className="skeleton silver" key={item} />
          ))}
        </div>
      </section>
    </div>

    <Aside isDisabledAction />
  </div>
)
