import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAccount } from 'wagmi'

import Header from './Header'
import Footer from './Footer'

import { cx } from 'utils'

interface LayoutProps {
  className?: string
  children?: React.ReactNode
  title?: string
}

const Layout: React.FC<LayoutProps> = ({ className = '', children = <></>, title = '' }) => {
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (!isConnected || !address) return
    localStorage.setItem('walletAddress', address)
  }, [isConnected, address])

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div>
        <Header />
        <main className={cx(className)}>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
