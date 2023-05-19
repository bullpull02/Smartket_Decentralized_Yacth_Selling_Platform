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
		this.router.route('/decline/:id').put(signMiddleware, this.yachtController.decline)
		this.router.route('/list/:id').put(signMiddleware, this.yachtController.list)
		this.router.route('/buy/:id').put(signMiddleware, this.yachtController.buy)
		this.router.route('/purchase/:id').put(signMiddleware, this.yachtController.purchase)
		this.router
			.route('/marketplace')
			.get(signMiddleware, this.yachtController.getYachtsForSale)
		this.router.route('/:id').get(signMiddleware, this.yachtController.findById)
		this.router.route('/').get(signMiddleware, this.yachtController.findAll)
		this.router
			.route('/')
			.post(signMiddleware, createValidator, this.yachtController.create)
	}
}

export default new YachtRouter().router
