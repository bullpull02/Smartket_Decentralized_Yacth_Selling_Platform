import express from 'express'

import user from './user.route'
import yacht from './yacht.route'
import shop from './shop.route'

const router = express.Router()

router.use('/user', user)
router.use('/yacht', yacht)
router.use('/shop', shop)

export default router
