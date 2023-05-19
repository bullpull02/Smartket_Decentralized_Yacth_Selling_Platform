import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import MainLayout from 'layouts/MainLayout'
import Loading from 'components/Loading'

import { useAppDispatch } from 'app/hooks'
import { setLoadingModalOpen } from 'slices/modal'
import { apiApproveYacht, apiGetAllYachts } from 'utils/admin/yacht'
import { cx, shortenAddress } from 'utils'
import { YachtStatus } from 'constants/index'

const classNames = {
  th: 'px-4 py-2 text-left text-sm font-semibold uppercase whitespace-nowrap',
  td: 'px-4 py-2 text-left font-medium whitespace-nowrap',
}

const YachtManagement = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [yachts, setYachts] = useState<any[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const data = await apiGetAllYachts()

        if (data.success) {
          setYachts(data.data.yachts)
        } else {
          toast.error(data.message)
        }
      } catch (err: any) {
        toast.error(err.message)
      }

      setLoading(false)
    })()
  }, [])

  const handleApprove = async (id: number): Promise<void> => {
    try {
      if (!window.confirm('Are you sure you really want to approve this yacht?')) return

      dispatch(setLoadingModalOpen(true))

      const data = await apiApproveYacht(id)

      if (data.success) {
        setYachts(data.data.yachts)
      } else {
        toast.error(data.message)
      }
    } catch (err: any) {
      toast.error(err.message)
    }

    dispatch(setLoadingModalOpen(false))
  }

  return (
    <MainLayout title='ADMIN - YACHT MANAGEMENT'>
      <div className='container !max-w-[1920px] py-8'>
        {loading ? (
          <Loading />
        ) : (
          <div className='mx-auto overflow-x-auto'>
            <table className='mx-auto divide-y divide-gray-700'>
              <thead>
                <tr>
                  <th className={classNames.th}>Image</th>
                  <th className={classNames.th}>Status</th>
                  <th className={classNames.th}>Vessel Name</th>
                  <th className={classNames.th}>Manufacturer</th>
                  <th className={classNames.th}>Engine Type</th>
                  <th className={classNames.th}>Price</th>
                  <th className={classNames.th}>Condition</th>
                  <th className={classNames.th}>Location</th>
                  <th className={classNames.th}>Owner</th>
                  <th className={classNames.th}>Wallet Address</th>
                  <th className={classNames.th}>Email</th>
                  <th className={classNames.th}>Phone</th>
                  <th className={classNames.th}>Country</th>
                  <th className={cx('sticky right-0 bg-gray-900', classNames.th)}></th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-800'>
                {yachts.map((yacht, ind) => (
                  <tr key={ind} className='hover:bg-gray-800'>
                    <td className={classNames.td}>
                      <img
                        src={`https://gateway.pinata.cloud/ipfs/${yacht.mainImage}`}
                        alt=''
                        className='h-20 w-20 max-w-none rounded object-cover'
                      />
                    </td>
                    <td className={cx('uppercase', classNames.td)}>{yacht.status}</td>
                    <td className={classNames.td}>{yacht.name}</td>
                    <td className={classNames.td}>{yacht.manufacturer}</td>
                    <td className={classNames.td}>{yacht.engineType}</td>
                    <td className={classNames.td}>{yacht.price === -1 ? '' : yacht.price}</td>
                    <td className={classNames.td}>{yacht.condition}</td>
                    <td className={classNames.td}>{yacht.location}</td>
                    <td className={classNames.td}>
                      {yacht.user.firstName} {yacht.user.lastName}
                    </td>
                    <td className={classNames.td}>{shortenAddress(yacht.user.walletAddress)}</td>
                    <td className={classNames.td}>{yacht.user.email}</td>
                    <td className={classNames.td}>{yacht.user.phone}</td>
                    <td className={classNames.td}>{yacht.user.country}</td>
                    <td className={cx('sticky right-0 bg-gray-900', classNames.td)}>
                      <div className='w-[100px]'>
                        {yacht.status === YachtStatus.PENDING ? (
                          <button
                            className='rounded bg-blue-500 px-4 py-2 text-sm shadow-md'
                            onClick={() => handleApprove(yacht.id)}
                          >
                            APPROVE
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default YachtManagement
