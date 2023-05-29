import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Op } from 'sequelize'
import User from '../models/user.model'
import Shop from '../models/shop.model'
import Yacht from '../models/yacht.model'
import { ShopStatus } from '../models/shop.model'
import { YachtStatus } from '../models/yacht.model'
import { errorHandler } from '../utils'

export default class UserController {
	constructor() {}

	login = async (req: Request, res: Response) => {
		try {
			const { walletAddress } = req.body
			const user = await User.findOne({
				where: { walletAddress },
				include: [{ model: Yacht }],
			})

			if (!user) {
				return errorHandler(404, 'User not found', res)
			}

			res.json({ status: 200, success: true, data: { user } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	findById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const user = await User.findByPk(id)

			return res.json({ status: 200, success: true, data: { user } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	create = async (req: Request, res: Response) => {
		try {
			const validator = validationResult(req)

			if (!validator.isEmpty()) {
				return errorHandler(402, validator.array()[0].msg, res)
			}

			const { walletAddress } = req.body
			let user = await User.findOne({ where: { walletAddress } })

			if (user) {
				return errorHandler(409, 'Wallet address is already in use', res)
			}

			await User.create({ ...req.body, phone: req.body.phone.replace(/\D/g, '') })

			user = await User.findOne({ where: { walletAddress } })

			return res.json({ status: 201, success: true, data: { user } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	update = async (req: Request, res: Response) => {}

	delete = async (req: Request, res: Response) => {}

	getMyAssets = async (req: Request, res: Response) => {
		try {
			const { userId } = req.body

			const myAssets = await User.findByPk(userId, {
				include: [{ model: Yacht }, { model: Shop }],
			})

			return res.json({ status: 200, success: true, data: { myAssets } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	marketplace = async (req: Request, res: Response) => {
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

			const yachts = await Yacht.findAll({
				where: {
					status: {
						[Op.or]: [
							{ [Op.eq]: YachtStatus.ACCEPTED },
							{ [Op.eq]: YachtStatus.LISTED },
							{ [Op.eq]: YachtStatus.OFFERED },
						],
					},
				},
				include: [{ model: User }],
			})

			return res.json({ status: 200, success: true, data: { shops, yachts } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}
}
