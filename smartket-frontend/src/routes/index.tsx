import { useRoutes } from 'react-router-dom'

import { publicRoutes } from './public'

const AppRoutes = () => {
  const element = useRoutes([...publicRoutes])

  return <>{element}</>
}

export default AppRoutes
