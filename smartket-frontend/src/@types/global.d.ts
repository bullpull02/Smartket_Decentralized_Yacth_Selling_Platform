declare module 'react-lazy-load-image-component'

interface Register {
  walletAddress: string
  firstName: string
  lastName: string
  email: string
  phone: string
  street?: string
  city?: string
  state?: string
  zipcode?: string
  country?: string
}

interface Link {
  name: string
  path: string
  auth?: boolean | undefined
}
