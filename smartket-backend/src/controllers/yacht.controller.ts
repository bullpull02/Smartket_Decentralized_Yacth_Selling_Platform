import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Op } from 'sequelize'
import Yacht from '../models/yacht.model'
import User from '../models/user.model'
import { errorHandler } from '../utils'
import { YachtStatus } from '../models/yacht.model'

export default class YachtController {
	constructor() {}

	findById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params

			const yacht = await Yacht.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { yacht } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	findAll = async (_: Request, res: Response) => {
		try {
			const yachts = await Yacht.findAll({ include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { yachts } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	findYachtsForSale = async (_: Request, res: Response) => {
		try {
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

			return res.json({ status: 200, success: true, data: { yachts } })
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

			const { userId } = req.body

			await Yacht.create({ ...req.body, owner: userId })

			const yachts = await Yacht.findAll({ where: { owner: userId } })

			return res.json({ status: 201, success: true, data: { yachts } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	update = async (req: Request, res: Response) => {}

	accept = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { userId } = req.body

			await Yacht.update(
				{ status: YachtStatus.ACCEPTED },
				{ where: { id, owner: userId, status: YachtStatus.PENDING } }
			)

			const yachts = await Yacht.findAll({ include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { yachts } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	decline = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { userId } = req.body

			await Yacht.update(
				{ status: YachtStatus.DECLINED },
				{ where: { id, owner: userId, status: YachtStatus.PENDING } }
			)

			return res.json({ status: 200, success: true })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	list = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { userId, price } = req.body

			await Yacht.update(
				{ status: YachtStatus.LISTED, price },
				{ where: { id, owner: userId, status: YachtStatus.ACCEPTED } }
			)

			const yacht = await Yacht.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { yacht } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	buy = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { seller, userId } = req.body

			await Yacht.update(
				{ status: YachtStatus.SOLD, owner: userId },
				{ where: { id, status: YachtStatus.LISTED, owner: seller } }
			)

			const yacht = await Yacht.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { yacht } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	purchase = async (req: Request, res: Response) => {
		try {
			const { id } = req.params

			await Yacht.update(
				{ status: YachtStatus.PURCHASED },
				{ where: { id, status: YachtStatus.SOLD } }
			)

			return res.json({ status: 200, success: true })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	offer = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { price, userId } = req.body

			await Yacht.update(
				{ status: YachtStatus.OFFERED, price, offeredBy: userId },
				{ where: { id, status: YachtStatus.ACCEPTED } }
			)

			const yacht = await Yacht.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { yacht } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	sell = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { userId, buyer } = req.body

			await Yacht.update(
				{ owner: buyer, status: YachtStatus.SOLD },
				{ where: { id, owner: userId } }
			)

			const yacht = await Yacht.findOne({ where: { id }, include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { yacht } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	delete = async (req: Request, res: Response) => {}
}
