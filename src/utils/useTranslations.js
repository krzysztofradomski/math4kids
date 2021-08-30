import { useEffect, createContext, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { CONFIG } from './config'
import dictionary from './dictionary'

const TranlationsContext = createContext()

function TranslationsProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('language', '')
  const languages = CONFIG.languages
  useEffect(() => {
    let currentLanguage
    if (!language && window.navigator?.language) {
      currentLanguage = window.navigator.language || CONFIG.language
      setLanguage(currentLanguage)
    } else if (language) {
      currentLanguage = language
      setLanguage(currentLanguage)
    }
    window.document.title = dictionary.math4kids[currentLanguage]
  }, [language, setLanguage])

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
