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
  LinkSimple
} from '@phosphor-icons/react'
import { capitalizeString } from 'utils/mask'
import styles from './styles.module.scss'

const icons: Record<TypeLink, React.ReactNode> = {
  default: <LinkSimple size={32} />,
  youtube: <YoutubeLogo size={32} />,
  x: <XLogo size={32} />,
  facebook: <FacebookLogo size={32} />,
  instagram: <InstagramLogo size={32} />,
  threads: <ThreadsLogo size={32} />,
  tiktok: <TiktokLogo size={32} />
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
    }

    return [...acc, { type, url }] as never
  }, [])
}

export const Profile = (candidate: Candidate) => {
  const proposta = candidate.arquivos.find(item => item.codTipo === '5')

  const links = handleLinksCandidate(candidate.sites)
  const code = candidate.numero.toString().split('')

  const seoTitle = `Candidato(a) ${candidate.nomeUrna} - Eleições 2024`
  const seoCargo = candidate.cargo.nome.toLocaleLowerCase()
  const seoMunicipio = capitalizeString(candidate.localCandidatura)
  const seoSigla = candidate.partido.sigla
  const seoDescription = `Confira os dados do candidato(a) que está concorrendo ao cargo de ${seoCargo} no município de ${seoMunicipio} pelo partido ${seoSigla}`

  return (
    <div className={classNames('card', styles.profile)}>
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
          {links.map(link => (
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
  )
}
