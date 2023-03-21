import { useMemo, useState } from 'react'

import { supabase } from '../db/supabase'

import type { Session } from '../models/session'
import { parseRAWInput } from '../utils/utils'

import Button from './Button'

interface Props {
  input: string
  session: Session | null | undefined
  noteId: string | undefined
}

function Right ({ input, session, noteId }: Props): JSX.Element {
  const [sanitizedInput, setSanitizedInput] = useState(input)

  useMemo(() => {
    const newInput = parseRAWInput(input)
    setSanitizedInput(newInput)
  }, [input])

  async function handleSave (): Promise<void> {
    try {
      const { error, status } = await supabase.from('content').insert({ user: session?.user.id, content: sanitizedInput, task: crypto.randomUUID() })
      if (status !== 201) throw new Error(error?.message)
    } catch (error) {
      console.error(error)
    }
  }
  async function handleUpdate (): Promise<void> {
    try {
      const { error, status } = await supabase.from('content').update({ content: sanitizedInput }).eq('task', noteId)
      if (status !== 204) throw new Error(error?.message)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='min-h-[90vh] flex flex-col justify-between'>
        <div dangerouslySetInnerHTML={{ __html: sanitizedInput }}></div>

        {(noteId !== undefined && session !== null) &&
        <span className='ml-auto'>
          <Button event={async () => { await handleUpdate() }}>Actualizar</Button>
        </span>
        }
        {(noteId === undefined && session !== null) &&
        <span className='ml-auto'>
          <Button event={async () => { await handleSave() }}>Guardar</Button>
        </span> }
      </div>
    </>
  )
}

export default Right
