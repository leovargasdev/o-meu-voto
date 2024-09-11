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
  nrAno: string
  local: string
  partido: string
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
  eleicoesAnteriores: PreviousElection[]
  otherCandidate: {
    id: number
    nomeCompleto: string
    nomeUrna: string
    urlFoto: string
  } | null
}
