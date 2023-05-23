import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import Loading from 'components/Loading'

import { apiGetYachtsForSale } from 'utils/yacht'
import { cx } from 'utils'
import { YachtStatus, StatusColor } from 'constants/yacht'

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
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <div className='grid grid-cols-4 gap-4'>
      {yachts.map((yacht, ind) => (
        <Link to={`/details/yacht/${yacht.id}`} key={ind}>
          <div
            className='group relative aspect-square cursor-pointer overflow-hidden rounded-md'
            key={ind}
          >
            <img
              src={`https://gateway.pinata.cloud/ipfs/${yacht.mainImage}`}
              alt=''
              className='trans h-full w-full object-cover !duration-700 group-hover:scale-125'
            />
            {(yacht.status === YachtStatus.LISTED || yacht.status === YachtStatus.OFFERED) && (
              <h4
                className={cx(
                  'absolute left-8 top-8 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-opacity-80 p-1 text-center text-sm font-bold uppercase shadow',
                  StatusColor[yacht.status],
                )}
              >
                {yacht.status}
              </h4>
            )}
            <h5
              className={cx(
                'absolute right-0 top-0 rounded-l-full p-1 pl-3 text-sm font-bold uppercase',
                yacht.price === -1 ? 'bg-red-600' : 'bg-green-600',
              )}
            >
              {yacht.price === -1 ? 'Call for pricing' : yacht.price}
            </h5>
            <h3 className='absolute bottom-0 w-full bg-black bg-opacity-80 p-2 text-center text-xl font-bold backdrop-blur'>
              {yacht.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default YachtMarketplace
