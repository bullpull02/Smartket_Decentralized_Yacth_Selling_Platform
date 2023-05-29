import { LazyLoadImage } from 'react-lazy-load-image-component'

import { StatusColor } from 'config'
import { cx, getStatusCode } from 'utils'

interface ShopProps {
  shop: Record<any, any>
  onClick?: () => void
}

const Shop: React.FC<ShopProps> = ({ shop, onClick = () => null }) => {
  return (
    <div
      className='group relative aspect-square cursor-pointer overflow-hidden rounded-md'
      onClick={onClick}
    >
      <LazyLoadImage
        src={`https://ipfs.io/ipfs/${JSON.parse(shop.photos)[0]}`}
        effect='blur'
        delayMethod='debounce'
        className='trans h-full w-full object-cover !duration-700 group-hover:scale-125'
      />
      <h4
        className={cx(
          'absolute left-8 top-8 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 p-1 text-center text-sm font-bold uppercase shadow',
          StatusColor[shop.status],
        )}
      >
        {shop.status}
      </h4>
      <div className='absolute bottom-0 flex w-full justify-between bg-black bg-opacity-95 p-2 px-4'>
        <p className='text-sm'>
          {shop.street}
          <br />
          {shop.city}, {getStatusCode(shop.state)}
        </p>
        <p className='text-right text-sm'>
          {shop.price > 0 ? `$ ${shop.price.toLocaleString()}` : 'Call for pricing'}
          <br />
          {shop.capRate > 0 ? `${shop.capRate}% Cap Rate` : ''}
        </p>
      </div>
    </div>
  )
}

export default Shop
