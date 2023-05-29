import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import MainLayout from 'layouts/MainLayout'
import Shop from 'components/Assets/Business/Shop'
import Yacht from 'components/Assets/PersonalAssets/Yacht'

import { apiGetAssetsForSale } from 'utils/user'
import Loading from 'components/Loading'

const Marketplace = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [shops, setShops] = useState<any[]>([])
  const [yachts, setYachts] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const data = await apiGetAssetsForSale()

        if (data.success) {
          setShops(data.data.shops)
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

  return (
    <MainLayout title='SMARTKET - MARKETPLACE'>
      <div className='container py-8'>
        {loading ? (
          <Loading />
        ) : (
          <div className='space-y-8'>
            <div>
              <h3 className='text-2xl font-semibold'>Shops</h3>
              <div className='mt-4 grid grid-cols-4 gap-4'>
                {shops.map((shop) => (
                  <Shop
                    shop={shop}
                    onClick={() => navigate(`/details/assets/business/shop/${shop.id}`)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className='text-2xl font-semibold'>Yachts</h3>
              {yachts.map((yacht) => (
                <Yacht
                  yacht={yacht}
                  onClick={() => navigate(`/details/assets/personal-assets/yacht/${yacht.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default Marketplace
