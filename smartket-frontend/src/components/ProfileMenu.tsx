import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useOnClickOutside from 'hooks/useOnClickOutside'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import LogoutIcon from '@mui/icons-material/Logout'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { cx } from 'utils'
import { logout } from 'slices/user'

const classNames = {
  li: 'trans flex items-center space-x-2 cursor-pointer px-4 py-1.5 text-lg font-medium hover:bg-zinc-800',
}

const ProfileMenu = () => {
  const ref = useRef<any>(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.user.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleClickOutside = () => {
    setOpen(false)
  }

  useOnClickOutside({ ref, onClickOutside: handleClickOutside })

  return (
    <div className='relative' ref={ref}>
      <img
        src={`https://gateway.pinata.cloud/ipfs/${user.avatar}`}
        alt=''
        width={40}
        height={40}
        className='cursor-pointer rounded-full'
        onClick={() => setOpen((prev) => !prev)}
      />
      <ul
        className={cx(
          'trans absolute right-0 w-40 translate-y-full rounded bg-[#363636] py-2',
          open
            ? 'pointer-events-auto -bottom-2 opacity-100 '
            : 'pointer-events-none bottom-0 opacity-0',
        )}
      >
        <li className={classNames.li} onClick={() => navigate('/profile')}>
          <ManageAccountsIcon />
          <span>Profile</span>
        </li>
        <li className={classNames.li} onClick={() => navigate('/my-assets')}>
          <ShoppingCartCheckoutIcon />
          <span>My NFTs</span>
        </li>
        <li className={classNames.li} onClick={handleLogout}>
          <LogoutIcon />
          <span>Log out</span>
        </li>
      </ul>
    </div>
  )
}

export default ProfileMenu
