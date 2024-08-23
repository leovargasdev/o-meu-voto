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

export interface Candidate {
  nomeCompleto: string
  arquivos: File[]
  sites: string[]
  fotoUrl: string
  numero: string
  localCandidatura: string
  cargo: {
    nome: string
  }
  partido: {
    sigla: string
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
}
