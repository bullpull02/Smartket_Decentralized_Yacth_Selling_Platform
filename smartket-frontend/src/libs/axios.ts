import axios from 'axios'

import { SERVER_URL } from 'config'

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  const signature = localStorage.getItem('signature')
  const walletAddress = localStorage.getItem('walletAddress')

  config.headers['x-signature'] = signature
  config.headers['x-wallet-address'] = walletAddress
  return config
})

export default instance
