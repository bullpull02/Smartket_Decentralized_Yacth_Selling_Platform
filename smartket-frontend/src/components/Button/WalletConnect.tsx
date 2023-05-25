import Button from '@mui/material/Button'
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
    <Button variant='contained' className='!shadow-none' onClick={handleClick}>
      {isConnected ? shortenAddress(address) : 'Connect Wallet'}
    </Button>
  )
}

export default WalletConnectButton
