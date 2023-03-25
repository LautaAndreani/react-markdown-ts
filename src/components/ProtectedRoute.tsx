import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from '../stores/userStore'

function ProtectedRoute (): JSX.Element {
  const { user } = useUserStore()

  if (!user?.user) {
    return <Navigate to='/' />
  }
  return <Outlet />
}

export default ProtectedRoute
