import axios from 'libs/axios'

export const apiCreateShop = async (params: any): Promise<any> => {
  try {
    const { data } = await axios.post('/shop', params)
    return data
  } catch (err) {
    throw err
  }
}
