import express from 'express'
import type { Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes'
import sequelize from './models'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (_, res: Response, next: NextFunction) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.use('/api', router)

sequelize.authenticate()

dotenv.config()

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`)
})
