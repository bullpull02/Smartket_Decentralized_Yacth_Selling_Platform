import { useAccount, useDisconnect } from 'wagmi'

import { useAppDispatch } from 'app/hooks'
import { setWalletConnectModalOpen } from 'slices/modal'
import { shortenAddress } from 'utils'

const WalletConnectButton = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const dispatch = useAppDispatch()

  const handleClick = (): void => {
    if (isConnected) {
      disconnect()
      return
    }

    dispatch(setWalletConnectModalOpen(true))
  }

  return (
    <button className='rounded bg-blue-500 px-4 py-2 shadow' onClick={handleClick}>
      {isConnected ? shortenAddress(address) : 'Connect Wallet'}
    </button>
  )
}

export default WalletConnectButton
