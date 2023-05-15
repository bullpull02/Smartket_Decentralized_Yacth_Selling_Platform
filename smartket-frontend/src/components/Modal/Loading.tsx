import { PropagateLoader } from 'react-spinners'

import { useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'

const LoadingModal = () => {
  const loading = useAppSelector((state: RootState) => state.modal.loadingModalOpen)

  return loading ? (
    <div className='fixed inset-0 z-[2000] flex items-center justify-center backdrop-blur-sm'>
      <PropagateLoader color='#3b82f6' />
    </div>
  ) : (
    <></>
  )
}

export default LoadingModal
