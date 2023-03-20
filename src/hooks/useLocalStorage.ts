import { useEffect, useState } from 'react'

export function useLocalStorage (): Array<string | ((value: string) => void)> {
  const [storage, setStorage] = useState('')

  function setLocalStorage (value: string): void {
    setStorage(value)
    localStorage.setItem('input', JSON.stringify(value))
  }

  useEffect(() => {
    try {
      const input = localStorage.getItem('input');
      (input !== null) ? setStorage(JSON.parse(input)) : setStorage('')
      return
    } catch (error) {
      console.log(error)
      setStorage('')
    }

    return () => {
      localStorage.clear()
    }
  }, [])

  return [storage, setLocalStorage]
}
