import { Router } from 'express'
import YachtController from '../controllers/yacht.controller'
import { signMiddleware } from '../middleware'
import { createValidator } from '../validators/yacht.validator'

class YachtRouter {
	router = Router()
	yachtController = new YachtController()

	constructor() {
		this.initializeRoutes()
	}

	initializeRoutes() {
		this.router
			.route('/')
			.post(signMiddleware, createValidator, this.yachtController.create)
	}
}

export default new YachtRouter().router
