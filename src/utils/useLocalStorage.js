import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (!process.browser || !window) return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return initialValue
    }
  })

  const setValue = value => {
    if (!process.browser || !window) return value
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }
  return [storedValue, setValue]
}
