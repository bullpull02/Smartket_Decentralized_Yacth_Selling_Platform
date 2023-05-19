import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import Yacht from 'components/Yacht'
import Loading from 'components/Loading'

import { apiGetYachtsForSale } from 'utils/yacht'

const YachtMarketplace = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [yachts, setYachts] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const data = await apiGetYachtsForSale()

        if (data.success) {
          setYachts(data.data.yachts)
        } else {
          toast.error(data.message)
        }
      } catch (_) {
        toast.error('Network error')
      }

      setLoading(false)
    })()
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <div className='grid grid-cols-4 gap-4'>
      {yachts.map((yacht, ind) => (
        <Yacht yacht={yacht} key={ind} />
      ))}
    </div>
  )
}

export default YachtMarketplace
