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

export const apiListYacht = async ({ id, price }: { id: number; price: number }): Promise<any> => {
  try {
    const { data } = await axios.put(`/yacht/list/${id}`, { price })
    return data
  } catch (err) {
    throw err
  }
}

export const apiGetYachtsForSale = async (): Promise<any> => {
  try {
    const { data } = await axios.get('/yacht/marketplace')
    return data
  } catch (err) {
    throw err
  }
}
