import Checkbox from '@mui/material/Checkbox'

import { cx } from 'utils'
import { secureInformation } from 'constants/shop'
import type { StepComponentProps } from '../types'

const SecureInformationStep: React.FC<StepComponentProps> = ({ shopInfo, setShopInfo }) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {secureInformation.map((information, ind) => (
        <div
          className={cx(
            'trans cursor-pointer divide-y rounded border-2 hover:divide-blue-500 hover:border-blue-500',
            shopInfo.secureInformation === information.title
              ? 'divide-blue-500 border-blue-500'
              : 'divide-gray-500 border-gray-500',
          )}
          onClick={() =>
            setShopInfo((prev: any) => ({
              ...prev,
              secureInformation:
                prev.secureInformation === information.title ? null : information.title,
            }))
          }
          key={ind}
        >
          <div className='flex items-center justify-between px-4 py-2'>
            <h4 className='text-xl'>{information.title}</h4>
            <Checkbox checked={shopInfo.secureInformation === information.title} />
          </div>
          <p className='p-4'>{information.description}</p>
        </div>
      ))}
    </div>
  )
}

export default SecureInformationStep
