import axios from 'axios'

const api = axios.create({
  baseURL: 'https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura'
})

export default api
