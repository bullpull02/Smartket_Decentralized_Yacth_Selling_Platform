import { lazyImport } from 'utils'

const { default: Home } = lazyImport(async () => await import('pages/Home'), 'default')
const { default: Register } = lazyImport(async () => await import('pages/Auth/Register'), 'default')
const { default: CreateYacht } = lazyImport(
  async () => await import('pages/Create/Yacht'),
  'default',
)
const { default: MyNFTs } = lazyImport(async () => await import('pages/MyNFTs'), 'default')
const { default: YachtDetail } = lazyImport(
  async () => await import('pages/Details/Yacht'),
  'default',
)

const { default: YachtManagement } = lazyImport(
  async () => await import('pages/Admin/Management/Yacht'),
  'default',
)

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/create/yacht', element: <CreateYacht /> },
  { path: '/my-nfts', element: <MyNFTs /> },
  { path: '/details/yacht/:id', element: <YachtDetail /> },
  { path: '/admin/management/yacht', element: <YachtManagement /> },
]
