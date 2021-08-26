import React, { useEffect } from 'react';
import { log }  from './utils/firebase';
import { TranslationsProvider } from './utils/useTranslations'
import { MathsProvider } from './utils/useMaths'
import Layout from './components/app-layout'

function App() {
  useEffect(() => {
    log("app_started");
  }, [])
  return (
    <MathsProvider>
    <TranslationsProvider>
      <Layout />
    </TranslationsProvider>
    </MathsProvider>
  );
}

export default App;
