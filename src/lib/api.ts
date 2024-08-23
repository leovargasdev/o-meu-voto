import axios from 'axios'

const api = axios.create({
  baseURL:
    'https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2024'
})

export default api
