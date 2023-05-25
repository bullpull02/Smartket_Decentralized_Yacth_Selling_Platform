import { useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import AddIcon from '@mui/icons-material/Add'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { StepComponentProps } from '../types'

const Photos: React.FC<StepComponentProps> = ({ photos, setPhotos }) => {
  const ref = useRef<any>(null)

  const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return

    let temp: File[] = []

    for (let i = 0; i < e.target.files.length; i++) {
      temp.push(e.target.files[i])
    }

    setPhotos([...photos, ...temp])
  }

  const handleDeletePhoto = (arg: File): void => {
    setPhotos(photos.filter((photo) => photo !== arg))
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-6 gap-4'>
        {photos.map((photo) => (
          <div className='group relative aspect-square overflow-hidden rounded'>
            <LazyLoadImage
              src={URL.createObjectURL(photo)}
              effect='blur'
              delayMethod='debounce'
              className='aspect-square object-cover'
            />
            <div className='absolute inset-0 z-10 hidden items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur group-hover:flex '>
              <DeleteForeverIcon
                fontSize='large'
                className='cursor-pointer'
                onClick={() => handleDeletePhoto(photo)}
              />
            </div>
          </div>
        ))}
        <div
          className='group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-gray-500 bg-gray-500 bg-opacity-20 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-20'
          onClick={() => ref.current.click()}
        >
          <AddIcon fontSize='large' className='group-hover:text-blue-500' />
          <span className='font-medium group-hover:text-blue-500'>Upload</span>
        </div>
      </div>
      <input
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        ref={ref}
        onChange={handleUploadPhotos}
      />
    </div>
  )
}

export default Photos
