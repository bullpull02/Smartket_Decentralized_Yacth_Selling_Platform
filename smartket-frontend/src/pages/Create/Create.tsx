import { Field, Form } from 'react-final-form'

import MainLayout from 'layouts/MainLayout'
import InputForm from 'components/Form/Input'

import countries from 'constants/country'

const classNames = {
  h4: 'text-lg font-bold',
}

const Create = () => {
  const onSubmit = (values: any): void => {
    console.log(values)
  }

  return (
    <MainLayout title='SMARTKET - CREATE'>
      <div className='container !max-w-4xl py-8'>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <h4 className={classNames.h4}>Overview</h4>
              <Field name='name'>{(props) => <InputForm label='Vessel Name' {...props} />}</Field>
              <Field name='manufacturer'>
                {(props) => <InputForm label='Manufacturer' {...props} />}
              </Field>
              <Field type='number' name='year'>
                {(props) => <InputForm label='Year' {...props} />}
              </Field>
              <Field type='number' name='length'>
                {(props) => <InputForm label='Length(inch)' {...props} />}
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
              <Field name='mcaCertified'>
                {(props) => <InputForm label='MCA Certified' {...props} />}
              </Field>
              <Field name='description'>
                {(props) => (
                  <InputForm component='textarea' label='Description' rows={5} {...props} />
                )}
              </Field>
              <h4 className={classNames.h4}>Design & Construction</h4>
              <Field name='builder'>{(props) => <InputForm label='Builder' {...props} />}</Field>
              <Field name='designer'>{(props) => <InputForm label='Designer' {...props} />}</Field>
              <Field name='navalDesigner'>
                {(props) => <InputForm label='Naval Designer' {...props} />}
              </Field>
              <Field name='exteriorDesigner'>
                {(props) => <InputForm label='Exterior Designer' {...props} />}
              </Field>
              <Field name='interiorDesigner'>
                {(props) => <InputForm label='InteriorDesigner' {...props} />}
              </Field>
              <Field name='stabilizers'>
                {(props) => <InputForm label='Stabilizers' {...props} />}
              </Field>
              <Field name='bowThruster'>
                {(props) => <InputForm label='Bow Thruster' {...props} />}
              </Field>
              <Field name='stemThruster'>
                {(props) => <InputForm label='Stem Thruster' {...props} />}
              </Field>
              <Field name='elevator'>{(props) => <InputForm label='Elevator' {...props} />}</Field>
              <Field type='number' name='elevatorDecks'>
                {(props) => <InputForm label='Elevator Decks' {...props} />}
              </Field>
              <h4 className={classNames.h4}>Engine</h4>
              <Field name='make'>{(props) => <InputForm label='Make' {...props} />}</Field>
              <Field name='engineType'>
                {(props) => <InputForm label='Engine Type' {...props} />}
              </Field>
              <Field name='driveType'>
                {(props) => <InputForm label='Drive Type' {...props} />}
              </Field>
              <Field name='fuelType'>{(props) => <InputForm label='Fuel Type' {...props} />}</Field>
              <Field name='engineLocation'>
                {(props) => <InputForm label='Engine Location' {...props} />}
              </Field>
              <h4 className={classNames.h4}>Generator</h4>
              <Field name='model'>{(props) => <InputForm label='Model' {...props} />}</Field>
              <h4 className={classNames.h4}>Accommodations</h4>
              <Field type='number' name='cabins'>
                {(props) => <InputForm label='Cabins' {...props} />}
              </Field>
              <Field type='number' name='sleeps'>
                {(props) => <InputForm label='Sleeps' {...props} />}
              </Field>
              <Field type='number' name='heads'>
                {(props) => <InputForm label='Heads' {...props} />}
              </Field>
              <Field type='number' name='queenBerth'>
                {(props) => <InputForm label='Queen Berth' {...props} />}
              </Field>
              <Field type='number' name='kingBerth'>
                {(props) => <InputForm label='King Berth' {...props} />}
              </Field>
              <Field name='fullBeamMaster'>
                {(props) => <InputForm label='Full Beam Master' {...props} />}
              </Field>
              <Field name='onDeckMaster'>
                {(props) => <InputForm label='On Deck Master' {...props} />}
              </Field>
              <Field name='captainsCabin'>
                {(props) => <InputForm label='Captains Cabin' {...props} />}
              </Field>
              <Field type='number' name='crewSleeps'>
                {(props) => <InputForm label='Crew Sleeps' {...props} />}
              </Field>
              <Field type='number' name='crewHeads'>
                {(props) => <InputForm label='Crew Heads' {...props} />}
              </Field>
              <Field type='number' name='crewMess'>
                {(props) => <InputForm label='Crew Mess' {...props} />}
              </Field>
              <Field name='airConditioning'>
                {(props) => <InputForm label='Air Conditioning' {...props} />}
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
