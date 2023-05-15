import { Column, DataType, Model, Table } from 'sequelize-typescript'

export enum ItemStatus {
	PENDING = 'pending',
	ACCEPTED = 'accepted',
	LISTED = 'listed',
	DECLINED = 'declined',
	OFFERED = 'offered',
	SOLD = 'sold',
	PURCHASED = 'purchased',
}

@Table({
	tableName: 'yachts',
	timestamps: true,
})
class Item extends Model<Item> {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
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
	status: ItemStatus

	@Column({
		type: DataType.DOUBLE,
		allowNull: false,
		defaultValue: -1,
	})
	price: number

	@Column({
		type: DataType.DOUBLE,
		allowNull: false,
	})
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
		type: DataType.STRING,
		allowNull: true,
	})
	location: string

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	})
	mcaCertified: boolean

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	description: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	builder: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	designer: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	navalDesigner: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	exteriorDesigner: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	interiorDesigner: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	stabilizers: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	bowThruster: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	stemThruster: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	elevator: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	elevatorDecks: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	make: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	engineType: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	driveType: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	fuelType: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	engineLocation: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	model: string

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	cabins: number

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	sleeps: number

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	heads: number

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	queenBerth: number

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	kingBerth: number

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	fullBeamMaster: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	onDeckMaster: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	captainsCabin: string

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	crewSleeps: number

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	crewHeads: number

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	crewMess: number

	@Column({
		type: DataType.BOOLEAN,
		allowNull: true,
	})
	airConditioning: boolean

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	mainImage: string

	@Column({
		type: DataType.ARRAY(DataType.STRING),
		allowNull: true,
	})
	images: string[]
}

export default Item
