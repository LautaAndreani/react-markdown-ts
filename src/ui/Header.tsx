import Button from "../components/Button"
import { supabase } from "../db/supabase"
import { Session } from "../models/session"

type Props = {
  session: Session | null | undefined
}

function Header({ session }: Props) {
  async function handleSignIn() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      })
      if (error?.status !== 200) throw new Error(error as any)
      return data
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <header className='grid grid-cols-2 items-center py-1 w-10/12 mx-auto mt-1'>
      <div className='flex items-center'>
        <img src='/logo.svg' alt='React markdown' />
        <h1 className='font-medium text-xl ml-2'>React Markdown</h1>
      </div>
      <div className='flex justify-between items-center'>
        <h3 className='font-medium'>Preview</h3>
        {session?.user ? (
          `Hola ! ${session.user.user_metadata.full_name}`
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
