import axios from 'libs/axios'

export const apiLogin = async (): Promise<any> => {
  try {
    const { data } = await axios.post('/user/login')
    return data
  } catch (err) {
    throw err
  }
}

export const apiCreateUser = async (params: Register): Promise<any> => {
  try {
    const { data } = await axios.post('/user', params)
    return data
  } catch (err) {
    throw err
  }
}

export const apiUpdateUser = async (id: number, params: Register): Promise<any> => {
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
