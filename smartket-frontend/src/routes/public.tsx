import { lazyImport } from 'utils'

const { default: Register } = lazyImport(async () => await import('pages/Auth/Register'), 'default')
const { default: CreateShop } = lazyImport(
  async () => await import('pages/Create/Business/Shop'),
  'default',
)
const { default: CreateYacht } = lazyImport(
  async () => await import('pages/Create/PersonalAssets/Yacht'),
  'default',
)
const { default: ShopDetail } = lazyImport(
  async () => await import('pages/Details/Business/Shop'),
  'default',
)
const { default: YachtDetail } = lazyImport(
  async () => await import('pages/Details/PersonalAssets/Yacht'),
  'default',
)
const { default: Marketplace } = lazyImport(
  async () => await import('pages/Marketplace'),
  'default',
)
const { default: MyAssets } = lazyImport(async () => await import('pages/MyAssets'), 'default')
const { default: Profile } = lazyImport(async () => await import('pages/Profile'), 'default')
const { default: ComingSoon } = lazyImport(async () => await import('pages/ComingSoon'), 'default')

const { default: ShopManagement } = lazyImport(
  async () => await import('pages/Admin/Management/Assets/Business/Shop'),
  'default',
)
const { default: YachtManagement } = lazyImport(
  async () => await import('pages/Admin/Management/Assets/PersonalAssets/Yacht/'),
  'default',
)

export const publicRoutes = [
  { path: '/', element: <Marketplace /> },
  { path: '/register', element: <Register /> },
  { path: '/create', element: <ComingSoon /> },
  { path: '/create/building', element: <ComingSoon /> },
  { path: '/create/building/condo', element: <ComingSoon /> },
  { path: '/create/condo', element: <ComingSoon /> },
  { path: '/create/condo/apartment', element: <ComingSoon /> },
  { path: '/create/land', element: <ComingSoon /> },
  { path: '/create/land/official-space', element: <ComingSoon /> },
  { path: '/create/mall', element: <ComingSoon /> },
  { path: '/create/company-warehouse', element: <ComingSoon /> },
  { path: '/create/business', element: <ComingSoon /> },
  { path: '/create/business/shop', element: <CreateShop /> },
  { path: '/create/personal-assets', element: <ComingSoon /> },
  { path: '/create/personal-assets/yacht', element: <CreateYacht /> },
  { path: '/create/personal-assets/car', element: <ComingSoon /> },
  { path: '/details/shop/:id', Element: <ShopDetail /> },
  { path: '/details/yacht/:id', element: <YachtDetail /> },
  { path: '/marketplace', element: <Marketplace /> },
  { path: '/my-assets', element: <MyAssets /> },
  { path: './profile', element: <Profile /> },
  { path: '/admin/management/assets/business/shop', element: <ShopManagement /> },
  { path: '/admin/management/assets/personal-assets/yacht', element: <YachtManagement /> },
]
