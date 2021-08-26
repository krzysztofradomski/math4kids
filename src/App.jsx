import React from 'react';
import './utils/firebase';
import { TranslationsProvider } from './utils/useTranslations'
import { MathsProvider } from './utils/useMaths'
import Layout from './components/app-layout'

function App() {
  return (
    <MathsProvider>
    <TranslationsProvider>
      <Layout />
    </TranslationsProvider>
    </MathsProvider>
  );
}

export default App;
