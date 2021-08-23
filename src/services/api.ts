import axios from 'axios'

const api = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/'
})

export default api;