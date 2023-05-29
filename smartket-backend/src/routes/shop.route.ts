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
		this.router.route('/approve/:id').put(signMiddleware, this.shopController.accept)
		this.router.route('/decline/:id').put(signMiddleware, this.shopController.decline)
		this.router.route('/list/:id').put(signMiddleware, this.shopController.list)
		this.router.route('/buy/:id').put(signMiddleware, this.shopController.buy)
		this.router.route('/purchase/:id').put(signMiddleware, this.shopController.purchase)
		this.router.route('/offer/:id').put(signMiddleware, this.shopController.offer)
		this.router.route('/sell/:id').put(signMiddleware, this.shopController.sell)
		this.router
			.route('/decline-offer/:id')
			.put(signMiddleware, this.shopController.declineOffer)
		this.router.route('/marketplace').get(this.shopController.findShopsForSale)
		this.router.route('/:id').get(this.shopController.findById)
		this.router.route('/:id').delete(signMiddleware, this.shopController.delete)
		this.router.route('/').get(signMiddleware, this.shopController.findAll)
		this.router
			.route('/')
			.post(signMiddleware, createValidator, this.shopController.create)
	}
}

export default new ShopRouter().router
