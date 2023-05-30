import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedinIcon from '@mui/icons-material/LinkedIn'

import MainLayout from 'layouts/MainLayout'
import Loading from 'components/Loading'
import DocumentUploadModal from 'components/Modal/DocumentUpload'

import { useAppDispatch } from 'app/hooks'
import { setLoadingModalOpen } from 'slices/modal'
import { shortenAddress, uploadToIPFS } from 'utils'
import { apiGetAllShops, apiApproveShop, apiDeclineShop, apiPurchaseShop } from 'utils/admin/shop'
import { ShopStatus } from 'constants/shop'

const ShopManagement = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [shops, setShops] = useState<any[]>([])
  const [purchaseId, setPurchaseId] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const data = await apiGetAllShops()

        if (data.success) {
          setShops(data.data.shops)
        } else {
          toast.error(data.message)
        }
      } catch (_) {
        toast.error('Network Error')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleApprove = async (id: number): Promise<void> => {
    try {
      if (!window.confirm('Are you sure you really want to approve this shop?')) return

      dispatch(setLoadingModalOpen(true))

      const data = await apiApproveShop(id)

      if (data.success) {
        setShops(data.data.shops)
        toast.success(`Successfully approve the shop ${id}`)
      } else {
        toast.error(data.message)
      }
    } catch (_) {
      toast.error('Network Error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  const handleDecline = async (id: number): Promise<void> => {
    try {
      if (!window.confirm('Are you sure you really want to decline this shop?')) return

      dispatch(setLoadingModalOpen(true))

      const data = await apiDeclineShop(id)

      if (data.success) {
        setShops(data.data.shops)
        toast.success(`Successfully declined the shop ${id}`)
      } else {
        toast.error(data.message)
      }
    } catch (_) {
      toast.error('Network Error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  const handlePurchase = async (id: number): Promise<void> => {
    setPurchaseId(id)
    setIsOpen(true)
  }

  const handleUploadAndPurchase = async (documents: File[]): Promise<void> => {
    if (documents.length === 0) {
      toast.error('You must upload at least one document')
      return
    }
    try {
      dispatch(setLoadingModalOpen(true))

      const _documents = []
      for (let document of documents) {
        _documents.push(await uploadToIPFS('file', document))
      }

      const data = await apiPurchaseShop(purchaseId, _documents)

      if (data.success) {
        setShops(data.data.shops)
        toast.success(`Successfully purchased the shop ${purchaseId}`)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Network Error')
    } finally {
      dispatch(setLoadingModalOpen(false))
      setIsOpen(false)
    }
  }

  return (
    <MainLayout title='ADMIN - SHOP MANAGEMENT'>
      <DocumentUploadModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onSubmit={handleUploadAndPurchase}
      />
      <div className='px-5 py-8'>
        {loading ? (
          <Loading />
        ) : (
          <div className='mx-auto overflow-x-auto'>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Shop Information</TableCell>
                    <TableCell>Owner Information</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shops.map((shop) => (
                    <TableRow key={shop.id}>
                      <TableCell>{shop.id}</TableCell>
                      <TableCell>
                        <span className='rounded-full p-2 text-xl font-medium uppercase'>
                          {shop.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className='space-y-1'>
                          <p className='flex'>
                            <p className='w-32'>Location:</p>
                            {shop.street}, {shop.city}, {shop.state} {shop.zipCode}
                          </p>
                          <p className='flex'>
                            <p className='w-32'>Price:</p>
                            {shop.price > 0 ? shop.price : 'Call for pricing'}
                          </p>
                          <p className='flex'>
                            <p className='w-32'>Sale Type:</p>
                            {shop.saleType}
                          </p>
                          <p className='flex'>
                            <p className='w-32'>Building Status:</p>
                            {shop.buildingStatus}
                          </p>
                          <p className='flex'>
                            <p className='w-32'>Floors:</p>
                            {shop.floors}
                          </p>
                          <p className='flex'>
                            <p className='w-32'>Year Built:</p>
                            {shop.yearBuilt}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='space-y-1'>
                          <p className='flex'>
                            <p className='w-32'>Name:</p>
                            {shop.user.firstName} {shop.user.lastName}
                          </p>
                          <p className='flex'>
                            <p className='w-32'>Wallet Address:</p>
                            {shortenAddress(shop.user.walletAddress)}
                          </p>
                          <p className='flex'>
                            <p className='w-32'>Email:</p>
                            {shop.user.email}
                          </p>
                          <p className='flex'>
                            <p className='w-32'>Phone:</p>
                            {shop.user.phone}
                          </p>
                          <p className='flex'>
                            <p className='w-32'>Location:</p>
                            {shop.user.street}, {shop.user.city}, {shop.user.state}{' '}
                            {shop.user.zipCode}
                          </p>
                          <p className='flex'>
                            <p className='w-32'>Social:</p>
                            <div className='flex gap-2'>
                              {shop.user.twitter && (
                                <Link to={shop.user.twitter} target='_blank'>
                                  <TwitterIcon />
                                </Link>
                              )}
                              {shop.user.facebook && (
                                <Link to={shop.user.facebook} target='_blank'>
                                  <FacebookIcon />
                                </Link>
                              )}
                              {shop.user.linkedin && (
                                <Link to={shop.user.linkedin} target='_blank'>
                                  <LinkedinIcon />
                                </Link>
                              )}
                            </div>
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-col gap-2'>
                          {shop.status === ShopStatus.PENDING && (
                            <>
                              <Button
                                variant='contained'
                                color='success'
                                onClick={() => handleApprove(shop.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant='contained'
                                color='error'
                                onClick={() => handleDecline(shop.id)}
                              >
                                Decline
                              </Button>
                            </>
                          )}
                          {shop.status === ShopStatus.SOLD && (
                            <Button variant='contained' onClick={() => handlePurchase(shop.id)}>
                              Purchase
                            </Button>
                          )}
                          <Link to={`/details/assets/business/shop/${shop.id}`} target='_blank'>
                            <Button variant='contained' color='info' fullWidth>
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default ShopManagement
