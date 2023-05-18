import axios from 'libs/axios'

export const apiGetAllYachts = async (): Promise<any> => {
  try {
    const { data } = await axios.get('/yacht')
    return data
  } catch (err) {
    throw err
  }
}

export const apiApproveYacht = async (id: number): Promise<any> => {
  try {
    const { data } = await axios.put(`/yacht/approve/${id}`)
    return data
  } catch (err) {
    throw err
  }
}
