import { useRef } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close'

import { StepComponentProps } from '../types'

const Documents: React.FC<StepComponentProps> = ({ documents, setDocuments }) => {
  const ref = useRef<any>(null)

  const handleUploadDocuments = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return

    let temp: File[] = []

    for (let i = 0; i < e.target.files.length; i++) {
      temp.push(e.target.files[i])
    }

    setDocuments([...documents, ...temp])
  }

  const handleDeleteDocument = (arg: File): void => {
    setDocuments(documents.filter((document) => document !== arg))
  }

  return (
    <div className='space-y-4'>
      <div
        className='flex cursor-pointer flex-col items-center justify-center border border-dashed p-4 hover:border-blue-500'
        onClick={() => ref.current.click()}
      >
        <UploadFileIcon color='primary' className='!h-16 !w-16' />
        <span className='mt-4 text-lg font-bold text-blue-500'>Brochures and Other Documents</span>
        <span className='mt-1 text-sm text-gray-500'>Click this area to upload</span>
        <input type='file' multiple ref={ref} className='hidden' onChange={handleUploadDocuments} />
      </div>
      <div className='space-y-2'>
        {documents.map((document) => (
          <div className='flex items-center space-x-4'>
            <CloseIcon
              className='cursor-pointer hover:text-red-500'
              onClick={() => handleDeleteDocument(document)}
            />
            <p>{document.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Documents
