import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, Form } from 'react-final-form'
import toast from 'react-hot-toast'
import { useAccount, useSignMessage } from 'wagmi'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedinIcon from '@mui/icons-material/LinkedIn'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

import MainLayout from 'layouts/MainLayout'
import MAutocomplete from 'components/Form/MAutocomplete'
import MTextField from 'components/Form/MTextField'

import { useAppDispatch } from 'app/hooks'
import { createUser } from 'slices/user'
import { setLoadingModalOpen } from 'slices/modal'
import states from 'constants/states'
import { uploadToIPFS } from 'utils'
import validate from 'utils/validator'

const Register = () => {
  const ref = useRef<any>(null)
  const [photo, setPhoto] = useState<File | null>(null)
  const navigate = useNavigate()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage({ message: 'Welcome to Smartket' })
  const dispatch = useAppDispatch()

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return

    setPhoto(e.target.files[0])
  }

  const onSubmit = async (values: any): Promise<void> => {
    if (!address) {
      toast.error('Please connect your wallet')
      return
    }

    dispatch(setLoadingModalOpen(true))

    try {
      const signature = await signMessageAsync()

      localStorage.setItem('signature', signature)

      const avatar = await uploadToIPFS('file', photo)
      const user = { ...values, walletAddress: address, avatar }

      const { payload } = await dispatch(createUser(user))

      if (!payload.success) {
        toast.error(payload.message)
      } else {
        toast.success('Successfully created your profile')
        navigate('/profile')
      }
    } catch (_) {
      toast.error('Network Error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  return (
    <MainLayout title='SMARTKET - Register'>
      <div className='container py-8'>
        <div className='grid grid-cols-4 gap-8'>
          <div
            className='group mt-10 aspect-square cursor-pointer overflow-hidden rounded border border-dashed border-gray-500 p-4 hover:border-blue-500'
            onClick={() => ref.current.click()}
          >
            {!photo ? (
              <div className='flex h-full flex-col items-center justify-center bg-gray-500 bg-opacity-20 group-hover:bg-blue-500 group-hover:bg-opacity-20'>
                <AccountBoxIcon sx={{ fontSize: 100 }} className='group-hover:text-blue-500' />
                <h5 className='mt-4 text-gray-400 group-hover:text-blue-500'>
                  Click to upload your avatar
                </h5>
              </div>
            ) : (
              <img
                src={URL.createObjectURL(photo)}
                alt=''
                className='h-full w-full rounded object-cover'
              />
            )}
            <input
              type='file'
              accept='image/*'
              className='hidden'
              ref={ref}
              onChange={handleUploadAvatar}
            />
          </div>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className='col-span-3'>
                <div className='space-y-4'>
                  <h5 className='text-gray-400'>Basic Information</h5>
                  <TextField
                    size='small'
                    label='Wallet Address'
                    disabled
                    fullWidth
                    placeholder='Please connect your wallet to fill this field'
                    InputLabelProps={{ shrink: true }}
                    value={address || ''}
                  />
                  <div className='grid grid-cols-2 gap-4'>
                    <Field name='firstName' validate={(value) => validate('firstName', value)}>
                      {(props) => (
                        <MTextField label='First Name' placeholder='First Name' {...props} />
                      )}
                    </Field>
                    <Field name='lastName' validate={(value) => validate('lastName', value)}>
                      {(props) => (
                        <MTextField label='Last Name' placeholder='Last Name' {...props} />
                      )}
                    </Field>
                    <Field name='email' validate={(value) => validate('email', value)}>
                      {(props) => (
                        <MTextField label='Email' placeholder='Email address' {...props} />
                      )}
                    </Field>
                    <Field name='phone' validate={(value) => validate('phone', value)}>
                      {(props) => <MTextField label='Phone' placeholder='Phone' {...props} />}
                    </Field>
                  </div>
                  <Field name='street' validate={(value) => validate('street', value)}>
                    {(props) => <MTextField label='Street' placeholder='Street' {...props} />}
                  </Field>
                  <div className='grid grid-cols-3 gap-4'>
                    <Field name='city' validate={(value) => validate('city', value)}>
                      {(props) => <MTextField label='City' placeholder='City' {...props} />}
                    </Field>
                    <Field name='state' validate={(value) => validate('state', value)}>
                      {(props) => (
                        <MAutocomplete
                          variant='standard'
                          label='State'
                          placeholder='Please select'
                          options={states.map((state) => state.name)}
                          {...props}
                        />
                      )}
                    </Field>
                    <Field name='zipCode' validate={(value) => validate('zipCode', value)}>
                      {(props) => <MTextField label='ZipCode' placeholder='ZipCode' {...props} />}
                    </Field>
                  </div>
                </div>
                <div className='mt-8 space-y-4'>
                  <h5 className='text-gray-400'>Social Links</h5>
                  <Field name='twitter'>
                    {(props) => (
                      <MTextField
                        variant='outlined'
                        label='Twitter'
                        placeholder='Twitter url'
                        endAdornment={
                          <InputAdornment position='end'>
                            <TwitterIcon />
                          </InputAdornment>
                        }
                        {...props}
                      />
                    )}
                  </Field>
                  <Field name='facebook'>
                    {(props) => (
                      <MTextField
                        variant='outlined'
                        label='Facebook'
                        placeholder='Facebook url'
                        endAdornment={
                          <InputAdornment position='end'>
                            <FacebookIcon />
                          </InputAdornment>
                        }
                        {...props}
                      />
                    )}
                  </Field>
                  <Field name='linkedin'>
                    {(props) => (
                      <MTextField
                        variant='outlined'
                        label='Linkedin'
                        placeholder='Linkedin url'
                        endAdornment={
                          <InputAdornment position='end'>
                            <LinkedinIcon />
                          </InputAdornment>
                        }
                        {...props}
                      />
                    )}
                  </Field>
                </div>
                <div className='ml-auto mt-12 w-fit'>
                  <Button type='submit' variant='contained'>
                    Submit My Profile
                  </Button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default Register
