import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { supabase } from "../db/supabase"
import { Session } from "../models/session"
import Dropdown from "./Dropdown"

type Props = {
  session: Session | null | undefined
}

function Header({ session }: Props) {
  const router = useLocation()
  const navigate = useNavigate()
  const hasReviewTitle = router.pathname !== '/'

  async function handleSignIn() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      })
      if (error?.status !== 200) throw new Error(error?.message)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw new Error(error?.message)
      return navigate('/')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <header className='grid grid-cols-2 items-center py-1 w-10/12 mx-auto mt-1'>
      <Link to='/' className='flex items-center'>
        <img src='/logo.svg' alt='React markdown' />
        <h1 className='font-medium text-xl ml-2'>React Markdown</h1>
      </Link>
      <div className={`flex items-center ${hasReviewTitle ? 'justify-between' : 'justify-end'}`}>
        {hasReviewTitle && <h3 className='font-medium'>Preview</h3>}

        {session?.user.id ? (
          <div className="flex items-center">
            <p>{`Hola ! ${session.user.user_metadata.full_name}`}</p>
            <Dropdown>
              <button className="p-4 flex items-center gap-2" role="menuitem" onClick={handleSignOut}>
                <img src="/sign-out.svg" alt="ícono para cerrar sesión" />
                Cerrar sesión
              </button>
            </Dropdown>
          </div>

        ) : (
          <Button event={handleSignIn} hasIcon>
            Iniciar sesión
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
