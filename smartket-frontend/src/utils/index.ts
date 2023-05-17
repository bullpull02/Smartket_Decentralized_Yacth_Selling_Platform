import * as React from 'react'
import axios from 'axios'

export function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(async () => await factory().then((module) => ({ default: module[name] }))),
  })
}

export const cx = (...args: any[]) => args.filter(Boolean).join(' ')

export const shortenAddress = (arg: string | undefined) => {
  if (!arg) return ''
  return `${arg.slice(0, 6)}...${arg.slice(-4)}`
}

export const uploadToIPFS = async (type: string, data: any) => {
  try {
    if (type === 'file') {
      const formData = new FormData()
      formData.append('file', data)

      const resFile = await axios({
        method: 'POST',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      return resFile.data.IpfsHash
    }
  } catch (err) {
    throw err
  }
}
