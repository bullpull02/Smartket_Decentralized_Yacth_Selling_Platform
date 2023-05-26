import TextField from '@mui/material/TextField/'

interface MTextFieldProps {
  variant?: 'standard' | 'filled' | 'outlined'
  type?: string | number
  size?: 'small' | 'medium'
  label?: string
  placeholder?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  input: any
  meta: any
}

const MTextField: React.FC<MTextFieldProps> = ({
  variant = 'standard',
  type = 'string',
  size = 'small',
  label = '',
  placeholder = '',
  startAdornment,
  endAdornment,
  input,
  meta,
}) => {
  return (
    <TextField
      variant={variant}
      type={type}
      size={size}
      label={label}
      error={Boolean(meta.touched && meta.error)}
      placeholder={placeholder}
      helperText={meta.touched && meta.error && meta.error}
      fullWidth
      {...input}
      InputLabelProps={{ shrink: true }}
      onChange={(e) => input.onChange(type === 'number' ? +e.target.value : e.target.value)}
      InputProps={{
        startAdornment: startAdornment,
        endAdornment: endAdornment,
      }}
    />
  )
}

export default MTextField
