import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import Yacht from '../models/yacht.model'
import { errorHandler } from '../utils'

export default class YachtController {
	constructor() {}

	findById = async (req: Request, res: Response) => {}

	create = async (req: Request, res: Response) => {
		try {
			await Yacht.create(req.body)
		} catch (err) {
			errorHandler(500, err.message, res)
		}
	}

	update = async (req: Request, res: Response) => {}

	delete = async (req: Request, res: Response) => {}
}
