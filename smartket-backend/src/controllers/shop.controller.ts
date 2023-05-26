import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import User from '../models/user.model'
import Shop from '../models/shop.model'
import { errorHandler } from '../utils'

export default class ShopController {
	constructor() {}

	create = async (req: Request, res: Response): Promise<any> => {
		try {
			const validator = validationResult(req)

			if (!validator.isEmpty()) {
				return errorHandler(402, validator.array()[0].msg, res)
			}

			const { userId, saleConditions, documents, photos, highlights } = req.body

			const shop = await Shop.create({
				...req.body,
				owner: userId,
				saleConditions: JSON.stringify(saleConditions),
				documents: JSON.stringify(documents),
				photos: JSON.stringify(photos),
				highlights: JSON.stringify(highlights),
			})

			return res.json({ status: 201, success: true, data: { shop } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}
}
