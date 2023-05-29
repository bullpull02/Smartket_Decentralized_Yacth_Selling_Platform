import axios from 'libs/axios'

export const apiGetAllShops = async (): Promise<any> => {
  try {
    const { data } = await axios.get('/shop')
    return data
  } catch (err) {
    throw err
  }
}

export const apiApproveShop = async (id: number): Promise<any> => {
  try {
    const { data } = await axios.put(`/shop/approve/${id}`)
    return data
  } catch (err) {
    throw err
  }
}

export const apiDeclineShop = async (id: number): Promise<any> => {
  try {
    const { data } = await axios.put(`/shop/decline/${id}`)
    return data
  } catch (err) {
    throw err
  }
}
