// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBkDVh_nM5O9eIlPAWZ16Hp-BgSCJ5jxOg',
  authDomain: 'math4kids-pwa.firebaseapp.com',
  projectId: 'math4kids-pwa',
  storageBucket: 'math4kids-pwa.appspot.com',
  messagingSenderId: '482898706169',
  appId: '1:482898706169:web:df423ae0fd5fef481c2c28',
  measurementId: 'G-0X2ZQ66HSF'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const log = eventName => logEvent(analytics, eventName)
