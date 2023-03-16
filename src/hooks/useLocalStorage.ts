import { useEffect, useState } from "react"

export function useLocalStorage() {
  const [storage, setStorage] = useState("")

  function setLocalStorage(value: string): void {
    setStorage(value)
    return localStorage.setItem("input", JSON.stringify(value))
  }

  useEffect(() => {
    try {
      const input = localStorage.getItem("input")
      return input ? setStorage(JSON.parse(input)) : setStorage("")
    } catch (error) {
      console.log(error)
      setStorage("")
    }

    return () => {
      localStorage.clear()
    }
  }, [])

  return [storage, setLocalStorage]
}
