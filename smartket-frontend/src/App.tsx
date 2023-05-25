import { Suspense, useMemo } from 'react'
import { createClient, configureChains, mainnet, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
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
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: 'dark', primary: { main: '#3b82f6' }, background: { default: '#181818' } },
        typography: {
          fontFamily: 'Urbanist, sans-serif',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                fontFamily: 'Urbanist, sans-serif',
                fontSize: 16,
                textTransform: 'none',
              },
            },
          },
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: 12,
              },
            },
          },
        },
      }),
    [],
  )

  return (
    <>
      <WagmiConfig client={client}>
        <ThemeProvider theme={theme}>
          <Suspense
            fallback={
              <div className='fixed inset-0 flex items-center justify-center backdrop-blur'>
                <PropagateLoader color='#3b82f6' />
              </div>
            }
          >
            <AppRoutes />
          </Suspense>
          <CssBaseline />
        </ThemeProvider>
        <Modal />
        <Toaster position='top-right' reverseOrder={false} />
      </WagmiConfig>
    </>
  )
}

export default App
