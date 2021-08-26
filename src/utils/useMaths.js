import { useEffect, createContext, useContext, useState } from 'react'
import { CONFIG } from './config'

const calculations = CONFIG.calculations

const MathsContext = createContext()

function MathsProvider({ children }) {

    const [trigger, setTrigger] = useState(false)
    const [numbers, setNumbers ] = useState([])
    const [calculation, setCalculation] = useState('add')
    const [dummyAnswers, setDummyAnswers] = useState([])
    const [answer, setAnswer] = useState(null)

    useEffect(() => {
        const [n1, n2, d1, d2] = [ Math.floor(Math.random() * 13),  Math.floor(Math.random() * 13),  
        Math.floor(Math.random() * 13),  Math.floor(Math.random() * 13) ]
        if ((new Set([n1, n2, d1, d2])).size !== [n1, n2, d1, d2].length) {
            console.log('  triggered')
            setTrigger(!trigger)
        } else {
        setNumbers(prev => [n1, n2])
        setDummyAnswers(prev => [ d1, d2 ])
        // eslint-disable-next-line no-eval
        setAnswer(eval(`${n1}${calculations[calculation]}${n2}`))
        }
    }, [setCalculation, calculation, trigger, setTrigger])
    

    const value = {setCalculation, calculation, numbers, dummyAnswers, answer, setAnswer, getNewCalculation: () => setTrigger(!trigger)};

  return <MathsContext.Provider value={value}>{children}</MathsContext.Provider>
}

function useMaths() {
  const context = useContext(MathsContext)
  if (context === undefined) {
    throw new Error('useMaths must be used within a MathsProvider')
  }
  return context
}

export { useMaths, MathsProvider }
