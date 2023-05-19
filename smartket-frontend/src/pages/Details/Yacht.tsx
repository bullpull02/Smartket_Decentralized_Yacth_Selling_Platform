import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import MainLayout from 'layouts/MainLayout'
import Loading from 'components/Loading'
import { ReactComponent as RemoveIcon } from 'icons/recycle-bin.svg'

import { useAppDispatch } from 'app/hooks'
import { setLoadingModalOpen } from 'slices/modal'
import { cx } from 'utils'
import { apiGetYacht, apiListYacht } from 'utils/yacht'
import { YachtStatus, StatusColor } from 'constants/index'

const classNames = {
  propertyDiv: 'flex items-end space-x-4',
  propertyTitle: 'w-24',
  propertyInfo: 'text-lg font-semibold',
}

const YachtDetail = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [yacht, setYacht] = useState<any>({})
  const [prevImage, setPrevImage] = useState<string>('')
  const { id } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!id) return
    ;(async () => {
      setLoading(true)

      try {
        const data = await apiGetYacht(+id)

        if (data.success) {
          setYacht(data.data.yacht)
          setPrevImage(data.data.yacht.mainImage)
        } else {
          toast.error(data.message)
        }
      } catch (err: any) {
        toast.error(err.message)
      }

      setLoading(false)
    })()
  }, [id])

  const handleListYacht = async (id: number): Promise<void> => {
    try {
      const price = window.prompt('Please enter the price of this yacht') || ''

      if (!(+price > 0 && +price < 1000000000)) {
        toast.error('Invalid price')
        return
      }

      if (!window.confirm('Are you sure you really want to list this yacht?')) return

      dispatch(setLoadingModalOpen(true))

      const data = await apiListYacht({ id, price: +price })

      if (data.success) {
        setYacht(data.data.yacht)
        toast.success('Successfully listed this yacht')
      } else {
        toast.error(data.message)
      }
    } catch (_) {
      toast.error('Network error')
    }

    dispatch(setLoadingModalOpen(false))
  }

  const handleRemoveYacht = async (): Promise<void> => {}

  return (
    <MainLayout title='SMARTKET - YACHT DETAIL'>
      <div className='container py-8'>
        {loading ? (
          <Loading />
        ) : (
          <div className='relative grid grid-cols-3 gap-8'>
            <RemoveIcon
              className='absolute right-0 top-0 w-6 cursor-pointer transition hover:opacity-80'
              title='DELETE YACHT'
              onClick={handleRemoveYacht}
            />
            <div className='relative col-span-2 grid gap-4'>
              <h4
                className={cx(
                  'absolute left-0 top-0 rounded-br p-2 text-xl font-bold uppercase backdrop-blur',
                  StatusColor[yacht.status],
                )}
              >
                {yacht.status}
              </h4>
              <h5 className='absolute right-0 top-0 rounded-l-full bg-green-800 p-1 pl-3 text-sm font-bold uppercase'>
                {yacht.price === -1 ? 'Call for pricing' : yacht.price}
              </h5>
              <img
                src={`https://gateway.pinata.cloud/ipfs/${prevImage}`}
                alt=''
                className='aspect-video w-full max-w-none object-cover'
              />
              <div className='flex gap-4 overflow-x-auto'>
                {[yacht.mainImage, ...JSON.parse(yacht.images)].map(
                  (image: string, ind: number) => (
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${image}`}
                      alt=''
                      className='aspect-square w-32 object-cover'
                      onClick={() => setPrevImage(image)}
                      key={ind}
                    />
                  ),
                )}
              </div>
            </div>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <h3 className='text-3xl font-bold'>{yacht.name}</h3>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Manufacturer</h5>
                  <span className={classNames.propertyInfo}>{yacht.manufacturer}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Engine Type</h5>
                  <span className={classNames.propertyInfo}>{yacht.engineType}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Year</h5>
                  <span className={classNames.propertyInfo}>{yacht.year}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Length(inch)</h5>
                  <span className={classNames.propertyInfo}>{yacht.length_inch}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Condition</h5>
                  <span className={classNames.propertyInfo}>{yacht.condition}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Location</h5>
                  <span className={classNames.propertyInfo}>{yacht.location}</span>
                </div>
              </div>
              <hr className='border-t border-gray-700' />
              <div className='space-y-2'>
                <h3 className='text-2xl font-bold'>Owner Information</h3>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Name</h5>
                  <span className={classNames.propertyInfo}>
                    {yacht.user.firstName} {yacht.user.lastName}
                  </span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Email</h5>
                  <span className={classNames.propertyInfo}>{yacht.user.email}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Phone</h5>
                  <span className={classNames.propertyInfo}>{yacht.user.phone}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Country</h5>
                  <span className={classNames.propertyInfo}>{yacht.user.country}</span>
                </div>
              </div>
              <hr className='border-t border-gray-700' />
              <div>
                {yacht.status === YachtStatus.PENDING ? (
                  <p className='text-xl italic text-gray-500'>Waiting for admin to approve...</p>
                ) : (
                  yacht.status === YachtStatus.ACCEPTED && (
                    <button
                      className='rounded bg-blue-500 px-4 py-2 font-bold uppercase shadow'
                      onClick={() => handleListYacht(yacht.id)}
                    >
                      List my yacht
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default YachtDetail
