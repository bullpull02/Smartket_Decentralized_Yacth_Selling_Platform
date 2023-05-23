import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAccount, useSignMessage } from 'wagmi'

import WalletConnectButton from 'components/Button/WalletConnect'
import ProfileMenu from 'components/ProfileMenu'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { login } from 'slices/user'
import { setLoadingModalOpen } from 'slices/modal'
import { cx } from 'utils'
import { menu } from 'config'

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string>('')
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector((state: RootState) => state.user.isLoggedIn)
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage({ message: 'Welcome to Smartket' })
  const dispatch = useAppDispatch()

  const handleClickLink = (to: string): void => {
    if (to !== '') {
      navigate(to)
    } else if (to === '') {
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
                {menu.map(
                  (menuItem, ind) =>
                    (menuItem.auth === isLoggedIn || menuItem.auth === undefined) && (
                      <li
                        className='relative flex h-20 items-center'
                        onClick={() => handleClickLink(menuItem.to)}
                        onMouseOver={() => setHoveredMenu(menuItem.label)}
                        onMouseLeave={() => setHoveredMenu('')}
                        key={ind}
                      >
                        <span className='cursor-pointer'>{menuItem.label}</span>
                        <ul
                          className={cx(
                            'trans absolute bottom-0 w-fit translate-y-full divide-y divide-gray-500 bg-gray-800 shadow',
                            menuItem.submenu && hoveredMenu === menuItem.label
                              ? 'pointer-events-auto opacity-100'
                              : 'pointer-event-none opacity-0',
                          )}
                        >
                          {menuItem.submenu?.map((submenu) => (
                            <li className='group relative' key={submenu.label}>
                              <div className='cursor-pointer whitespace-nowrap px-4 py-2 hover:bg-gray-900 hover:bg-opacity-80'>
                                {submenu.label}
                              </div>
                              <ul className='trans pointer-events-none absolute right-0 top-0 translate-x-full divide-y divide-gray-500 bg-gray-800 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'>
                                {submenu.submenu?.map((subSubmenu) => (
                                  <li key={subSubmenu.label}>
                                    <div className='cursor-pointer whitespace-nowrap px-4 py-2 hover:bg-gray-900 hover:bg-opacity-80'>
                                      {subSubmenu.label}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
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
