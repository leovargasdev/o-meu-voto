import api from 'lib/api'
import type { Candidate, PreviousElection } from 'types'
import type { ParsedUrlQuery } from 'querystring'
import { maskOnlyNumber, maskSigla } from 'utils/mask'

interface Vice {
  sq_CANDIDATO: number
  urlFoto: string
  nm_CANDIDATO: string
  nm_URNA: string
}

interface ResponseCandidate extends Candidate {
  vices: Vice[] | null
}

const getOtherCandidate = (vices: Vice[] | null) => {
  if (vices && vices.length > 0) {
    return {
      id: vices[0].sq_CANDIDATO,
      urlFoto: vices[0].urlFoto,
      nomeCompleto: vices[0].nm_CANDIDATO.toLocaleLowerCase(),
      nomeUrna: vices[0].nm_URNA
    }
  }

  return null
}

const getInfoReelection = async (
  previousElection: PreviousElection[],
  role: string
) => {
  const oldElection = previousElection.find(
    pe => pe.nrAno === 2020 && pe.cargo === role
  )

  const statusElection = oldElection
    ? oldElection.situacaoTotalizacao.toLocaleLowerCase()
    : ''
  const wasElected = ['eleito', '2º turno'].includes(statusElection)

  if (!oldElection || !wasElected) {
    return { eleito: false }
  }

  if (oldElection.cargo === 'Prefeito') {
    const route = `/buscar/2020/${oldElection.sgUe}/2030402020/candidato/${oldElection.id}`
    const { data } = await api.get<ResponseCandidate>(route)
    const file = data.arquivos.find(item => item.codTipo === '5')

    if (file) {
      const proposta = `https://divulgacandcontas.tse.jus.br/${file.url}/${file.nome}`
      return { eleito: true, proposta }
    }
  }

  return { eleito: true }
}

export const serviceGetCandidate = async (
  params: ParsedUrlQuery | undefined
): Promise<{ revalidate: boolean | number; props: Candidate }> => {
  let id = (params?.id as string) || '0-'
  id = maskOnlyNumber(id.split('-')[0])
  const city = maskOnlyNumber(params?.city as string)

  try {
    const route = `/buscar/2024/${city}/2045202024/candidato/${id}`
    const { data } = await api.get<ResponseCandidate>(route)

    const reelicao = await getInfoReelection(
      data.eleicoesAnteriores,
      data.cargo.nome
    )

    const candidate: Candidate = {
      nomeCompleto: data.nomeCompleto.toLocaleLowerCase(),
      id: data.id,
      numero: data.numero,
      nomeUrna: data.nomeUrna,
      fotoUrl: data.fotoUrl,
      partidoSigla: maskSigla(data.partido.sigla),
      arquivos: data.arquivos,
      sites: data.sites,
      cargo: {
        nome: data.cargo.nome.toLocaleLowerCase()
      },
      localCandidatura: data.localCandidatura.toLocaleLowerCase(),
      partido: data.partido,
      cnpjcampanha: data.cnpjcampanha,
      nomeMunicipioNascimento: data.nomeMunicipioNascimento.toLocaleLowerCase(),
      sgUfNascimento: data.sgUfNascimento,
      dataDeNascimento: data.dataDeNascimento,
      grauInstrucao: data.grauInstrucao,
      ocupacao: data.ocupacao.toLocaleLowerCase(),
      emails: data.emails,
      totalDeBens: data.totalDeBens,
      ufSuperiorCandidatura: data.ufSuperiorCandidatura.toLocaleLowerCase(),
      bens: data.bens,
      eleicoesAnteriores: data.eleicoesAnteriores,
      otherCandidate: getOtherCandidate(data?.vices),
      nomeColigacao: data.nomeColigacao,
      composicaoColigacao: data.composicaoColigacao,
      reelicao
    }

    return { props: candidate, revalidate: false }
  } catch (e) {
    console.log(e)
  }

  return { props: {} as never, revalidate: 60 }
}
