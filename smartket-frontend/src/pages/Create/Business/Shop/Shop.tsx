import { useEffect, useMemo, useState } from 'react'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import MainLayout from 'layouts/MainLayout'
import Steps from './Steps'

import { tabs } from 'constants/shop'

const Shop = () => {
  const [tabValue, setTabValue] = useState<number>(0)
  const [shopInfo, setShopInfo] = useState<Record<any, any>>({})

  useEffect(() => {
    console.log(shopInfo)
  }, [shopInfo])

  const StepComponent = useMemo(() => Steps[tabValue], [tabValue])

  const handleTabChange = (_: React.SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue)
  }

  const handleNextStep = (): void => {
    setTabValue((prev) => prev + 1)
  }

  const handlePrevStep = (): void => {
    setTabValue((prev) => prev - 1)
  }

  const handleSubmit = (): void => {}

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
          <div className='min-h-[320px]'>
            <StepComponent shopInfo={shopInfo} setShopInfo={setShopInfo} />
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
