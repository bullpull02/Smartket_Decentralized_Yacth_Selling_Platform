import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Op } from 'sequelize'

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

	findById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params

			const shop = await Shop.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { shop } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	findAll = async (_: Request, res: Response) => {
		try {
			const shops = await Shop.findAll({ include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { shops } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	findShopsForSale = async (_: Request, res: Response) => {
		try {
			const shops = await Shop.findAll({
				where: {
					status: {
						[Op.or]: [
							{ [Op.eq]: ShopStatus.ACCEPTED },
							{ [Op.eq]: ShopStatus.LISTED },
							{ [Op.eq]: ShopStatus.OFFERED },
						],
					},
				},
				include: [{ model: User }],
			})

			return res.json({ status: 200, success: true, data: { shops } })
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

			const shops = await Shop.findAll({ include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { shops } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	decline = async (req: Request, res: Response): Promise<any> => {
		try {
			const { id } = req.params,
				{ role } = req.body

			if (role !== UserRoles.ADMIN) {
				return errorHandler(403, "You don't have permission to perform this action", res)
			}

			await Shop.update(
				{ status: ShopStatus.DECLINED },
				{ where: { id, status: ShopStatus.PENDING } }
			)

			const shops = await Shop.findAll({ include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { shops } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	list = async (req: Request, res: Response): Promise<any> => {
		try {
			const { id } = req.params
			const { userId, price } = req.body

			await Shop.update(
				{ status: ShopStatus.LISTED, price },
				{ where: { id, owner: userId, status: ShopStatus.ACCEPTED } }
			)

			const shop = await Shop.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { shop } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	buy = async (req: Request, res: Response): Promise<any> => {
		try {
			const { id } = req.params
			const { userId, seller } = req.body

			await Shop.update(
				{ status: ShopStatus.SOLD, owner: userId },
				{ where: { id, owner: seller } }
			)

			const shop = await Shop.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { shop } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	offer = async (req: Request, res: Response): Promise<any> => {
		try {
			const { id } = req.params
			const { userId, price } = req.body

			await Shop.update(
				{ status: ShopStatus.OFFERED, price, offeredBy: userId },
				{ where: { id } }
			)

			const shop = await Shop.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { shop } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	sell = async (req: Request, res: Response): Promise<any> => {
		try {
			const { id } = req.params,
				{ userId, buyer } = req.body

			await Shop.update(
				{ status: ShopStatus.SOLD, owner: buyer },
				{ where: { id, owner: userId } }
			)

			const shop = await Shop.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { shop } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	declineOffer = async (req: Request, res: Response): Promise<any> => {
		try {
			const { id } = req.params,
				{ userId } = req.body

			await Shop.update(
				{ status: ShopStatus.ACCEPTED, offeredBy: null },
				{ where: { id, owner: userId, status: ShopStatus.OFFERED } }
			)

			const shop = await Shop.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { shop } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	purchase = async (req: Request, res: Response): Promise<any> => {
		try {
			const { id } = req.params
			const { role, documents } = req.body

			if (role !== UserRoles.ADMIN) {
				return errorHandler(403, "You don't have permission to perform this action", res)
			}

			await Shop.update(
				{
					status: ShopStatus.ACCEPTED,
					documents: JSON.stringify(documents),
				},
				{ where: { id, status: ShopStatus.SOLD } }
			)

			const shops = await Shop.findAll({ include: [{ model: User }] })

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
