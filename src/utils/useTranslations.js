import { useEffect, createContext, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { CONFIG } from './config'
import dictionary from './dictionary'

const TranlationsContext = createContext()

let currentLanguage = CONFIG.language

function TranslationsProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('language', '')
  const languages = ['pl', 'en']
  useEffect(() => {
    if (window.navigator?.language) {
      currentLanguage = window.navigator.language
      setLanguage(currentLanguage)
      console.log('language set from browser: ', currentLanguage)
    }
  }, [language, setLanguage])
  useEffect(() => {
    currentLanguage = language || 'en'
  }, [language])
  const translate = key => dictionary[key]?.[language] || '...'
  const value = { translate, setLanguage, language, languages }
  return <TranlationsContext.Provider value={value}>{children}</TranlationsContext.Provider>
}
function useTranslation() {
  const context = useContext(TranlationsContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationsProvider')
  }
  return context
}

export { useTranslation, TranslationsProvider }
