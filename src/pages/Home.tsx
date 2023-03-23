import { useEffect } from 'react'
import { useUserStore } from '../stores/userStore'

import Wave from '../assets/Wave'
import Header from '../ui/Header'

import { type Session } from '../models/session'
import sessionMock from '../mock/session.json'
import { supabase } from '../db/supabase'
import { useNavigate } from 'react-router-dom'

function Home (): JSX.Element {
  const navigate = useNavigate()
  const { setUserSession, user } = useUserStore()

  useEffect(() => {
    async function getSession (): Promise<any> {
      try {
        if (import.meta.env.DEV) {
          setUserSession(sessionMock)
          return
        }
        const { data } = await supabase.auth.getSession()

        if (data.session === null) {
          setUserSession(null)
          return
        }
        setUserSession(data.session as unknown as Session)
      } catch (error) {
        console.error(error)
      }
    }

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
