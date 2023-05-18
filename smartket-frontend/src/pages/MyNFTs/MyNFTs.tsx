import { useNavigate } from 'react-router-dom'

import MainLayout from 'layouts/MainLayout'
import Yacht from 'components/Yacht'

import { useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'

const MyNFTs = () => {
  const navigate = useNavigate()
  const yachts = useAppSelector((state: RootState) => state.user.yachts)

  return (
    <MainLayout title='SMARTKET - MY NFTs'>
      <div className='container py-8'>
        <div className='grid grid-cols-4 gap-4'>
          {yachts.map((yacht, ind) => (
            <Yacht yacht={yacht} key={ind} onClick={() => navigate(`/details/yacht/${yacht.id}`)} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default MyNFTs
