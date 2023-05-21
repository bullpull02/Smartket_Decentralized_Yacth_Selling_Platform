import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import User from './user.model'

export enum YachtStatus {
	PENDING = 'pending',
	ACCEPTED = 'accepted',
	LISTED = 'listed',
	DECLINED = 'declined',
	OFFERED = 'offered',
	SOLD = 'sold',
	PURCHASED = 'purchased',
}

export enum EngineType {
	POWER = 'Power',
	SAIL = 'Sail',
}

export enum Condition {
	NEW = 'New',
	USED = 'Used',
}

@Table({
	tableName: 'yachts',
	timestamps: true,
})
class Yacht extends Model<Yacht> {
	@BelongsTo(() => User, {
		onDelete: 'CASCADE',
	})
	user: User

	@ForeignKey(() => User)
	@Column
	owner: number

	@Column({
		type: DataType.ENUM(
			'pending',
			'accepted',
			'listed',
			'declined',
			'offered',
			'sold',
			'purchased'
		),
		allowNull: false,
		defaultValue: 'pending',
	})
	status: YachtStatus

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	manufacturer: string

	@Column({
		type: DataType.ENUM('Power', 'Sail'),
		allowNull: false,
		defaultValue: 'Power',
	})
	engineType: EngineType

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	year: number

	@Column({
		type: DataType.DOUBLE,
		allowNull: true,
	})
	length_inch: number

	@Column({
		type: DataType.DOUBLE,
		allowNull: false,
		defaultValue: -1,
	})
	price: number

	@Column({
		type: DataType.ENUM('New', 'Used'),
		allowNull: false,
		defaultValue: 'New',
	})
	condition: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	location: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	description: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	mainImage: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: '[]',
	})
	images: string

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	offeredBy: number
}

export default Yacht
