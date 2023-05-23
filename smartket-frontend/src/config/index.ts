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
      },
      {
        label: 'Condo',
        to: '/create/condo',
      },
      {
        label: 'Land',
        to: '/create/land',
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
