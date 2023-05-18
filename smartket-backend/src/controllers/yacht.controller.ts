import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
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

			await Yacht.update({ status: YachtStatus.ACCEPTED }, { where: { id } })

			const yachts = await Yacht.findAll({ include: [{ model: User }] })

			return res.json({ status: 200, success: true, data: { yachts } })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	delete = async (req: Request, res: Response) => {}
}
