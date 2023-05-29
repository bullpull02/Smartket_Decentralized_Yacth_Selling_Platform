import axios from 'libs/axios'

export const apiLogin = async (): Promise<any> => {
  try {
    const { data } = await axios.post('/user/login')
    return data
  } catch (err) {
    throw err
  }
}

export const apiGetUser = async (id: number): Promise<any> => {
  try {
    const { data } = await axios.get(`/user/${id}`)
    return data
  } catch (err) {
    throw err
  }
}

export const apiCreateUser = async (params: any): Promise<any> => {
  try {
    const { data } = await axios.post('/user', params)
    return data
  } catch (err) {
    throw err
  }
}

export const apiUpdateUser = async (id: number, params: any): Promise<any> => {
  try {
    const { data } = await axios.put('/user/:id', params)
    return data
  } catch (err) {
    throw err
  }
}

export const apiDeleteUser = async (id: number): Promise<any> => {
  try {
    const { data } = await axios.delete(`/user/${id}`)
    return data
  } catch (err) {
    throw err
  }
}

export const apiGetMyAssets = async (): Promise<any> => {
  try {
    const { data } = await axios.get('/user/get-my-assets/')
    return data
  } catch (err) {
    throw err
  }
}

export const apiGetAssetsForSale = async (): Promise<any> => {
  try {
    const { data } = await axios.get('/user/marketplace')
    return data
  } catch (err) {
    throw err
  }
}
