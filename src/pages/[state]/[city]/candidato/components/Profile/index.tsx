import Head from 'next/head'
import classNames from 'classnames'
import { useRouter } from 'next/router'
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
  const { asPath } = useRouter()
  const proposta = candidate.arquivos.find(item => item.codTipo === '5')

  const links = handleLinksCandidate(candidate.sites)
  const code = candidate.numero.toString().split('')

  return (
    <div className={classNames('card', styles.profile)}>
      <Head>
        <title>Candidato(a) {candidate.nomeUrna} - Eleições 2024</title>

        <meta
          name="description"
          content={`O candidato(a) está concorrendo ao cargo de ${candidate.cargo.nome.toLocaleLowerCase()} no município de ${candidate.localCandidatura.toLocaleLowerCase()} pelo partido ${
            candidate.partido.sigla
          }`}
        />

        <link rel="canonical" href={'https://omeuvoto.com.br' + asPath} />
      </Head>

      <picture className={styles.cover}>
        <img
          loading="lazy"
          src="https://www.eccobandeiras.com.br/image/cache/catalog/antigas/Santa-Catarina-1111x740.jpg"
          alt=""
        />
      </picture>

      <div className={styles.profile__content}>
        <img
          src={candidate.fotoUrl}
          alt={`Foto da campanha eleitoral do candidato ${candidate.nomeUrna}`}
        />

        <div className={styles.code}>
          {code.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <h1>{candidate.nomeUrna}</h1>

        <p className={styles.description}>
          O candidato(a) está concorrendo ao{' '}
          <i>cargo de {candidate.cargo.nome.toLocaleLowerCase()}</i> no
          município de <i>{candidate.localCandidatura.toLocaleLowerCase()}</i>{' '}
          pelo partido <i>{candidate.partido.sigla}</i>.
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
