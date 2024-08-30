import api from 'lib/api'
import type { Candidate } from 'types'
import { maskOnlyNumber, maskSigla } from 'utils/mask'
import type { ParsedUrlQuery } from 'querystring'

export const serviceGetCandidate = async (
  params: ParsedUrlQuery | undefined
): Promise<{ revalidate: boolean | number; props: Candidate }> => {
  const id = maskOnlyNumber(params?.id as string)
  const city = maskOnlyNumber(params?.city as string)

  try {
    const route = `/buscar/2024/${city}/2045202024/candidato/${id}`
    const { data } = await api.get<Candidate>(route)

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
      bens: data.bens
    }

    return { props: candidate, revalidate: false }
  } catch (e) {
    console.log(e)
  }

  return { props: {} as never, revalidate: 60 }
}
