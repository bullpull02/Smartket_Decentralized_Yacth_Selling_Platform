import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import User from './user.model'

export enum ShopStatus {
	PENDING = 'pending',
	ACCEPTED = 'accepted',
	LISTED = 'listed',
	DECLINED = 'declined',
	OFFERED = 'offered',
	SOLD = 'sold',
	PURCHASED = 'purchased',
}

export enum BuildingStatus {
	NEW = 'New',
	EXISTING = 'Existing',
	UNDER_RENOVATION = 'Under Renovation',
}

export enum ConstructionType {
	MASONRY = 'Masonry',
	METAL = 'Metal',
	REINFORCED_CONCRETE = 'Reinforced Concrete',
	STEEL = 'Steel',
	WOOD_FRAME = 'Wood Frame',
}

export enum Tenancy {
	MULTI = 'Multi',
	SINGLE = 'Single',
}

export enum ShopClass {
	A = 'A',
	B = 'B',
	C = 'C',
}

export enum Sprinklers {
	DRY = 'Dry',
	ESFR = 'ESFR',
	WET = 'Wet',
}

export enum AreaUnit {
	AC = 'AC',
	SF = 'SF',
}

export enum SecureInformation {
	PUBLIC = 'Public',
	REGISTRATION = 'Registration',
	CONFIDENTIALITY_AGREEMENT = 'Confidentiality Agreement',
	APPROVAL_REQUIRED = 'Approval Required',
}

@Table({
	tableName: 'shops',
	timestamps: true,
})
class Shop extends Model<Shop> {
	@BelongsTo(() => User, {
		onDelete: 'Cascade',
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
	status: ShopStatus

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
		allowNull: false,
	})
	phone: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: 'Investment',
	})
	saleType: string

	@Column({
		type: DataType.DOUBLE,
		allowNull: true,
	})
	price: number

	@Column({
		type: DataType.DOUBLE,
		allowNull: true,
	})
	grm: number

	@Column({
		type: DataType.DOUBLE,
		allowNull: true,
	})
	capRate: number

	@Column({
		type: DataType.DOUBLE,
		allowNull: true,
	})
	noi: number

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	saleConditions: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	saleNotes: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	documents: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	photos: string

	@Column({
		type: DataType.ENUM('New', 'Existing', 'Under Renovation'),
		allowNull: false,
		defaultValue: 'New',
	})
	buildingStatus: BuildingStatus

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	rba: string

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	floors: number

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	typicalFloor: number

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	yearBuilt: number

	@Column({
		type: DataType.ENUM('Masonry', 'Metal', 'Reinforced Concrete', 'Steel', 'Wood Frame'),
		allowNull: true,
	})
	constructionType: ConstructionType

	@Column({
		type: DataType.ENUM('Multi', 'Single'),
		allowNull: true,
	})
	tenancy: Tenancy

	@Column({
		type: DataType.ENUM('A', 'B', 'C'),
		allowNull: true,
	})
	class: ShopClass

	@Column({
		type: DataType.ENUM('Dry', 'ESFR', 'Wet'),
		allowNull: true,
	})
	sprinklers: Sprinklers

	@Column({
		type: DataType.DOUBLE,
		allowNull: true,
	})
	landArea: number

	@Column({
		type: DataType.ENUM('AC', 'SF'),
		allowNull: true,
	})
	landAreaUnit: AreaUnit

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	zoning: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	zoningDescription: string

	@Column({
		type: DataType.ENUM(
			'Public',
			'Registration',
			'Confidentiality Agreement',
			'Approval Required'
		),
		allowNull: true,
	})
	secureInformation: SecureInformation

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	highlights: string

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	offeredBy: number
}

export default Shop
