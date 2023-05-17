import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import User from '../models/user.model'
import Yacht from '../models/yacht.model'
import { errorHandler } from '../utils'
import { userInfo } from 'os'

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
			const user = await User.findOne({ where: { walletAddress } })

			if (user) {
				return errorHandler(409, 'Wallet address is already in use', res)
			}

			await User.create(req.body)

			return res.json({ status: 201, success: true })
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	update = async (req: Request, res: Response) => {}

	delete = async (req: Request, res: Response) => {}
}
