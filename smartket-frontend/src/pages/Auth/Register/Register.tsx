import { useNavigate } from 'react-router-dom'
import { Field, Form } from 'react-final-form'
import { useAccount, useSignMessage } from 'wagmi'
import toast from 'react-hot-toast'

import MainLayout from 'layouts/MainLayout'
import InputForm from 'components/Form/Input'

import { useAppDispatch } from 'app/hooks'
import { createUser } from 'slices/user'
import { setLoadingModalOpen } from 'slices/modal'
import validate from 'utils/validator'
import countries from 'constants/country'

const Register = () => {
  const navigate = useNavigate()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage({ message: 'Welcome to Smartket' })
  const dispatch = useAppDispatch()

  const onSubmit = async (values: any): Promise<void> => {
    if (!address) {
      toast.error('Please connect your wallet')
      return
    }

    dispatch(setLoadingModalOpen(true))

    try {
      const signature = await signMessageAsync()

      localStorage.setItem('signature', signature)

      const { payload } = await dispatch(createUser({ ...values, walletAddress: address }))

      if (!payload.success) {
        toast.error(payload.message)
      } else {
        toast.success('Successfully registered')
        navigate('/marketplace')
      }
    } catch (_) {
      toast.error('Network Error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  return (
    <MainLayout title='SMARTKET - Register'>
      <div className='container !max-w-3xl py-8'>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Field
                name='walletAddress'
                placeholder='Please connect your wallet to fill this field'
              >
                {(props) => (
                  <InputForm label='Wallet Address' value={address || ''} disabled {...props} />
                )}
              </Field>
              <div className='grid grid-cols-2 gap-4'>
                <Field name='firstName' validate={(value) => validate('', value)}>
                  {(props) => <InputForm label='First Name *' {...props} />}
                </Field>
                <Field name='lastName' validate={(value) => validate('', value)}>
                  {(props) => <InputForm label='Last Name *' {...props} />}
                </Field>
                <Field name='email' type='email' validate={(value) => validate('email', value)}>
                  {(props) => <InputForm label='Email *' {...props} />}
                </Field>
                <Field name='phone' validate={(value) => validate('phone', value)}>
                  {(props) => <InputForm label='Phone *' {...props} />}
                </Field>
              </div>
              <Field name='street'>
                {(props) => <InputForm label='Street Address' {...props} />}
              </Field>
              <div className='grid grid-cols-2 gap-4'>
                <Field name='city'>{(props) => <InputForm label='City' {...props} />}</Field>
                <Field name='state'>
                  {(props) => <InputForm label='State/Province/Region' {...props} />}
                </Field>
                <Field name='zipcode'>
                  {(props) => <InputForm label='Zip/Postal Code' {...props} />}
                </Field>
                <Field name='country'>
                  {(props) => (
                    <InputForm
                      component='select'
                      label='Country'
                      options={countries.map((country) => ({
                        label: country.name,
                        value: country.name,
                      }))}
                      {...props}
                    />
                  )}
                </Field>
              </div>
              <button type='submit' className='rounded bg-blue-500 px-4 py-2 shadow'>
                Submit
              </button>
            </form>
          )}
        />
      </div>
    </MainLayout>
  )
}

export default Register
