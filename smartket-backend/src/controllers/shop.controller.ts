import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import User, { UserRoles } from '../models/user.model'
import Shop, { ShopStatus } from '../models/shop.model'
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

	accept = async (req: Request, res: Response): Promise<any> => {
		try {
			const { id } = req.params
			const { role } = req.body

			if (role !== UserRoles.ADMIN) {
				return errorHandler(403, "You don't have permission to perform this action", res)
			}

			await Shop.update(
				{ status: ShopStatus.ACCEPTED },
				{ where: { id, status: ShopStatus.PENDING } }
			)

			const shops = await Shop.findAll()

			return res.json({ status: 200, success: true, data: { shops } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	delete = async (req: Request, res: Response): Promise<any> => {
		try {
			const { id } = req.params
			const { userId } = req.body

			await Shop.destroy({ where: { id, owner: userId } })

			return res.json({ status: 200, success: true })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}
}
