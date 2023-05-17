interface YachtProps {
  yacht: Record<any, any>
}

const Yacht: React.FC<YachtProps> = ({ yacht }) => {
  return (
    <div className='group relative aspect-square cursor-pointer overflow-hidden rounded-md'>
      <img
        src={`https://gateway.pinata.cloud/ipfs/${yacht.mainImage}`}
        alt=''
        className='trans h-full w-full object-cover !duration-700 group-hover:scale-125'
      />
      <h4 className='absolute left-8 top-8 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black bg-opacity-80 p-1 text-center text-sm font-bold uppercase'>
        {yacht.status}
      </h4>
      <h3 className='absolute bottom-0 w-full bg-black bg-opacity-80 p-2 text-center text-xl font-bold backdrop-blur'>
        {yacht.name}
      </h3>
    </div>
  )
}

export default Yacht
