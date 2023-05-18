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
		this.router.route('/approve/:id').put(signMiddleware, this.yachtController.accept)
		this.router.route('/:id').get(signMiddleware, this.yachtController.findById)
		this.router.route('/').get(signMiddleware, this.yachtController.findAll)
		this.router
			.route('/')
			.post(signMiddleware, createValidator, this.yachtController.create)
	}
}

export default new YachtRouter().router
