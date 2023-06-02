export interface StepComponentProps {
  yachtInfo: Record<string, any>
  setYachtInfo: (arg: Record<string, any>) => void
  photos: File[]
  setPhotos: (arg: File[]) => void
  documents: File[]
  setDocuments: (arg: File[]) => void
}
