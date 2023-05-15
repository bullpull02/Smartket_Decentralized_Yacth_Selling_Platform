import { useId } from 'react'

import { cx } from 'utils'

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  component?: 'input' | 'textarea' | 'select'
  className?: string
  label: string
  input: any
  meta: any
  rows?: number
  options?: { label: string; value: string }[]
}

const InputForm: React.FC<InputFormProps> = ({
  component = 'input',
  className = '',
  label,
  input,
  meta,
  rows,
  options,
  ...props
}) => {
  const id = useId()

  const myClassName =
    'bg-transparent border border-gray-500 px-3 py-2 rounded outline-none w-full focus:border-gray-300 trans'

  return (
    <div className={cx('w-full', className)}>
      <label htmlFor={id} className='text-sm'>
        {label}
      </label>
      {component === 'input' && <input id={id} className={myClassName} {...input} {...props} />}
      {component === 'textarea' && (
        <textarea id={id} rows={rows} className={myClassName} {...input} {...props} />
      )}
      {component === 'select' && (
        <select id={id} className={cx(myClassName, 'appearance-none')} {...input} {...props}>
          <option value='' disabled></option>
          {options?.map((option, ind) => (
            <option value={option.value} className='text-black' key={ind}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {meta.touched && meta.error && <span className='text-xs text-red-500'>{meta.error}</span>}
    </div>
  )
}

export default InputForm
