import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField/'

interface MAutocompleteProps {
  variant?: 'standard' | 'filled' | 'outlined'
  size?: 'small' | 'medium'
  label?: string
  placeholder?: string
  options?: string[]
  input: any
  meta: any
}

const MAutocomplete: React.FC<MAutocompleteProps> = ({
  variant = 'outlined',
  size = 'small',
  label = '',
  placeholder = '',
  options = [],
  input,
  meta,
}) => {
  return (
    <Autocomplete
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          size={size}
          label={label}
          error={Boolean(meta.touched && meta.error)}
          placeholder={placeholder}
          InputLabelProps={{ shrink: true }}
          helperText={meta.touched && meta.error && meta.error}
        />
      )}
      {...input}
      fullWidth
      value={undefined}
      onChange={(_, newValue) => input.onChange(newValue)}
    />
  )
}

export default MAutocomplete
