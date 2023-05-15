import { Sequelize } from 'sequelize-typescript'
import config from '../config/database.js'

const sequelize = new Sequelize({
	username: config.username,
	password: config.password,
	database: config.database,
	host: config.host,
	port: +config.port,
	dialect: config.dialect as any,
	models: [__dirname + '/**/*.model.{js,ts}'],
	logging: config.logging,
})

sequelize.sync()

export default sequelize
