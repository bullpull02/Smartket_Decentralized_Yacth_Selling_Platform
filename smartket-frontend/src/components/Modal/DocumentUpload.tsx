import { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close'

import ModalWrapper from 'components/Wrapper/Modal'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  onSubmit: (arg: File[]) => void
}

const DocumentUploadModal: React.FC<ModalProps> = ({ isOpen, closeModal, onSubmit }) => {
  const ref = useRef<any>(null)
  const [documents, setDocuments] = useState<File[]>([])

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
    <ModalWrapper isOpen={isOpen}>
      <div className='w-[480px] space-y-4 rounded bg-background p-4 shadow'>
        <div className='space-y-8'>
          <div
            className='flex cursor-pointer flex-col items-center justify-center border border-dashed p-4 hover:border-blue-500'
            onClick={() => ref.current.click()}
          >
            <UploadFileIcon color='primary' className='!h-16 !w-16' />
            <span className='mt-4 text-lg font-bold text-blue-500'>
              Brochures and Other Documents
            </span>
            <span className='mt-1 text-sm text-gray-500'>Click this area to upload</span>
            <input
              type='file'
              multiple
              ref={ref}
              className='hidden'
              onChange={handleUploadDocuments}
            />
          </div>
          <div className='space-y-2'>
            {documents.map((document, ind) => (
              <div className='flex items-center space-x-4' key={ind}>
                <CloseIcon
                  className='cursor-pointer hover:text-red-500'
                  onClick={() => handleDeleteDocument(document)}
                />
                <p>{document.name}</p>
              </div>
            ))}
          </div>
          <div className='ml-auto w-fit space-x-2'>
            <Button variant='outlined' color='error' onClick={closeModal}>
              Cancel
            </Button>
            <Button variant='contained' color='success' onClick={() => onSubmit(documents)}>
              Upload and purchase
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default DocumentUploadModal
