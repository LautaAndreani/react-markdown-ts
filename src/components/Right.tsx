import { useMemo, useState } from "react"
import { supabase } from "../db/supabase"
import { Session } from "../models/session"
import Button from "./Button"

type Props = {
  input: string
  session: Session | null | undefined
}

function Right({ input, session }: Props) {
  const [sanitizedInput, setSanitizedInput] = useState(input)

  useMemo(() => {
    let newInput = input

    if (newInput.includes("[]"))
      newInput = newInput.replaceAll(
        "[]",
        '<span class="inline-flex rounded w-4 -mb-1 min-w-[20px] min-h-[20px] bg-check_box-bg border-2 border-check_box-border"></span>'
      )
    if (newInput.includes("[x]"))
      newInput = newInput.replaceAll(
        "[x]",
        '<span class="inline-flex rounded w-4 -mb-1 min-w-[20px] min-h-[20px] bg-check_box-bg border-2 border-check_box-border"> <img src="/check.svg"/></span>'
      )
    if (newInput.includes("- ")) newInput = newInput.replaceAll("- ", "<li>")
    if (newInput.includes("---")) newInput = newInput.replaceAll("---", '<hr class="mb-4 text-text_area">')
    if (newInput.includes("\n")) newInput = newInput.replaceAll("\n", "<h5 class='mt-2'>")
    if (newInput.includes("#")) newInput = newInput.replaceAll("#", "<h1 class='text-3xl font-semibold tracking-wide'>")

    setSanitizedInput(newInput)
  }, [input])

  async function handleSave(input: string) {
    debugger
    try {
      const { data, error, status } = await supabase
        .from("content")
        .insert({ user: session!.user.id, content: input })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='min-h-[90vh] flex flex-col justify-between'>
        <div dangerouslySetInnerHTML={{ __html: sanitizedInput }}></div>

        <span className='ml-auto'>
          {!session  ? null : <Button event={() => handleSave(input)}>Guardar</Button>}
        </span>
      </div>
    </>
  )
}

export default Right
