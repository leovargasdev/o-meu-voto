import api from 'lib/api'
import { Candidate, CandidateSimple } from 'types'
import { maskOnlyNumber, maskSigla } from 'utils/mask'

const loadCandidates = async (city: string, role: string) => {
  try {
    const route = `/listar/2024/${city}/2045202024/${role}/candidatos`
    const response = await api.get<{ candidatos: Candidate[] }>(route)

    return response.data.candidatos.reduce((acc, candidate) => {
      if (candidate.descricaoSituacao !== 'Indeferido') {
        acc.push({
          nomeCompleto: candidate.nomeCompleto.toLocaleLowerCase(),
          id: candidate.id,
          numero: candidate.numero,
          nomeUrna: candidate.nomeUrna,
          partidoSigla: maskSigla(candidate.partido.sigla)
        })
      }

      return acc
    }, [] as CandidateSimple[])
  } catch (err) {
    console.log(err)
  }

  return []
}

export const serviceGetCandidates = async (city: string) => {
  try {
    const cityId = maskOnlyNumber(city)

    const [prefeito, vereador] = await Promise.all([
      loadCandidates(cityId, '11'),
      loadCandidates(cityId, '13')
    ])

    return prefeito.concat(vereador)
  } catch (e) {
    console.log(e)
  }

  return []
}
