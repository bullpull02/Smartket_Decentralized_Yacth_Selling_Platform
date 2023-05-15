import { body } from 'express-validator'

export const createValidator = [
	body('name').exists().withMessage('Name is required'),
	body('manufacturer').exists().withMessage('Manufacturer is required'),
	body('mainImage').exists().withMessage('Main image is required'),
]
