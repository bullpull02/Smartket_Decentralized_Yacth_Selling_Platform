import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import Yacht from '../models/yacht.model'
import { errorHandler } from '../utils'

export default class YachtController {
	constructor() {}

	findById = async (req: Request, res: Response) => {}

	create = async (req: Request, res: Response) => {
		try {
			const validator = validationResult(req)

			if (!validator.isEmpty()) {
				return errorHandler(402, validator.array()[0].msg, res)
			}

			const { userId } = req.body

			await Yacht.create({ ...req.body, owner: userId })

			return res.json({ status: 201, success: true })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	update = async (req: Request, res: Response) => {}

	delete = async (req: Request, res: Response) => {}
}
