import { useEffect, useState } from 'react'

import { supabase } from '../db/supabase'

import Left from '../components/Left'
import Right from '../components/Right'
import Header from '../ui/Header'
import Layout from '../ui/Layout'
import { useLocalStorage } from '../hooks/useLocalStorage'

import { Session } from '../models/session'
import sessionMock from '../mock/session.json'

function Notes() {
  const [storage, setLocalStorage] = useLocalStorage()
  const [session, setSession] = useState<Session | null>()

  useEffect(() => {
    async function getSession() {
      try {
        if (import.meta.env.DEV) return setSession(sessionMock)
        const { data, error } = await supabase.auth.getSession()

        if (!data.session) return setSession(null)
        setSession(data.session as unknown as Session)
      } catch (error) {
        console.error(error)
      }
    }

    async function getContent() {
      if (!session) return
      try {
        const { data } = await supabase.from('content').select('*').eq('user', session.user.id)
        return data
      } catch (error) {
        console.error(error)
      }
    }
    getSession()
    // getContent()
  }, [])
  return (
    <>
      <Header session={session} />
      <Layout
        leftCol={<Left setLocalStorage={setLocalStorage as (value: string) => void} storage={storage as string} />}
        rightCol={<Right input={storage as string} session={session} />}
      />
    </>
  )
}

export default Notes
