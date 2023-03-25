import { Navigate } from 'react-router-dom'
import { useUserStore } from '../stores/userStore'

interface Props {
  children: JSX.Element
}

function ProtectedRoute ({ children }: Props): Props['children'] {
  const { user } = useUserStore()

  if (!user?.user) {
    return <Navigate to='/' />
  }
  return children
}

export default ProtectedRoute
