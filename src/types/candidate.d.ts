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
  ufCandidatura: string
  id: number
  numero: number
  nomeUrna: string
  descricaoSituacao: string
  partido: {
    sigla: string
    nome: string
  }
}

export interface Candidate extends CandidateSimple {
  arquivos: File[]
  sites: string[]
  fotoUrl: string
  localCandidatura: string
  cargo: {
    nome: string
  }
  nomeMunicipioNascimento: string
  sgUfNascimento: string
  dataDeNascimento: string
  grauInstrucao: string
  ocupacao: string
  emails: string[]
  cnpjcampanha: string
  bens: Property[]
  totalDeBens: number
}
