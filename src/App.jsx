import React, { useEffect } from 'react'
import { firelog } from './utils/firebase'
import { TranslationsProvider } from './utils/useTranslations'
import { MathsProvider } from './utils/useMaths'
import Layout from './components/app-layout'

function App() {
  useEffect(() => {
    firelog('app_started')
  }, [])
  return (
    <MathsProvider>
      <TranslationsProvider>
        <Layout />
      </TranslationsProvider>
    </MathsProvider>
  )
}

export default App
