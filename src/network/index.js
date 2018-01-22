import axios from 'axios'

const DEV_BASE_URL = 'http://testnet.cctime.org:4096/api/dapps/d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1'
// const PROD_BASE_URL = 'https://raw.githubusercontent.com/BelinChung/HiApp/master/mock_api'
const PROD_BASE_URL = 'http://testnet.cctime.org:4096/api/dapps/d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1'
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? DEV_BASE_URL : PROD_BASE_URL

// Add a request interceptor
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(response => {
  let data = response.data
  return !data.err_code ? data : Promise.reject(data)
}, error => {
  return Promise.reject(error)
})
