import { StatusColor } from 'constants/yacht'
import { cx } from 'utils'

interface YachtProps {
  yacht: Record<any, any>
  onClick?: () => void
}

const Yacht: React.FC<YachtProps> = ({ yacht, onClick = () => null }) => {
  return (
    <div
      className='group relative aspect-square cursor-pointer overflow-hidden rounded-md'
      onClick={onClick}
    >
      <img
        src={`https://gateway.pinata.cloud/ipfs/${yacht.mainImage}`}
        alt=''
        className='trans h-full w-full object-cover !duration-700 group-hover:scale-125'
      />
      <h4
        className={cx(
          'absolute left-8 top-8 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-opacity-80 p-1 text-center text-sm font-bold uppercase shadow',
          StatusColor[yacht.status],
        )}
      >
        {yacht.status}
      </h4>
      <h3 className='absolute bottom-0 w-full bg-black bg-opacity-80 p-2 text-center text-xl font-bold backdrop-blur'>
        {yacht.name}
      </h3>
    </div>
  )
}

export default Yacht
