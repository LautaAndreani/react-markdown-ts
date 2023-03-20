import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { supabase } from '../db/supabase'

import { useUserStore } from '../stores/userStore'

import type { Content } from '../models/response'

import NotesMock from '../mock/notes.json'
import { parseDate, parseRAWInput } from '../utils/utils'

import Button from '../components/Button'
import Header from '../ui/Header'

function ListNotes (): JSX.Element {
  const [listNotes, setListNotes] = useState<Content[]>([])

  const navigate = useNavigate()
  const { user } = useUserStore()
  const isLocal = import.meta.env.DEV

  useEffect(() => {
    async function getContent (): Promise<Content[] | undefined> {
      try {
        if (isLocal) {
          setListNotes(NotesMock)
          return
        }
        const { data, status, error } = await supabase.from('content').select('*').eq('user', user?.user.id)
        if (status !== 200) throw new Error(error?.message)
        const content = data as Content[]
        setListNotes(content)
        return content
      } catch (error) {
        console.error(error)
      }
    }
    getContent()
  }, [])

  useEffect(() => {
    if ((user?.user) === null) navigate('/')
  }, [user])

  function handleAddNewNote (): any {
    console.log('add new note')
  }
  return (
        <>
            <Header />
            <section className="w-3/4 mx-auto pt-10 flex justify-between">
                <h1 className="font-bold text-4xl">Tus notas</h1>
                <Button event={handleAddNewNote}>
                    <div className='flex items-center gap-2'>
                        <img src="/plus.svg" alt="icono para agregar nueva tarea" />
                        <p>Agregar nueva</p>
                    </div>
                </Button>
            </section>
            {listNotes?.map((note) => (<ul key={note.id} className="w-3/4 mx-auto flex flex-col gap-4">
                <span className='max-h-[120px] overflow-auto p-4 hover:bg-text_area transition rounded-md mt-6'>
                    <small className='my-4 text-[#a8a8a8]'>{parseDate(note.created_at)}</small>
                    <Link to={`/notes/${note.task}`} dangerouslySetInnerHTML={{ __html: parseRAWInput(note.content) }}></Link>
                </span>
            </ul>))}
        </>
  )
}

export default ListNotes
