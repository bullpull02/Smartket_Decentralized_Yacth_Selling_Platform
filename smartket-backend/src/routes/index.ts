import express from 'express'

import user from './user.route'
import yacht from './yacht.route'

const router = express.Router()

router.use('/user', user)
router.use('/yacht', yacht)

export default router
