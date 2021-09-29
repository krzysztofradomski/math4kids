import React, { useState } from 'react'
import { Grommet, ResponsiveContext, Box, Grid, Layer, Text, Button } from 'grommet'
import { FormClose, StatusGood } from 'grommet-icons'
import { grommet } from 'grommet/themes'
import { useTranslation } from '../utils/useTranslations'
import { firelog } from '../utils/firebase'
import { useMaths } from '../utils/useMaths'
import Main from './main'
import Answers from './answers'
import Header from './header'
import Controls from './controls'

const Layout = () => {
  const [sidebar, setSidebar] = useState(true)
  const { translate: t } = useTranslation()
  const { answer, getNewCalculation } = useMaths()
  const [score, setScore] = useState(0)
  const [isExploding, setIsExploding] = useState(false)
  const [toast, setToast] = useState(false)
  const [jiggle, setJiggle] = useState(false)

  const onOpen = () => {
    setToast(true)
    setTimeout(() => {
      setToast(false)
    }, 2000)
  }
  const onClose = () => setToast(false)

  const scorePoint = () => setScore(prev => prev + 1)
  const showConfetti = () => {
    firelog('correct_answer')
    onOpen()
    setIsExploding(true)
    setTimeout(() => {
      setIsExploding(false)
      getNewCalculation()
    }, 2000)
  }

  const chooseAnswer = value => event => {
    firelog('choose_answer')
    if (value === answer) {
      scorePoint()
      showConfetti()
    } else {
      window.navigator.vibrate(200)
      setJiggle(true)
      setTimeout(() => {
        setJiggle(false)
      }, 100)
    }
  }

  const toggleSidebar = () => setSidebar(prev => !prev)

  return (
    <Grommet full theme={grommet}>
      <ResponsiveContext.Consumer>
        {size => (
          <>
            <Grid
              fill
              rows={['auto', 'auto', 'flex']}
              columns={['auto', 'flex']}
              areas={[
                ['header', 'header'],
                ['sidebar', 'main'],
                ['sidebar', 'main'],
                ['sidebar', 'footer'],
                ['sidebar', 'bottom']
              ]}
            >
              <Header toggleSidebar={toggleSidebar} size={size} />
              {sidebar && <Answers chooseAnswer={chooseAnswer} size={size} />}
              <Main showAnswer={isExploding} jiggle={jiggle} size={size} />
              <Controls score={score} size={size} />
            </Grid>
            {toast && (
              <Layer
                position="bottom"
                modal={false}
                margin={{ vertical: 'medium', horizontal: 'small' }}
                onEsc={onClose}
                responsive={false}
                plain
              >
                <Box
                  align="center"
                  direction="row"
                  gap="small"
                  justify="between"
                  round="medium"
                  elevation="medium"
                  pad={{ vertical: 'medium', horizontal: 'small' }}
                  background="status-ok"
                >
                  <Box align="center" direction="row" gap="medium">
                    <StatusGood />
                    <Text>{t('correct')}</Text>
                  </Box>
                  <Button icon={<FormClose />} onClick={onClose} plain />
                </Box>
              </Layer>
            )}
          </>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

export default Layout
