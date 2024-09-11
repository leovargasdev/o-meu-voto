import { SEO } from 'components'
import classNames from 'classnames'
import type { SocialLink, TypeLink, Candidate } from 'types'
import {
  FacebookLogo,
  FileText,
  InstagramLogo,
  XLogo,
  YoutubeLogo,
  ThreadsLogo,
  TiktokLogo,
  LinkSimple,
  TelegramLogo,
  LinkedinLogo
} from '@phosphor-icons/react'
import { capitalizeString, maskToParamsURL } from 'utils/mask'

import styles from './styles.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

const icons: Record<TypeLink, React.ReactNode> = {
  default: <LinkSimple size={32} />,
  youtube: <YoutubeLogo size={32} />,
  x: <XLogo size={32} />,
  facebook: <FacebookLogo size={32} />,
  instagram: <InstagramLogo size={32} />,
  threads: <ThreadsLogo size={32} />,
  tiktok: <TiktokLogo size={32} />,
  linkedin: <LinkedinLogo size={32} />,
  telegram: <TelegramLogo size={32} />
}

const handleLinksCandidate = (sites: string[]): SocialLink[] => {
  return sites.reduce((acc, url) => {
    let type = 'default'

    if (url.includes('youtube.com')) {
      type = 'youtube'
    } else if (url.includes('x.com')) {
      type = 'x'
    } else if (url.includes('facebook.com')) {
      type = 'facebook'
    } else if (url.includes('instagram.com')) {
      type = 'instagram'
    } else if (url.includes('threads.net')) {
      type = 'threads'
    } else if (url.includes('tiktok.com')) {
      type = 'tiktok'
    } else if (url.includes('https://t.me')) {
      type = 'telegram'
    } else if (url.includes('linkedin.com')) {
      type = 'linkedin'
    }

    return [...acc, { type, url }] as never
  }, [])
}

export const OtherCandidate = ({ otherCandidate: candidate }: Candidate) => {
  const { asPath } = useRouter()

  if (!candidate) {
    return <></>
  }

  const baseUrl = asPath.split('/candidato')[0]
  const pathName = maskToParamsURL(candidate.nomeUrna)
  const candidateUrl = `${baseUrl}/candidato/${candidate.id}-${pathName}`

  return (
    <Link
      href={candidateUrl}
      className={classNames('card', styles.otherCandidate)}
    >
      <picture>
        <img
          loading="lazy"
          src={candidate.urlFoto}
          alt={`Foto do candidato ${candidate.nomeCompleto}`}
        />
      </picture>

      <div>
        <strong>{candidate.nomeUrna}</strong>
        <p>{candidate.nomeCompleto}</p>
      </div>
    </Link>
  )
}

export const Profile = (candidate: Candidate) => {
  const proposta = candidate.arquivos.find(item => item.codTipo === '5')

  const links = handleLinksCandidate(candidate.sites)
  const code = candidate.numero.toString().split('')

  const candidateName = capitalizeString(candidate.nomeUrna.toLocaleLowerCase())
  const seoTitle = `Candidato(a) ${candidateName} - Eleições 2024`

  const role = candidate.cargo.nome.toLocaleLowerCase()
  const city = capitalizeString(candidate.localCandidatura)
  const acronym = candidate.partido.sigla
  const seoDescription = `Confira os dados do candidato(a) que está concorrendo ao cargo de ${role} no município de ${city} pelo partido ${acronym}`

  return (
    <div className={styles.container}>
      <div className={classNames('card', styles.candidate)}>
        <SEO title={seoTitle} description={seoDescription} />

        <picture className={styles.flag}>
          <img
            loading="lazy"
            src={`/flags/flag-${candidate.ufSuperiorCandidatura}.jpg`}
            alt={`Bandeira do estado de ${candidate.ufSuperiorCandidatura}`}
          />
        </picture>

        <div className={styles.profile__content}>
          <picture className={styles.profile__image}>
            <img
              src={candidate.fotoUrl}
              alt={`Foto da campanha eleitoral do candidato ${candidate.nomeUrna}`}
            />
          </picture>

          <div className={styles.code}>
            {code.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>

          <h1>{candidate.nomeUrna}</h1>

          <p className={styles.description}>
            O candidato(a) está concorrendo ao{' '}
            <i>cargo de {candidate.cargo.nome}</i> no município de{' '}
            <i>{candidate.localCandidatura}</i> pelo partido{' '}
            <i>{candidate.partido.sigla}</i>.
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
            {links.slice(0, 7).map(link => (
              <a
                href={link.url}
                key={link.url}
                target="_blank"
                rel="noreferrer"
                title={`Link para o perfil da rede social ${link.type}`}
              >
                {icons[link.type]}
              </a>
            ))}
          </aside>
        </div>
      </div>

      <OtherCandidate {...candidate} />
    </div>
  )
}
