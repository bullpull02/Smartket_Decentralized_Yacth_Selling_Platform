import { body } from 'express-validator'

export const createValidator = [
	body('street').exists().withMessage('Street field is required'),
	body('city').exists().withMessage('City field is required'),
	body('state').exists().withMessage('State field is required'),
	body('zipCode')
		.exists()
		.withMessage('Zipcode field is required')
		.isString()
		.withMessage('Zipcode is invalid')
		.isLength({ min: 5, max: 5 })
		.withMessage('Zipcode must be 5 digits'),
	body('phone').exists().withMessage('Phone field is required'),
	body('saleType').optional(),
	body('price')
		.optional()
		.isNumeric()
		.withMessage('Price must be a numeric value')
		.isInt({ gt: 0 })
		.withMessage('Price must be at least 0'),
	body('grm').optional().isNumeric().withMessage('GRM must be a numeric value'),
	body('capRate').optional().isNumeric().withMessage('Cap rate must be a numeric value'),
	body('noi').optional().isNumeric().withMessage('NOI must be a numeric value'),
	body('saleConditions')
		.optional()
		.isArray()
		.withMessage('Sale conditions must be an array'),
	body('saleNotes')
		.optional()
		.isString()
		.withMessage('Sale notes must be a string value'),
	body('documents').optional().isArray().withMessage('Documents must be an array'),
	body('photos')
		.optional()
		.isArray()
		.withMessage('Photos must be an array')
		.isArray({ min: 1 })
		.withMessage("Photos can't be an empty array"),
	body('buildingStatus').exists().withMessage('Building status field is required'),
	body('rba').exists().withMessage('RBA field is required'),
	body('floors').exists().withMessage('Floors field is required'),
	body('typicalFloor').exists().withMessage('Typical floor field is required'),
	body('yearBuilt').exists().withMessage('Year built filed is required'),
	body('constructionType')
		.optional()
		.isString()
		.withMessage('Construction type must be a string'),
	body('tenancy').optional().isString().withMessage('Tenancy must be a string value'),
	body('class')
		.optional()
		.isIn(['A', 'B', 'C'])
		.withMessage('Class must be one of A, B or C'),
	body('sprinklers')
		.optional()
		.isIn(['Dry', 'ESFR', 'Wet'])
		.withMessage('Sprinklers must be one of Dry, ESFR or Wet'),
	body('landArea')
		.optional()
		.isNumeric()
		.withMessage('Land area must be a numeric value')
		.isFloat({ min: 0 })
		.withMessage('Land area must be at least 0'),
	body('landAreaUnit')
		.exists()
		.withMessage('Area unit is required')
		.isIn(['AC', 'SF'])
		.withMessage('Area unit must be one of AC or SF'),
	body('zoning').optional().isString().withMessage('Zoning must be a string value'),
	body('zoningDescription')
		.optional()
		.isString()
		.withMessage('Zoning description must be a string value'),
	body('secureInformation')
		.optional()
		.isIn(['Public', 'Registration', 'Confidentiality Agreement', 'Approval Required'])
		.withMessage('Secure information field is invalid'),
	body('highlights').optional().isArray().withMessage('Highlights must be an array'),
]
