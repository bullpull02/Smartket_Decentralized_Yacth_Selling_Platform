import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import Yacht from './yacht.model'

export enum UserRoles {
	ADMIN = 'admin',
	USER = 'user',
}

@Table({
	tableName: 'users',
	timestamps: true,
})
class User extends Model<User> {
	@Column({
		type: DataType.ENUM('admin', 'user'),
		allowNull: false,
		defaultValue: 'user',
	})
	role: UserRoles

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	walletAddress: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	avatar: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	firstName: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	lastName: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	email: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	phone: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	street: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	city: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	state: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	zipCode: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	twitter: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	facebook: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	linkedin: string

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	})
	isBanned: boolean

	@HasMany(() => Yacht)
	yachts: Yacht[]

	static findByEmail(email: string) {
		return User.findOne({ where: { email } })
	}

	static findByWalletAddress(walletAddress: string) {
		return User.findOne({ where: { walletAddress } })
	}
}

export default User
