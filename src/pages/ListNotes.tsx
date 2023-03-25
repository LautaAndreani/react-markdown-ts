import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { supabase } from '../db/supabase'

import { useUserStore } from '../stores/userStore'

import type { Content } from '../models/response'

import NotesMock from '../mock/notes.json'
import { parseDate, parseRAWInput } from '../utils/utils'

import Button from '../components/Button'
import Header from '../ui/Header'
import Dropdown from '../ui/Dropdown'

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
    if (user?.user.id) getContent()
  }, [])

  useEffect(() => {
    if (!user?.user) navigate('/')
  }, [user])

  async function handleDelete (taskId: string): Promise<any> {
    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('task', taskId)
      if (error) throw new Error(error.message)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  return (
        <>
            <Header />
            <section className="w-3/4 mx-auto pt-10 flex justify-between">
                <h1 className="font-bold text-4xl">Tus notas</h1>
                <Button>
                  <Link to='/notes'>
                    <div className='flex items-center gap-2'>
                        <img src="/plus.svg" alt="icono para agregar nueva tarea" />
                        <p>Agregar nueva</p>
                    </div>
                  </Link>
                </Button>
            </section>
            {listNotes?.map((note) => (<ul key={note.id} className="w-3/4 mx-auto flex flex-col gap-2 mt-8">
              <div className='flex items-center justify-between'>
                <small className='mt-2 text-[#a8a8a8]'>
                  {parseDate(note.created_at)}
                </small>
                <Dropdown>
                  <button className="p-4 flex items-center gap-2 text-red" role="menuitem" onClick={async () => { await handleDelete(note.task) }}>
                    <img src="/trash.svg" alt="ícono para cerrar sesión" />
                      Eliminar
                  </button>
                </Dropdown>
              </div>
              <Link to={`/notes/${note.task}`} className="max-h-[120px] overflow-auto hover:bg-text_area transition rounded-md min-h-[120px] p-2">
                <span>
                    <span dangerouslySetInnerHTML={{ __html: parseRAWInput(note.content) }}></span>
                </span>
              </Link>
            </ul>))}
        </>
  )
}

export default ListNotes
