import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { supabase } from '../db/supabase'

import Left from '../components/Left'
import Right from '../components/Right'
import Header from '../ui/Header'
import Layout from '../ui/Layout'
import LayoutSkeleton from '../ui/skeleton/LayoutSkeleton'

import { useUserStore } from '../stores/userStore'
import type { Content } from '../models/response'

interface Props {
  defaultInput?: string
}

function Notes ({ defaultInput = '' }: Props): JSX.Element {
  const [note, setNote] = useState<Content['content']>('')
  const [loading, setLoading] = useState<boolean | null>(null)
  const params = useParams()
  const { user } = useUserStore()

  useEffect(() => {
    if (params.noteId !== undefined) {
      async function getNote (): Promise<void> {
        try {
          setLoading(true)
          const { data, status, error } = await supabase.from('content').select('*').eq('task', params.noteId)
          if (status !== 200) throw new Error(error?.message)
          setNote(data![0].content) // eslint-disable-line @typescript-eslint/no-non-null-assertion
          return
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message)
          }
        } finally {
          setLoading(false)
        }
      }
      getNote()
    }
  }, [])

  if (loading) {
    return (
      <>
        <Header/>
        <LayoutSkeleton />
      </>
    )
  }

  return (
    <>
      {!defaultInput && <Header/>}
      <Layout
        leftCol={<Left setLocalStorage={setNote} storage={note || defaultInput} />}
        rightCol={<Right input={note || defaultInput} session={user} noteId={params.noteId}/>}
      />
    </>
  )
}

export default Notes
