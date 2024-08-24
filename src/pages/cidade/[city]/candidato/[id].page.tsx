import Head from 'next/head'
import * as emoji from 'node-emoji'
import { differenceInYears } from 'date-fns'
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  Bank,
  Building,
  Car,
  CurrencyCircleDollar,
  Download,
  FacebookLogo,
  House,
  InstagramLogo,
  MapPinArea,
  Newspaper,
  Receipt,
  XLogo,
  YoutubeLogo
} from '@phosphor-icons/react'

import api from 'lib/api'
import { Candidate } from 'types/candidate'
import styles from './styles.module.scss'

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

  const queryName = candidate.nomeCompleto.replace(/ /g, '+')
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
    <div className={styles.container}>
      <Head>
        <title>{candidate.nomeCompleto}</title>
      </Head>
      <div className={styles.content}>
        {proposta && (
          <a
            className={styles.pdf}
            target="_blank"
            href={`https://divulgacandcontas.tse.jus.br/${proposta.url}/${proposta.nome}`}
            rel="noreferrer"
          >
            <Download />
            Baixar proposta de governo
          </a>
        )}

        <picture className={styles.cover}>
          <img
            src="https://www.eccobandeiras.com.br/image/cache/catalog/antigas/Santa-Catarina-1111x740.jpg"
            alt=""
          />
        </picture>

        <div className={styles.content__info}>
          <header>
            <img src={candidate.fotoUrl} alt="" />

            <div>
              <div>
                {candidate.numero
                  .toString()
                  .split('')
                  .map(item => (
                    <span key={item}>{item}</span>
                  ))}
              </div>
              <h1>{candidate.nomeCompleto.toLocaleLowerCase()}</h1>
            </div>

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
          </header>

          <h2>
            <p>{candidate.localCandidatura.toLocaleLowerCase()}</p>•
            <p>{candidate.cargo.nome}</p>•
            <p>
              {candidate.partido.sigla} - {candidate.partido.nome}
            </p>
          </h2>

          <div className={styles.tags}>
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
            <span>
              <span>{emoji.find('📫')?.emoji}</span>
              {candidate.emails[0]}
            </span>
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
          </div>

          <h3>
            <Newspaper />
            Pesquise notícias
          </h3>

          <ul>
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

          <h3>
            <Receipt />
            Patrimônio declarado
          </h3>

          <div className={styles.receipts}>
            {candidate.bens.map(item => (
              <div key={item.ordem} className={styles.receipt}>
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
    const response = await api.get(
      `/buscar/2024/${city}/2045202024/candidato/${id}`
    )
    return { props: response.data }
  } catch (e) {
    console.log(e)
  }

  return { props: {} }
}

export default CandidatePage
