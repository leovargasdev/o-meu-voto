import Head from 'next/head'
import * as emoji from 'node-emoji'
import classNames from 'classnames'
import { Candidate } from 'types/candidate'
import { differenceInYears } from 'date-fns'
import { GetStaticPaths, GetStaticProps } from 'next'

import api from 'lib/api'

import styles from './styles.module.scss'
import {
  FacebookLogo,
  FileText,
  InstagramLogo,
  Mailbox,
  Newspaper,
  Receipt,
  XLogo,
  YoutubeLogo,
  Bank,
  Building,
  Car,
  CurrencyCircleDollar,
  House,
  MapPinArea
} from '@phosphor-icons/react'

const convertFloatToCurrency = (currency: string) => {
  const value = Number(currency)

  if (!value) {
    return '-'
  }

  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  }).format(value)
}

const CandidatePage = (candidate: Candidate) => {
  if (!candidate) {
    return <></>
  }

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

  const queryName = candidate.nomeCompleto.replace(/ /g, '+')
  const proposta = candidate.arquivos.find(item => item.codTipo === '5')

  return (
    <div className={styles.container}>
      <Head>
        <title>{candidate.nomeCompleto}</title>
      </Head>

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
            municipio de <i>{candidate.localCandidatura.toLocaleLowerCase()}</i>
            .
          </p>

          {proposta && (
            <a
              className={styles.pdf}
              target="_blank"
              href={`https://divulgacandcontas.tse.jus.br/${proposta.url}/${proposta.nome}`}
              rel="noreferrer"
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

      <div className={classNames('card', styles.content)}>
        <div className={styles.tags}>
          <a
            href={`https://cnpj.biz/${candidate.cnpjcampanha}`}
            target="_blank"
            rel="noreferrer"
          >
            <span>{emoji.find('📝')?.emoji}</span>
            {candidate.cnpjcampanha.replace(
              /(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/g,
              '$1.$2.$3/$4-$5'
            )}
          </a>
          <span>
            <span>{emoji.find('📍')?.emoji}</span>
            {candidate.nomeMunicipioNascimento} - {candidate.sgUfNascimento}
          </span>
          <span>
            <span>{emoji.find('🎁')?.emoji}</span>
            {differenceInYears(
              new Date(),
              new Date(candidate.dataDeNascimento)
            )}{' '}
            anos
          </span>
          <span>
            <span>{emoji.find('📚')?.emoji}</span>
            {candidate.grauInstrucao}
          </span>
          <span>
            <span>{emoji.find('💼')?.emoji}</span>
            {candidate.ocupacao}
          </span>
        </div>

        <div>
          <h2>
            <Mailbox />
            Emails para contato
          </h2>

          <p>{candidate.emails.join(', ')}</p>
        </div>

        <div>
          <h2>
            <Newspaper />
            Pesquise notícias
          </h2>

          <ul className={styles.news}>
            <li>
              <a
                href={`https://g1.globo.com/busca/?q=${queryName}`}
                target="_blank"
                rel="noreferrer"
              >
                G1 - Globo
              </a>
            </li>
            <li>
              <a
                href={`https://congressoemfoco.uol.com.br/?s=${queryName}`}
                target="_blank"
                rel="noreferrer"
              >
                UOL
              </a>
            </li>
            <li>
              <a
                href={`https://search.folha.uol.com.br/search?q=${queryName}`}
                target="_blank"
                rel="noreferrer"
              >
                Folha de São Paulo
              </a>
            </li>
            <li>
              <a
                href={`https://www.cnnbrasil.com.br/?s=${queryName}`}
                target="_blank"
                rel="noreferrer"
              >
                CNN Brasil
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2>
            <Receipt />
            Patrimônio declarado
          </h2>

          <div className={styles.properties}>
            {candidate.bens.map(item => (
              <div key={item.ordem} className={styles.property}>
                {item.descricaoDeTipoDeBem.includes('automóvel') && (
                  <span>
                    <Car size={20} />
                  </span>
                )}
                {item.descricaoDeTipoDeBem.includes('Apartamento') && (
                  <span>
                    <Building size={20} />
                  </span>
                )}
                {item.descricaoDeTipoDeBem.includes('Casa') && (
                  <span>
                    <House size={20} />
                  </span>
                )}
                {item.descricaoDeTipoDeBem.includes('Terreno') && (
                  <span>
                    <MapPinArea size={20} />
                  </span>
                )}
                {(item.descricaoDeTipoDeBem.includes('Investimentos') ||
                  item.descricaoDeTipoDeBem.includes('Outros fundos')) && (
                  <span>
                    <CurrencyCircleDollar size={20} />
                  </span>
                )}
                {(item.descricaoDeTipoDeBem.includes('CDB') ||
                  item.descricaoDeTipoDeBem.includes('conta corrente')) && (
                  <span>
                    <Bank size={20} />
                  </span>
                )}
                <div>
                  <strong>{item.descricao}</strong>
                  <span>{convertFloatToCurrency(item.valor)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { city, id } = params as never

  try {
    const response = await api.get(`/${city}/2045202024/candidato/${id}`)
    return { props: response.data }
  } catch (e) {
    console.log(e)
  }

  return { props: {} }
}

export default CandidatePage
