import axios from 'libs/axios'

export const apiCreateYacht = async (params: any): Promise<any> => {
  try {
    const { data } = await axios.post('/yacht', params)
    return data
  } catch (err) {
    throw err
  }
}

export const apiGetYacht = async (id: number): Promise<any> => {
  try {
    const { data } = await axios.get(`/yacht/${id}`)
    return data
  } catch (err) {
    throw err
  }
}
