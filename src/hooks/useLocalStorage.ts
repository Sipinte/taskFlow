import { useState, useEffect } from "react"

function useLocalStorage<T>(key: string, initialValue: T) {
  
  // Sama seperti di App.tsx — load dari localStorage saat pertama render
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  // Sama seperti di App.tsx — save setiap value berubah
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // Kembalikan seperti useState biasa — [nilai, fungsiUpdate]
  return [value, setValue] as const
}

export default useLocalStorage