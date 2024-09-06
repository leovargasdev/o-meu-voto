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

    const candidates = data.candidatos.reduce((acc, candidate) => {
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

    const { nome, sigla } = data.unidadeEleitoral
    const city = `${nome.toLocaleLowerCase()} (${sigla})`

    return { candidates, city, error: false }
  } catch (err) {
    console.log(err)
  }

  return { candidates: [], city: '', error: true }
}

export const serviceGetCandidates = async (cityId: string) => {
  try {
    const mayor = await loadCandidates(cityId, '11')

    if (!mayor.error) {
      const councilor = await loadCandidates(cityId, '13')

      return {
        city: mayor.city,
        mayor: mayor.candidates,
        councilor: councilor.candidates
      }
    }
  } catch (e) {
    console.log(e)
  }

  return { error: true, mayor: [] }
}
