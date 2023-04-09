import { useEffect } from 'react'
import { useUserStore } from '../stores/userStore'

import Wave from '../assets/Wave'
import Header from '../ui/Header'

import { useNavigate } from 'react-router-dom'
import Notes from './Notes'
import { defaultContent } from '../utils/utils'

function Home (): JSX.Element {
  const navigate = useNavigate()
  const { user, getSession } = useUserStore()

  useEffect(() => {
    getSession()
  }, [])

  useEffect(() => {
    if (user?.user) {
      navigate(`/list/${user.user.user_metadata.user_name.toLowerCase()}`)
    }
  }, [user])

  return (
    <>
      <div className='sticky top-0 z-30 backdrop-blur-sm border-b border-text_area pb-2'>
        <Header/>
      </div>
      <h1 className='font-bold text-3xl sm:text-6xl text-center leading-10 sm:leading-[77px] text-white mt-16 p-2 sm:p-4 relative z-20'>
        Toma notas de una manera elegante
        <span className='flex w-fit flex-col mx-auto items-end'>
          utilizando Markdown
          <Wave />
        </span>
        <img src="/bg-gradient.svg" className='absolute -top-[100px] -z-10 pointer-events-none h-fit w-max hidden left-12 xl:left-96 lg:flex' alt="forma degradado pagina de inicio" />
      </h1>
      <div className='flex justify-center mt-16 p-4'>
        <div className='max-h-[600px] w-full'>
          <Notes defaultInput={defaultContent} />
        </div>
      </div>
    </>
  )
}

export default Home
