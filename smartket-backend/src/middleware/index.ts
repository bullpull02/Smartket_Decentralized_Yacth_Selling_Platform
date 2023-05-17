import type { Request, Response, NextFunction } from 'express'
import { ethers } from 'ethers'
import User from '../models/user.model'
import { errorHandler } from '../utils'

export const signMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const signature = req.headers['x-signature'] as string
		const walletAddress = req.headers['x-wallet-address'] as string

		if (!signature || !walletAddress) {
			return errorHandler(400, 'Unauthorized requests', res)
		}

		const recoveredAddress = ethers.utils.verifyMessage('Welcome to Smartket', signature)

		if (recoveredAddress !== walletAddress) {
			return errorHandler(400, 'Invalid signature', res)
		}

		req.body.walletAddress = walletAddress

		const userId = (await User.findByWalletAddress(walletAddress)).id

		req.body.userId = userId

		next()
	} catch (err) {
		return errorHandler(400, err.message, res)
	}
}
