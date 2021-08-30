import { useEffect, useState, createContext, useContext } from 'react'
import { CONFIG } from './config'
import dictionary from './dictionary'

const TranlationsContext = createContext()

function TranslationsProvider({ children }) {
  const [language, setLanguage] = useState(CONFIG.language)
  useEffect(() => {
    if (window.navigator?.language) {
      const language = window.navigator.language.split('-')[0]
      setLanguage(language)
      window.document.title = dictionary.math4kids[language]
    }
  }, [])
  const value = {
    translate: key => dictionary[key]?.[language] || '...',
    setLanguage: language => {
      setLanguage(language)
      window.document.title = dictionary.math4kids[language]
    },
    language,
    languages: CONFIG.languages
  }
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
