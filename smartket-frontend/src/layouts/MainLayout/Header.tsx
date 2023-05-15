import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAccount, useSignMessage } from 'wagmi'

import WalletConnectButton from 'components/Button/WalletConnect'
import ProfileMenu from 'components/ProfileMenu'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { login } from 'slices/user'
import { setLoadingModalOpen } from 'slices/modal'

const headerMenu: Link[] = [
  { name: 'Home', path: '/', auth: undefined },
  { name: 'Marketplace', path: '/marketplace', auth: true },
  { name: 'Create', path: '/create', auth: true },
  { name: 'Login', path: '', auth: false },
  { name: 'Register', path: '/register', auth: false },
]

const Header = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector((state: RootState) => state.user.isLoggedIn)
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage({ message: 'Welcome to Smartket' })
  const dispatch = useAppDispatch()

  const handleClickLink = (link: Link): void => {
    if (link.path !== '') {
      navigate(link.path)
      return
    }
    if (link.name === 'Login') {
      handleLogin()
    }
  }

  const handleLogin = async (): Promise<void> => {
    if (!address) {
      toast.error('Please connect your wallet')
      return
    }

    dispatch(setLoadingModalOpen(true))

    try {
      const signature = await signMessageAsync()

      localStorage.setItem('signature', signature)

      const { payload } = await dispatch(login())

      if (payload.success) {
        toast.success('Successfully logged in')
      } else {
        toast.error(payload.message)
      }
    } catch (err: any) {
      toast.error(err.message)
    }

    dispatch(setLoadingModalOpen(false))
  }

  return (
    <header className='shadow backdrop-blur'>
      <div className='container'>
        <div className='flex h-20 items-center justify-between'>
          <Link to='/'>
            <img src='/images/logo.png' alt='' className='h-14 -translate-x-4' />
          </Link>
          <div className='flex items-center space-x-8'>
            <nav>
              <ul className='flex space-x-8'>
                {headerMenu.map(
                  (item, ind) =>
                    (item.auth === isLoggedIn || item.auth === undefined) && (
                      <li
                        className='hover:opacity-80'
                        onClick={() => handleClickLink(item)}
                        key={ind}
                      >
                        <span className='cursor-pointer'>{item.name}</span>
                      </li>
                    ),
                )}
              </ul>
            </nav>
            <WalletConnectButton />
            {isLoggedIn && <ProfileMenu />}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
