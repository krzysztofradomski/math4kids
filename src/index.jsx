import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import Spinner from './components/spinner'
const App = React.lazy(() => import('./App'))

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
    <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
