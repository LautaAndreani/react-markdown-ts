import { createBrowserRouter } from 'react-router-dom'
import Home from '../App'
import Notes from '../ui/Notes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'notes',
    element: <Notes />,
  },
])

export default router
