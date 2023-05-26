import { Router } from 'express'
import ShopController from '../controllers/shop.controller'
import { signMiddleware } from '../middleware'
import { createValidator } from '../validators/shop.validator'

class ShopRouter {
	router = Router()
	shopController = new ShopController()

	constructor() {
		this.initializeRoutes()
	}

	initializeRoutes() {
		this.router
			.route('/')
			.post(signMiddleware, createValidator, this.shopController.create)
	}
}

export default new ShopRouter().router
