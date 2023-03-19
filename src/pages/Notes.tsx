import { useEffect, useState } from 'react'

import { supabase } from '../db/supabase'

import Left from '../components/Left'
import Right from '../components/Right'
import Header from '../ui/Header'
import Layout from '../ui/Layout'
import { useLocalStorage } from '../hooks/useLocalStorage'

import { useUserStore } from '../stores/userStore'
import { useNavigate } from 'react-router-dom'

function Notes() {
  const navigate = useNavigate()
  const [storage, setLocalStorage] = useLocalStorage()
  const { user } = useUserStore()

  useEffect(() => {
    async function getContent() {
      try {
        const { data, status, error } = await supabase.from('content').select('*').eq('user', user!.user.id)
        if(status !== 200) throw new Error(error?.message)
        return data
      } catch (error) {
        console.error(error)
      }
    }
    // getContent()
  }, [])

  useEffect(() => {
    if(!user?.user) return navigate('/')
  }, [user])
  return (
    <>
      <Header session={user} />
      <Layout
        leftCol={<Left setLocalStorage={setLocalStorage as (value: string) => void} storage={storage as string} />}
        rightCol={<Right input={storage as string} session={user} />}
      />
    </>
  )
}

export default Notes
