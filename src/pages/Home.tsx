import { useEffect } from 'react'
import { useUserStore } from '../stores/userStore'

import Wave from '../assets/Wave'
import Header from '../ui/Header'

import { useNavigate } from 'react-router-dom'

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
      <div className='sticky top-0'>
        <Header/>
      </div>
      <h1 className='font-bold text-6xl text-center leading-[77px] text-white mt-16 p-4'>
        Toma notas de una manera elegante
        <span className='flex w-fit flex-col mx-auto items-end'>
          utilizando Markdown
          <Wave />
        </span>
      </h1>
      <div className='flex justify-center mt-16 p-4'>
        <img src='/home-preview.svg' alt='picture markdown preview' className="rounded-b-md" />
      </div>
    </>
  )
}

export default Home
