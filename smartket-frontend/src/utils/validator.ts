const validate = (type: string, value: any) => {
  if (!value) return 'This field is required'

  switch (type) {
    case 'walletAddress':
      return value.length === 42 ? undefined : 'Invalid wallet address'
  }
}

export default validate
