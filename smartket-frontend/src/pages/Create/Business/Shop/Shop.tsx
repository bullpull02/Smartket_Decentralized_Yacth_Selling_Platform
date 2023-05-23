import { useState } from 'react'

import MainLayout from 'layouts/MainLayout'

import { tabs } from 'constants/shop'

const Shop = () => {
  const [tab, setTab] = useState<string>(tabs[0])

  return (
    <MainLayout title='SMARTKET - CREATE SHOP'>
      <div className='container py-8'>
        <div className='flex items-center'>
          <img src='/images/shop.png' alt='' width={24} height={24} />
          <h2>Create Shop</h2>
        </div>
      </div>
    </MainLayout>
  )
}

export default Shop
