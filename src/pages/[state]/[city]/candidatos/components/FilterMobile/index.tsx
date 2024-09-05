import { Aside } from '../Aside'
import { useEffect, useState } from 'react'
import { motion, Variants } from 'framer-motion'

import styles from './styles.module.scss'
import { useCandidates } from 'hooks'

export const container: Variants = {
  open: {
    clipPath: 'circle(2000px at 92vw 0px)',
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  },
  closed: {
    clipPath: 'circle(0px at 92vw 0px)',
    transition: {
      delay: 0.3,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
}

export const FilterMobile = () => {
  const { candidates } = useCandidates()
  const [enabled, setEnabled] = useState(false)

  const toggleFilterMobile = () => {
    setEnabled(state => {
      document.body.style.overflow = state ? 'auto' : 'hidden'
      !state && window.scrollTo({ top: 0, behavior: 'smooth' })
      return !state
    })
  }

  useEffect(() => {
    if (enabled) toggleFilterMobile()
  }, [candidates])

  return (
    <div className={styles.filter}>
      <button
        type="button"
        data-state={enabled && 'open'}
        onClick={toggleFilterMobile}
      >
        Filtros
        <div className={styles.hamburger} data-state={enabled && 'open'}>
          <span />
          <span />
          <span />
          <span />
        </div>
      </button>

      <motion.div
        initial={false}
        variants={container}
        className={styles.container}
        animate={enabled ? 'open' : 'closed'}
      >
        <div className={styles.content}>
          <div className={styles.content2}>
            <Aside />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
