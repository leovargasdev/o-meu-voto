import { maskSigla } from 'utils/mask'
import listParties from 'data/partidos'
import { Users } from '@phosphor-icons/react'
import type { Candidate } from 'types/candidate'

import styles from './styles.module.scss'

type KeyParty = keyof typeof listParties

const getGroupParties = (value: string, currentParty: string) => {
  const parties = value.split(' / ')

  return parties.reduce((acc, party) => {
    const key = maskSigla(party).toLocaleLowerCase()

    if (key !== currentParty) {
      const data = listParties[key as KeyParty]
      data?.name && acc.push(data)
    }

    return acc
  }, [] as any[])
}

export const InfoPoliticalParty = (candidate: Candidate) => {
  const sigla = candidate.partidoSigla.toLocaleLowerCase() as KeyParty
  const groupParties = getGroupParties(candidate.composicaoColigacao, sigla)

  const linkParty = listParties[sigla]?.link

  return (
    <div className="card">
      <h2>
        <Users />
        Partido político
      </h2>

      <div className={styles.content}>
        <div>
          <strong>Nome</strong>
          <a href={linkParty} target="_blank" rel="noreferrer">
            {candidate.partido.sigla} - {candidate.partido.nome}
          </a>
        </div>
        <div>
          <strong>Coligação</strong>
          <p>{candidate.nomeColigacao.toLocaleLowerCase()}</p>
        </div>
        {!!groupParties.length && (
          <div>
            <strong>Composição da coligação</strong>
            <div className={styles.images}>
              {groupParties.map(party => (
                <img
                  src={party.image}
                  key={party.image}
                  loading="lazy"
                  alt={`Logo do partido ${party.name}`}
                  title={party.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
