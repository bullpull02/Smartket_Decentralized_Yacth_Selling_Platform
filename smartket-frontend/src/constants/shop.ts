export const tabs = [
  'Listing',
  'Documents',
  'Photos',
  'Properties',
  'Secure Information',
  'Highlights',
]

export enum ShopStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  LISTED = 'listed',
  DECLINED = 'declined',
  OFFERED = 'offered',
  SOLD = 'sold',
  PURCHASED = 'purchased',
}

export enum SaleConditions {
  SALE_LEASEBACK = 'Sale Leaseback',
  BUILD_TO_SUIT = 'Build to Suit',
  BUILDING_IN_SHELL_CONDITION = 'Building in Shell Condition',
  '1031_EXCHANGE' = '1031 Exchange',
  GROUND_LEASE = 'Ground Lease (Leased Fee)',
  BULK_PORTFOLIO_SALE = 'Bulk/Portfolio Sale',
  DEFERRED_MAINTENANCE = 'Deferred Maintenance',
  DISTRESS_SALE = 'Distress Sale',
  GROUD_KEASE = 'Groud Kease (Leasehold)',
  HIGH_VACANCY_PROPERTY = 'High Vacancy Property',
  LEASE_OPTION = 'Lease Option',
  REDEVELOPMENT_PROJECT = 'Redevelopment Project',
  REO_SALE = 'REO Sale',
  SHORT_SALE = 'Short Sale',
}

export const saleConditions = [
  'Sale Leaseback',
  'Build to Suit',
  'Building in Shell Condition',
  '1031 Exchange',
  'Ground Lease (Leased Fee)',
  'Bulk/Portfolio Sale',
  'Deferred Maintenance',
  'Distress Sale',
  'Groud Kease (Leasehold)',
  'High Vacancy Property',
  'Lease Option',
  'Redevelopment Project',
  'REO Sale',
  'Short Sale',
]

export const buildingStatus = ['New', 'Existing', 'Under Renovation']

export const constructionType = ['Masonry', 'Metal', 'Reinforced Concrete', 'Steel', 'Wood Frame']

export const tenancy = ['Multi', 'Single']

export const classes = ['A', 'B', 'C']

export const sprinklers = ['Dry', 'ESFR', 'Wet']

export enum SecureInformation {
  PUBLIC = 'Public',
  REGISTRATION = 'Registration',
  CONFIDENTIALITY_AGREEMENT = 'Confidentiality Agreement',
  APPROVAL_REQUIRED = 'Approval Required',
}

export const secureInformation: Record<string, any>[] = [
  {
    title: 'Public',
    description:
      'Choosing ‘Public’ gives all Users access to the information entered within the Secure Information section for this listing and does not generate Secure Leads.',
  },
  {
    title: 'Registration',
    description:
      'Users must register their contact information . User contact information will be shared as a lead.',
  },
  {
    title: 'Confidentiality Agreement',
    description: 'Users must also sign the CoStar standard electronic confidentiality agreement.',
  },
  {
    title: 'Approval Required',
    description: 'Listing contacts must approve each confidentiality agreement.',
  },
]
