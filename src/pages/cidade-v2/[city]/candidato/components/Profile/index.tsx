import classNames from 'classnames'
import type { Candidate } from 'types/candidate'
import {
  FacebookLogo,
  FileText,
  InstagramLogo,
  XLogo,
  YoutubeLogo
} from '@phosphor-icons/react'

import styles from './styles.module.scss'

export const Profile = (candidate: Candidate) => {
  const proposta = candidate.arquivos.find(item => item.codTipo === '5')

  const links = {
    youtube: candidate.sites.find((link: string) =>
      link.includes('youtube.com')
    ),
    twitter: candidate.sites.find((link: string) => link.includes('x.com')),
    facebook: candidate.sites.find((link: string) =>
      link.includes('facebook.com')
    ),
    instagram: candidate.sites.find((link: string) =>
      link.includes('instagram.com')
    )
  }

  return (
    <div className={classNames('card', styles.profile)}>
      <picture className={styles.cover}>
        <img
          src="https://www.eccobandeiras.com.br/image/cache/catalog/antigas/Santa-Catarina-1111x740.jpg"
          alt=""
        />
      </picture>

      <div className={styles.profile__content}>
        <img src={candidate.fotoUrl} alt="" />

        <div>
          {candidate.numero
            .toString()
            .split('')
            .map(item => (
              <span key={item}>{item}</span>
            ))}
        </div>

        <h1>{candidate.nomeCompleto.toLocaleLowerCase()}</h1>

        <p>
          O candidato(a) está concorrendo ao{' '}
          <i>cargo de {candidate.cargo.nome.toLocaleLowerCase()}</i> no
          municipio de <i>{candidate.localCandidatura.toLocaleLowerCase()}</i>.
        </p>

        {proposta && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://divulgacandcontas.tse.jus.br/${proposta.url}/${proposta.nome}`}
          >
            <FileText size={24} />
            Proposta de governo
          </a>
        )}

        <aside>
          {links.instagram && (
            <a href={links.instagram} target="_blank" rel="noreferrer">
              <InstagramLogo size={32} />
            </a>
          )}
          {links.twitter && (
            <a href={links.twitter} target="_blank" rel="noreferrer">
              <XLogo size={32} />
            </a>
          )}
          {links.facebook && (
            <a href={links.facebook} target="_blank" rel="noreferrer">
              <FacebookLogo size={32} />
            </a>
          )}
          {links.youtube && (
            <a href={links.youtube} target="_blank" rel="noreferrer">
              <YoutubeLogo size={32} />
            </a>
          )}
        </aside>
      </div>
    </div>
  )
}
