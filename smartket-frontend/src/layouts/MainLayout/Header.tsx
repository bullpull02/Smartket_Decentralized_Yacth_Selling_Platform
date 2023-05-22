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
  // { name: 'Home', path: '/', auth: undefined },
  { name: 'Marketplace', path: '/marketplace', auth: undefined },
  { name: 'Login', path: '', auth: false },
  { name: 'Register', path: '/register', auth: false },
]

const classNames = {
  submenu: 'ml-4',
  submenuItem: 'cursor-pointer hover:opacity-80 font-medium',
}

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
    } catch (_) {
      toast.error('Network Error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  return (
    <header className='relative z-[1000] shadow backdrop-blur'>
      <div className='container'>
        <div className='flex h-20 items-center justify-between'>
          <Link to='/'>
            <img src='/images/logo.png' alt='' className='h-14 -translate-x-4' />
          </Link>
          <div className='flex items-center space-x-8'>
            <nav>
              <ul className='flex items-center space-x-8'>
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
                {isLoggedIn && (
                  <li className='group relative flex h-20 items-center justify-center'>
                    <span className='cursor-pointer hover:opacity-80'>Create</span>
                    <ul className='trans pointer-events-none absolute bottom-0 left-0 flex w-48 translate-y-full flex-col space-y-2 rounded bg-gray-800 p-4 opacity-0 shadow group-hover:pointer-events-auto group-hover:opacity-100'>
                      <li>
                        <span className='text-gray-500'>Building</span>
                        <ul className={classNames.submenu}>
                          <li>
                            <span className={classNames.submenuItem}>Condo</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span className='text-gray-500'>Condo</span>
                        <ul className={classNames.submenu}>
                          <li>
                            <span className={classNames.submenuItem}>Apartment</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span className='text-gray-500'>Land</span>
                        <ul className={classNames.submenu}>
                          <span className={classNames.submenuItem}>Official House</span>
                        </ul>
                      </li>
                      <li>
                        <span className={classNames.submenuItem}>Mall</span>
                      </li>
                      <li>
                        <span className={classNames.submenuItem}>Company Warehouse</span>
                      </li>
                      <li>
                        <span className='text-gray-500'>Business</span>
                        <ul className={classNames.submenu}>
                          <span className={classNames.submenuItem}>Shop</span>
                        </ul>
                      </li>
                      <li>
                        <span className='text-gray-500'>Personal Assets</span>
                        <ul className={classNames.submenu}>
                          <li>
                            <span className={classNames.submenuItem}>
                              <Link to='/create/yacht'>Yacht</Link>
                            </span>
                          </li>
                          <li>
                            <span className={classNames.submenuItem}>Car</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
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
