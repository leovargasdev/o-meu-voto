interface File {
  codTipo: string
  url: string
  nome: string
}

interface Property {
  ordem: string
  descricaoDeTipoDeBem: string
  descricao: string
  valor: string
}

export interface CandidateSimple {
  nomeCompleto: string
  id: number
  numero: number
  nomeUrna: string
  partidoSigla: string
}

interface PreviousElection {
  id: string
  cargo: string
  nrAno: number
  local: string
  partido: string
  sgUe: string
  situacaoTotalizacao: string
}

export interface Candidate extends CandidateSimple {
  arquivos: File[]
  sites: string[]
  fotoUrl: string
  localCandidatura: string
  ufSuperiorCandidatura: string
  cargo: {
    nome: string
  }
  nomeMunicipioNascimento: string
  descricaoSituacao?: string
  sgUfNascimento: string
  dataDeNascimento: string
  grauInstrucao: string
  ocupacao: string
  emails: string[]
  cnpjcampanha: string
  bens: Property[]
  totalDeBens: number
  partido: {
    sigla: string
    nome: string
  }
  reelicao: {
    eleito: boolean
    proposta?: string
  }
  nomeColigacao: string
  composicaoColigacao: string
  eleicoesAnteriores: PreviousElection[]
  otherCandidate: {
    id: number
    nomeCompleto: string
    nomeUrna: string
    urlFoto: string
  } | null
}
