import api from 'lib/api'
import { maskSigla } from 'utils/mask'
import { Candidate, CandidateSimple } from 'types'

interface Response {
  candidatos: Candidate[]
  unidadeEleitoral: {
    nome: string
    sigla: string
  }
}

const loadCandidates = async (cityId: string, role: string) => {
  try {
    const route = `/listar/2024/${cityId}/2045202024/${role}/candidatos`
    const { data } = await api.get<Response>(route)

    return data.candidatos.reduce((acc, candidate) => {
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

  return null
}

export const serviceGetCandidates = async (cityId: string) => {
  try {
    const mayor = await loadCandidates(cityId, '11')

    if (mayor) {
      const councilor = await loadCandidates(cityId, '13')
      return { mayor, councilor }
    }
  } catch (e) {
    console.log(e)
  }

  return null
}
