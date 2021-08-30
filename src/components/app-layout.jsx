import React, { useState } from 'react'
import { Grommet, ResponsiveContext, Box, Grid, Layer, Text, Button } from 'grommet'
import { FormClose, StatusGood } from 'grommet-icons'
import { grommet } from 'grommet/themes'
import { useTranslation } from '../utils/useTranslations'
import { log } from '../utils/firebase'
import { useMaths } from '../utils/useMaths'
import Main from './main'
import Sidebar from './sidebar'
import Header from './header'
import Controls from './controls'

const Layout = () => {
  const [sidebar, setSidebar] = useState(true)
  const { translate: t } = useTranslation()
  const { answer, getNewCalculation } = useMaths()
  const [score, setScore] = useState(0)
  const [isExploding, setIsExploding] = useState(false)
  const [open, setOpen] = useState()
  const [jiggle, setJiggle] = useState()

  const onOpen = () => {
    setOpen(true)
    setTimeout(() => {
      setOpen(undefined)
    }, 3000)
  }
  const onClose = () => setOpen(undefined)

  const scorePoint = () => setScore(prev => prev + 1)
  const showConfetti = () => {
    log('correct_answer')
    onOpen()
    setIsExploding(true)
    setTimeout(() => {
      setIsExploding(false)
      getNewCalculation()
    }, 4000)
  }

  const chooseAnswer = value => event => {
    log('choose_answer')
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
              {sidebar && <Sidebar chooseAnswer={chooseAnswer} size={size} />}
              <Main showAnswer={isExploding} jiggle={jiggle} size={size} />
              <Controls score={score} size={size} />
            </Grid>
            {open && (
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
            )
          </>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

export default Layout
