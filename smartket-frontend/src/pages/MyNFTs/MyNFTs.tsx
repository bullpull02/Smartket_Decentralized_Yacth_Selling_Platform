import MainLayout from 'layouts/MainLayout'
import Yacht from 'components/Yacht'

import { useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'

const MyNFTs = () => {
  const yachts = useAppSelector((state: RootState) => state.user.yachts)

  return (
    <MainLayout title='SMARTKET - MY NFTs'>
      <div className='container py-8'>
        <div className='grid grid-cols-3 gap-4'>
          {yachts.map((yacht, ind) => (
            <Yacht yacht={yacht} key={ind} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default MyNFTs
