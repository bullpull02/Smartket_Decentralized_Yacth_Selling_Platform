import { Column, DataType, Model, Table } from 'sequelize-typescript'

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
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	walletAddress: string

	@Column({
		type: DataType.ENUM('admin', 'user'),
		allowNull: false,
		defaultValue: 'user',
	})
	role: UserRoles

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	email: string

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
	phone: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	street: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	city: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	state: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	zipcode: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	country: string

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	})
	isBanned: boolean

	static findByEmail(email: string) {
		return User.findOne({ where: { email } })
	}

	static findByWalletAddress(walletAddress: string) {
		return User.findOne({ where: { walletAddress } })
	}
}

export default User
