import { useId, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { toast } from 'react-hot-toast'

import MainLayout from 'layouts/MainLayout'
import InputForm from 'components/Form/Input'

import { myClassName } from 'components/Form/Input'
import countries from 'constants/country'
import { conditions, engineTypes } from 'constants/index'
import { useAppDispatch } from 'app/hooks'
import { setLoadingModalOpen } from 'slices/modal'
import { createYacht } from 'slices/user'
import { uploadToIPFS } from 'utils'
import validate from 'utils/validator'

const Create = () => {
  const mainImageId = useId()
  const imagesId = useId()
  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [imageFiles, setImageFiles] = useState<FileList | null>(null)
  const dispatch = useAppDispatch()

  const onSubmit = async (values: any): Promise<void> => {
    if (!mainImageFile) {
      toast.error('Please upload main image')
      return
    }

    dispatch(setLoadingModalOpen(true))

    try {
      const mainImage = await uploadToIPFS('file', mainImageFile)
      const _images = []

      if (imageFiles) {
        for (let i = 0; i < imageFiles.length; i++) {
          _images.push(await uploadToIPFS('file', imageFiles[i]))
        }
      }

      const images = JSON.stringify(_images)

      values.mainImage = mainImage
      values.images = images

      const { payload } = await dispatch(createYacht(values))

      if (payload.success) {
        toast.success('Successfully created yacht, please wait for admin to approve')
      } else {
        toast.error(payload.message)
      }
    } catch (err: any) {
      toast.error(err.message)
    }

    dispatch(setLoadingModalOpen(false))
  }

  const handleUploadMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainImageFile(e.target.files && e.target.files[0])
  }

  const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFiles(e.target.files)
  }

  return (
    <MainLayout title='SMARTKET - CREATE'>
      <div className='container !max-w-4xl py-8'>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <Field name='name' validate={(value) => validate('name', value)}>
                  {(props) => <InputForm label='Vessel Name' {...props} />}
                </Field>
                <Field name='manufacturer' validate={(value) => validate('manufacturer', value)}>
                  {(props) => <InputForm label='Manufacturer' {...props} />}
                </Field>
                <Field name='engineType' validate={(value) => validate('engineType', value)}>
                  {(props) => (
                    <InputForm
                      component='select'
                      label='Engine Type'
                      options={engineTypes.map((engineType: string) => ({
                        label: engineType,
                        value: engineType,
                      }))}
                      {...props}
                    />
                  )}
                </Field>
                <Field type='number' name='year'>
                  {(props) => <InputForm label='Year' {...props} />}
                </Field>
                <Field type='number' name='length_inch'>
                  {(props) => <InputForm label='Length(inch)' {...props} />}
                </Field>
                <Field name='price'>{(props) => <InputForm label='Price' {...props} />}</Field>
                <Field name='condition' validate={(value) => validate('condition', value)}>
                  {(props) => (
                    <InputForm
                      component='select'
                      label='Condition'
                      options={conditions.map((condition: string) => ({
                        label: condition,
                        value: condition,
                      }))}
                      {...props}
                    />
                  )}
                </Field>
                <Field name='location'>
                  {(props) => (
                    <InputForm
                      component='select'
                      label='Location'
                      options={countries.map((country) => ({
                        label: country.name,
                        value: country.name,
                      }))}
                      {...props}
                    />
                  )}
                </Field>
                <div className=''>
                  <label htmlFor={mainImageId} className='text-sm'>
                    Main Image
                  </label>
                  <input
                    type='file'
                    accept='image/*'
                    id={mainImageId}
                    className={myClassName}
                    onChange={handleUploadMainImage}
                  />
                </div>
                <div className=''>
                  <label htmlFor={imagesId} className='text-sm'>
                    Preview Images
                  </label>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    id={imagesId}
                    className={myClassName}
                    onChange={handleUploadImages}
                  />
                </div>
              </div>
              <Field name='description'>
                {(props) => (
                  <InputForm component='textarea' label='Description' rows={5} {...props} />
                )}
              </Field>
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

export default Create
