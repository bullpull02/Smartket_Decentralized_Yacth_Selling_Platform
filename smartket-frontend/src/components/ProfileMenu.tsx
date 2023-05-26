import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useOnClickOutside from 'hooks/useOnClickOutside'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { cx } from 'utils'
import { logout } from 'slices/user'

const classNames = {
  li: 'trans cursor-pointer px-4 py-2 text-lg font-bold hover:bg-zinc-800',
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
          'trans absolute right-0 w-40 translate-y-full rounded bg-zinc-700 py-2',
          open
            ? 'pointer-events-auto -bottom-2 opacity-100 '
            : 'pointer-events-none bottom-0 opacity-0',
        )}
      >
        <li className={classNames.li} onClick={() => navigate('/profile')}>
          Profile
        </li>
        <li className={classNames.li} onClick={() => navigate('/my-assets')}>
          My NFTs
        </li>
        <li className={classNames.li} onClick={handleLogout}>
          Log out
        </li>
      </ul>
    </div>
  )
}

export default ProfileMenu
