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
    setHoveredMenu('')
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
    <header className='sticky top-0 z-[1000] shadow backdrop-blur'>
      <div className='container'>
        <div className='flex h-16 items-center justify-between'>
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
                        className='relative flex h-16 items-center'
                        onMouseLeave={() => setHoveredMenu('')}
                        key={ind}
                      >
                        <span
                          className='cursor-pointer hover:opacity-80'
                          onMouseOver={() => setHoveredMenu(menuItem.label)}
                          onClick={() => handleClickLink(menuItem.to)}
                        >
                          {menuItem.label}
                        </span>
                        <ul
                          className={cx(
                            'trans absolute bottom-0 left-0 w-fit translate-y-full divide-y divide-gray-500 divide-opacity-20 border border-gray-800 bg-gray-800 shadow',
                            menuItem.submenu && hoveredMenu === menuItem.label
                              ? 'pointer-events-auto opacity-100'
                              : 'pointer-events-none opacity-0',
                          )}
                        >
                          {menuItem.submenu?.map((submenu) => (
                            <li className='group relative' key={submenu.label}>
                              <div
                                className='cursor-pointer whitespace-nowrap px-3 py-2 text-sm hover:bg-gray-900 hover:bg-opacity-80'
                                onClick={() => handleClickLink(submenu.to)}
                              >
                                {submenu.label}
                              </div>
                              <ul className='trans pointer-events-none absolute right-0 top-0 translate-x-full divide-y divide-gray-500 divide-opacity-20 bg-gray-800 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'>
                                {submenu.submenu?.map((subSubmenu) => (
                                  <li key={subSubmenu.label}>
                                    <div
                                      className='cursor-pointer whitespace-nowrap px-3 py-2 text-sm shadow hover:bg-gray-900 hover:bg-opacity-80'
                                      onClick={() => handleClickLink(subSubmenu.to)}
                                    >
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
