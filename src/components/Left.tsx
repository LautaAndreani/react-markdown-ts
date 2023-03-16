type Props = {
  setLocalStorage: (value: string) => void
  storage: string
}

function Left({ setLocalStorage, storage }: Props) {
  return (
    <>
      <textarea
        className='min-w-full min-h-[90vh] resize-none bg-text_area rounded-xl p-4 outline-none'
        onChange={(e) => setLocalStorage(e.target.value)}
        defaultValue={storage}
        placeholder='Empieza a escribir aquí'
        autoFocus
      ></textarea>
    </>
  )
}

export default Left
