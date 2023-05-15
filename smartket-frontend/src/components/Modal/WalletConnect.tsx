import { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { ClipLoader } from 'react-spinners'

import ModalWrapper from 'components/Wrapper/Modal'
import { ReactComponent as MetamaskIcon } from 'icons/metamask.svg'
import { ReactComponent as CoinbaseIcon } from 'icons/coinbase.svg'
import { ReactComponent as WalletConnectIcon } from 'icons/walletconnect.svg'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { setWalletConnectModalOpen } from 'slices/modal'

const icons = [
  <MetamaskIcon className='wallet-icon' />,
  <CoinbaseIcon className='wallet-icon' />,
  <WalletConnectIcon className='wallet-icon' />,
]

const WalletConnectModal = () => {
  const { isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state: RootState) => state.modal.walletConnectModalOpen)

  useEffect(() => {
    if (isConnected) {
      closeModal()
    }
  }, [isConnected]) //eslint-disable-line

  const closeModal = (): void => {
    dispatch(setWalletConnectModalOpen(false))
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal}>
      <div className='wallet-connect-modal grid w-80 space-y-4 rounded bg-background p-4 shadow'>
        {connectors.map((connector, ind) => (
          <div
            className='flex cursor-pointer items-center space-x-4 rounded bg-zinc-600 px-4 py-2 text-xl'
            onClick={() => (!connector.ready ? null : connect({ connector }))}
            key={connector.id}
          >
            {icons[ind]}
            <span>
              {connector.name}
              {!connector.ready && ' (unsupported)'}
            </span>
            {isLoading && connector.id === pendingConnector?.id && (
              <ClipLoader className='!h-6 !w-6' />
            )}
          </div>
        ))}

        {error && <div>{error.message}</div>}
      </div>
    </ModalWrapper>
  )
}

export default WalletConnectModal
