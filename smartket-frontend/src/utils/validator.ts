const validate = (type: string, value: any) => {
  if (!value) return 'This field is required'

  switch (type) {
    case 'city':
      return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value) ? undefined : 'Invalid city'
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Invalid email address'
    case 'firstName':
      return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)
        ? undefined
        : 'Invalid first name'
    case 'lastName':
      return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)
        ? undefined
        : 'Invalid last name'
    case 'name':
      return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value) ? undefined : 'Invalid name'
    case 'phone':
      return /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/.test(value)
        ? undefined
        : 'Invalid phone number'
    case 'street':
      return /^[a-zA-Z0-9\s\.,#-]+$/.test(value) ? undefined : 'Invalid street' //eslint-disable-line
    case 'walletAddress':
      return value.length === 42 ? undefined : 'Invalid wallet address'
    case 'zipCode':
      return /^\d{5}(?:[-\s]\d{4})?$/.test(value) ? undefined : 'Invalid zip code'
  }
}

export default validate
