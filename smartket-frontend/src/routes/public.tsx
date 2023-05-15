import { lazyImport } from 'utils'

const { default: Home } = lazyImport(async () => await import('pages/Home'), 'default')
const { default: Register } = lazyImport(async () => await import('pages/Auth/Register'), 'default')
const { default: Create } = lazyImport(async () => await import('pages/Create'), 'default')

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/create', element: <Create /> },
]
