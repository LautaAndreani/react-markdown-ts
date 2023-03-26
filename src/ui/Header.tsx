import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { supabase } from '../db/supabase'
import { useUserStore } from '../stores/userStore'
import Dropdown from './Dropdown'

function Header (): JSX.Element {
  const router = useLocation()
  const navigate = useNavigate()
  const hasReviewTitle = router.pathname.includes('notes')
  const { user } = useUserStore()

  async function handleSignIn (): Promise<any> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
      })
      if (error?.status !== 200) throw new Error(error?.message)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  async function handleSignOut (): Promise<any> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error != null) throw new Error(error?.message)
      navigate('/')
      return
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <header className='grid grid-cols-1 sm:grid-cols-2 items-center py-1 w-10/12 mx-auto mt-1'>
      <Link to='/' className='flex items-center'>
        <img src='/logo.svg' alt='React markdown' />
        <h1 className='font-medium text-xl ml-2'>React Markdown</h1>
      </Link>
      <div className={`flex items-center ${hasReviewTitle ? 'justify-between' : 'justify-end'}`}>
        {hasReviewTitle && <h3 className='font-medium'>Preview</h3>}

        {(user !== null)
          ? (
          <div className="flex items-center">
            <p>{`Hola ! ${user?.user.user_metadata.full_name}`}</p>
            <Dropdown>
              <button className="p-4 flex items-center gap-2" role="menuitem" onClick={handleSignOut}>
                <img src="/sign-out.svg" alt="ícono para cerrar sesión" />
                Cerrar sesión
              </button>
            </Dropdown>
          </div>

            )
          : (
          <Button event={handleSignIn} hasIcon>
            Iniciar sesión
          </Button>
            )}
      </div>
    </header>
  )
}

export default Header
