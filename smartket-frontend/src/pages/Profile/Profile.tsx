import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import PlaceIcon from '@mui/icons-material/Place'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedinIcon from '@mui/icons-material/LinkedIn'

import MainLayout from 'layouts/MainLayout'

import { useAppSelector } from 'app/hooks'
import { type RootState } from 'app/store'
import states from 'constants/states'

const Profile = () => {
  const user = useAppSelector((state: RootState) => state.user.user)

  return (
    <MainLayout title='SMARTKET - MY PROFILE'>
      <div className='container py-8'>
        <div className='flex items-center justify-center gap-8'>
          <img
            src={`https://gateway.pinata.cloud/ipfs/${user.avatar}`}
            alt=''
            className='h-80 w-80 rounded object-cover'
          />
          <div className='space-y-4'>
            <h5 className='text-2xl font-medium'>
              {user.firstName} {user.lastName}
            </h5>
            <div className='space-y-2'>
              <div className='group flex items-center space-x-2'>
                <MailOutlineIcon fontSize='large' />
                <span>{user.email}</span>
              </div>
              <div className='group flex items-center space-x-2'>
                <PhoneAndroidIcon fontSize='large' />
                <span>{user.phone}</span>
              </div>
              <div className='group flex items-center space-x-2'>
                <PlaceIcon fontSize='large' />
                <span>{`${user.street}, ${user.city}, ${
                  states.filter((state) => state.name === user.state)?.[0].code
                } ${user.zipCode}`}</span>
              </div>
              <Link to={user.twitter} target='_blank' className='group flex items-center space-x-2'>
                <TwitterIcon fontSize='large' className='group-hover:text-blue-500' />
                <span className='group-hover:text-blue-500'>{user.twitter}</span>
              </Link>
              <Link
                to={user.facebook}
                target='_blank'
                className='group flex items-center space-x-2'
              >
                <FacebookIcon fontSize='large' className='group-hover:text-blue-500' />
                <span className='group-hover:text-blue-500'>{user.facebook}</span>
              </Link>
              <Link
                to={user.linkedin}
                target='_blank'
                className='group flex items-center space-x-2'
              >
                <LinkedinIcon fontSize='large' className='group-hover:text-blue-500' />
                <span className='group-hover:text-blue-500'>{user.linkedin}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='mx-auto mt-8 flex w-fit gap-4'>
          <Link to='/marketplace'>
            <Button variant='outlined'>Go to marketplace</Button>
          </Link>
          <Button variant='contained'>Update my profile</Button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Profile
