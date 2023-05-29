export const SERVER_URL = process.env.REACT_APP_SERVER_URL || ''

export const menu = [
  { label: 'Marketplace', to: '/marketplace', auth: undefined },
  {
    label: 'Create',
    to: '/create',
    auth: true,
    submenu: [
      {
        label: 'Building',
        to: '/create/building',
        submenu: [{ label: 'Condo', to: '/create/building/condo' }],
      },
      {
        label: 'Condo',
        to: '/create/condo',
        submenu: [{ label: 'Apartment', to: '/create/condo/apartment' }],
      },
      {
        label: 'Land',
        to: '/create/land',
        submenu: [{ label: 'Official Space', to: '/create/land/official-space' }],
      },
      {
        label: 'Mall',
        to: '/create/mall',
      },
      {
        label: 'Company Warehouse',
        to: '/create/company-warehouse',
      },
      {
        label: 'Business',
        to: '/create/business',
        submenu: [{ label: 'Shop', to: '/create/business/shop' }],
      },
      {
        label: 'Personal Assets',
        to: '/create/personal-assets',
        submenu: [
          { label: 'Yacht', to: '/create/personal-assets/yacht' },
          { label: 'Car', to: '/create/personal-assets/car' },
        ],
      },
    ],
  },
  {
    label: 'Login',
    to: '',
    auth: false,
  },
  {
    label: 'Register',
    to: '/register',
    auth: false,
  },
]

export const StatusColor: Record<any, any> = {
  pending: 'bg-red-500',
  accepted: 'bg-green-500',
  listed: 'bg-blue-500',
  declined: 'bg-gray-500',
  offered: 'bg-rose-500',
  sold: 'bg-indigo-500',
  purchased: 'bg-cyan-500',
}
