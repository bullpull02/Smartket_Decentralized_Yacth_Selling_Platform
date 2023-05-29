import axios from 'libs/axios'

export const apiCreateShop = async (params: any): Promise<any> => {
  try {
    const { data } = await axios.post('/shop', params)
    return data
  } catch (err) {
    throw err
  }
}

export const apiGetShop = async (id: number): Promise<any> => {
  try {
    const { data } = await axios.get(`/shop/${id}`)
    return data
  } catch (err) {
    throw err
  }
}

export const apiListShop = async ({ id, price }: { id: number; price: number }): Promise<any> => {
  try {
    const { data } = await axios.put(`/shop/list/${id}`, { price })
    return data
  } catch (err) {
    throw err
  }
}

export const apiGetShopsForSale = async (): Promise<any> => {
  try {
    const { data } = await axios.get('/shop/marketplace')
    return data
  } catch (err) {
    throw err
  }
}

export const apiBuyShop = async ({ id, seller }: { id: number; seller: number }): Promise<any> => {
  try {
    const { data } = await axios.put(`/shop/buy/${id}`, { seller })
    return data
  } catch (err) {
    throw err
  }
}

export const apiOfferShop = async ({ id, price }: { id: number; price: number }): Promise<any> => {
  try {
    const { data } = await axios.put(`/shop/offer/${id}`, { price })
    return data
  } catch (err) {
    throw err
  }
}

export const apiSellShop = async ({ id, buyer }: { id: number; buyer: number }): Promise<any> => {
  try {
    const { data } = await axios.put(`/shop/sell/${id}`, { buyer })
    return data
  } catch (err) {
    throw err
  }
}

export const apiDeclineShop = async (id: number): Promise<any> => {
  try {
    const { data } = await axios.put(`/shop/decline-offer/${id}`)
    return data
  } catch (err) {
    throw err
  }
}

export const apiRemoveShop = async (id: number): Promise<any> => {
  try {
    const { data } = await axios.delete(`/shop/${id}`)
    return data
  } catch (err) {
    throw err
  }
}
