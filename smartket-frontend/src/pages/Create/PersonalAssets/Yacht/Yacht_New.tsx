import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import MainLayout from 'layouts/MainLayout'
import Steps from './Steps'

const Yacht = () => {
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [yachtInfo, setYachtInfo] = useState<Record<string, any>>({})
  const [photos, setPhotos] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])
  const StepComponent = useMemo(() => Steps[stepNumber], [stepNumber])

  const handleStepChange = (_: React.SyntheticEvent, newStepNumber: number): void => {
    setStepNumber(newStepNumber)
  }

  const handleNextStep = (): void => {
    setStepNumber((prev) => prev + 1)
  }

  const handlePrevStep = (): void => {
    setStepNumber((prev) => prev - 1)
  }

  const handleSubmit = async (): Promise<void> => {}

  return (
    <MainLayout title='SMARTKET - CREATE SHOP'>
      <div className='container py-8'></div>
    </MainLayout>
  )
}

export default Yacht
