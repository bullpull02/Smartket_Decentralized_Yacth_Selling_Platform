export interface StepComponentProps {
  shopInfo: Record<any, any>
  setShopInfo: (arg: Record<any, any>) => void
  photos: File[]
  setPhotos: (arg: File[]) => void
  documents: File[]
  setDocuments: (arg: File[]) => void
}
