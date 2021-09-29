import { useEffect, createContext, useContext, useState } from 'react'
import { firelog } from './firebase'
import { CONFIG } from './config'
import { shuffleArray } from './misc'

const calculations = CONFIG.calculations

const MathsContext = createContext()

function MathsProvider({ children }) {
  const [seed, setSeed] = useState(20)
  const [trigger, setTrigger] = useState(false)
  const [numbers, setNumbers] = useState([])
  const [calculation, setCalculation] = useState('add')
  const [dummyAnswers, setDummyAnswers] = useState([])
  const [answer, setAnswer] = useState(null)

  useEffect(() => {
    const [n1, n2, d1, d2] = [
      Math.floor(Math.random() * seed + 0),
      Math.floor(Math.random() * seed + 1),
      Math.floor(Math.random() * seed + 2),
      Math.floor(Math.random() * seed + 3)
    ]
    if (
      new Set([n1, n2, d1, d2]).size !== [n1, n2, d1, d2].length ||
      (calculation === 'divide' && (n1 / n2) % 1 !== 0)
    ) {
      firelog('recalculation _triggered')
      setTrigger(prev => !trigger)
    } else {
      setNumbers(prev => [n1, n2])
      setDummyAnswers(prev => [d1, d2])
      // eslint-disable-next-line no-eval
      setAnswer(eval(`${n1}${calculations[calculation]}${n2}`))
    }
  }, [setCalculation, calculation, trigger, setTrigger, seed])

  const value = {
    setCalculation,
    calculation,
    numbers,
    dummyAnswers,
    answer,
    setAnswer,
    getNewCalculation: () => setTrigger(!trigger),
    setDifficulty: difficulty => setSeed(difficulty),
    difficulty: seed,
    choices: shuffleArray([answer, ...dummyAnswers])
  }

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
