import MainLayout from 'layouts/MainLayout'
import YachtMarketplace from './Yacht'

const Marketplace = () => {
  return (
    <MainLayout title='SMARTKET - MARKETPLACE'>
      <div className='container py-8'>
        <YachtMarketplace />
      </div>
    </MainLayout>
  )
}

export default Marketplace
