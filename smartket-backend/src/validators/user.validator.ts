import { body } from 'express-validator'

export const registerValidator = [
	body('walletAddress').exists().withMessage('Wallet address is required'),
	body('email')
		.exists()
		.withMessage('Email is required')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Invalid Email address'),
	body('firstName').exists().withMessage('First name is required'),
	body('lastName').exists().withMessage('Last name is required'),
	body('phone').exists().withMessage('Phone is required'),
]
