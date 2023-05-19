export const conditions: string[] = ['New', 'Used']

export const engineTypes: string[] = ['Power', 'Sail']

export enum YachtStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  LISTED = 'listed',
  DECLINED = 'declined',
  OFFERED = 'offered',
  SOLD = 'sold',
  PURCHASED = 'purchased',
}

export const StatusColor: Record<any, any> = {
  pending: 'bg-red-500',
  accepted: 'bg-green-500',
  listed: 'bg-blue-500',
  declined: 'red',
  offered: 'green',
  sold: 'green',
  purchased: 'green',
}
