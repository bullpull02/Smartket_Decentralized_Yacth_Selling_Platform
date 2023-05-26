import { body } from 'express-validator'

export const registerValidator = [
	body('walletAddress').exists().withMessage('Wallet address is required'),
	body('avatar').exists().withMessage('Avatar is required'),
	body('firstName').exists().withMessage('First name is required'),
	body('lastName').exists().withMessage('Last name is required'),
	body('email')
		.exists()
		.withMessage('Email is required')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Invalid Email address'),
	body('phone').exists().withMessage('Phone is required'),
	body('street').exists().withMessage('Street is required'),
	body('city').exists().withMessage('City is required'),
	body('state').exists().withMessage('State is required'),
	body('zipCode').exists().withMessage('ZipCode is required'),
]
