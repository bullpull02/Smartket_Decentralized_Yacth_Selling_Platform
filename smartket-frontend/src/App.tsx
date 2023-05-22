import { Suspense } from 'react'
import { createClient, configureChains, mainnet, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Toaster } from 'react-hot-toast'

import AppRoutes from 'routes'
import Modal from 'components/Modal'
import { PropagateLoader } from 'react-spinners'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY || '' }), publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.REACT_APP_PROJECT_ID || '',
      },
    }),
  ],
  provider,
  webSocketProvider,
})

const App = () => {
  return (
    <>
      <WagmiConfig client={client}>
        <Suspense
          fallback={
            <div className='fixed inset-0 flex items-center justify-center backdrop-blur'>
              <PropagateLoader color='#3b82f6' />
            </div>
          }
        >
          <AppRoutes />
        </Suspense>
        <Modal />
        <Toaster position='top-right' reverseOrder={false} />
      </WagmiConfig>
    </>
  )
}

export default App
