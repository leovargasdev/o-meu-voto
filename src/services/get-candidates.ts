import api from 'lib/api'
import { Candidate, CandidateSimple } from 'types'
import { maskOnlyNumber, maskSigla } from 'utils/mask'

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

    return { candidates, city }
  } catch (err) {
    console.log(err)
  }

  return { candidates: [], city: '' }
}

export const serviceGetCandidates = async (city: string) => {
  try {
    const cityId = maskOnlyNumber(city)

    const [mayor, councilor] = await Promise.all([
      loadCandidates(cityId, '11'),
      loadCandidates(cityId, '13')
    ])

    return {
      city: mayor.city,
      mayor: mayor.candidates,
      councilor: councilor.candidates
    }
  } catch (e) {
    console.log(e)
  }

  return {
    city: '',
    mayor: [],
    councilor: []
  }
}
