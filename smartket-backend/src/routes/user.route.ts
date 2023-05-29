import { Router } from 'express'
import UserController from '../controllers/user.controller'
import { signMiddleware } from '../middleware'
import { registerValidator } from '../validators/user.validator'

class UserRouter {
	router = Router()
	userController = new UserController()

	constructor() {
		this.initializeRoutes()
	}

	initializeRoutes() {
		this.router.route('/login').post(signMiddleware, this.userController.login)
		this.router
			.route('/get-my-assets')
			.get(signMiddleware, this.userController.getMyAssets)
		this.router.route('/marketplace').get(this.userController.marketplace)
		this.router.route('/:id').get(this.userController.findById)
		this.router
			.route('/')
			.post(signMiddleware, registerValidator, this.userController.create)
		this.router.route('/:id').put(this.userController.update)
		this.router.route('/').delete(this.userController.delete)
	}
}

export default new UserRouter().router
