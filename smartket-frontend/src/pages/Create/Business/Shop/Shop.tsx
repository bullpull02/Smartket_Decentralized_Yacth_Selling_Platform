import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import MainLayout from 'layouts/MainLayout'
import Steps from './Steps'

import { useAppDispatch } from 'app/hooks'
import { createShop } from 'slices/user'
import { setLoadingModalOpen } from 'slices/modal'
import { uploadToIPFS } from 'utils'
import { tabs } from 'constants/shop'

const Shop = () => {
  const [tabValue, setTabValue] = useState<number>(0)
  const [shopInfo, setShopInfo] = useState<Record<any, any>>({
    saleType: 'Investment',
    landAreaUnit: 'AC',
    highlights: [''],
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])
  const StepComponent = useMemo(() => Steps[tabValue], [tabValue])
  const dispatch = useAppDispatch()

  const checkValid = (shopInfo: any) => {
    if (!shopInfo.street) return 'Street field is required'
    if (!shopInfo.city) return 'City field is required'
    if (!shopInfo.state) return 'State field is required'
    if (!shopInfo.zipCode) return 'Zipcode field is required'
    if (shopInfo.zipCode.length !== 5) return 'Zipcode must be 5 digits'
    if (!shopInfo.phone) return 'Phone field is required'
    if (!shopInfo.buildingStatus) return 'Building status field is required'
    if (!shopInfo.rba) return 'RBA field is required'
    if (!shopInfo.floors) return 'Floors field is required'
    if (!shopInfo.typicalFloor) return 'Typical floor field is required'
    if (!shopInfo.yearBuilt) return 'Year built field is required'

    return true
  }

  const handleTabChange = (_: React.SyntheticEvent, newTabValue: number): void => {
    setTabValue(newTabValue)
  }

  const handleNextStep = (): void => {
    setTabValue((prev) => prev + 1)
  }

  const handlePrevStep = (): void => {
    setTabValue((prev) => prev - 1)
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      if (photos.length === 0) {
        toast.error('There must be at least one photo')
        return
      }

      const isValid = checkValid(shopInfo)

      if (isValid !== true) {
        toast.error(isValid)
        return
      }

      if (!window.confirm('Are you sure you really want to create a new shop?')) return

      dispatch(setLoadingModalOpen(true))

      const _documents = [],
        _photos = []

      for (let document of documents) {
        _documents.push(await uploadToIPFS('file', document))
      }

      for (let photo of photos) {
        _photos.push(await uploadToIPFS('file', photo))
      }

      const { payload } = await dispatch(
        createShop({ ...shopInfo, photos: _photos, documents: _documents }),
      )

      if (payload.success) {
        toast.success('Successfully created a new shop')
      } else {
        toast.error(payload.message)
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  return (
    <MainLayout title='SMARTKET - CREATE SHOP'>
      <div className='container !max-w-5xl py-8'>
        <h2 className='text-2xl font-bold uppercase'>Create Shop</h2>
        <div className='mt-8 space-y-6'>
          <div className='border-b border-gray-500 bg-stone-950'>
            <Tabs value={tabValue} onChange={handleTabChange}>
              {tabs.map((tab, ind) => (
                <Tab label={tab} key={ind} />
              ))}
            </Tabs>
          </div>
          <div className='min-h-[360px]'>
            <StepComponent
              shopInfo={shopInfo}
              setShopInfo={setShopInfo}
              photos={photos}
              setPhotos={setPhotos}
              documents={documents}
              setDocuments={setDocuments}
            />
          </div>
          <div className='flex justify-between gap-4'>
            <div className='flex gap-4'>
              <Button variant='outlined' disabled={tabValue === 0} onClick={handlePrevStep}>
                Prev
              </Button>
              <Button
                variant='contained'
                disabled={tabValue === tabs.length - 1}
                onClick={handleNextStep}
              >
                Next
              </Button>
            </div>
            <Button variant='contained' onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Shop
