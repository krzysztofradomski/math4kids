import React, { useState } from 'react'
import { Grommet, Box, Grid, Layer, Text, Button } from 'grommet'
import { FormClose, StatusGood } from 'grommet-icons'
import { grommet } from 'grommet/themes'
import ConfettiExplosion from '@reonomy/react-confetti-explosion'
import { useTranslation } from '../utils/useTranslations'
import { log } from '../utils/firebase'
import { useMaths } from '../utils/useMaths'
import Main from './main'
import Sidebar from './sidebar'
import Header from './header'

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
    }, 3000)
  }

  const chooseAnswer = value => event => {
    log('choose_answer')
    if (value === answer) {
      scorePoint()
      showConfetti()
    } else {
      setJiggle(true)
      setTimeout(() => {
        setJiggle(false)
      }, 100)
    }
  }

  const toggleSidebar = () => setSidebar(prev => !prev)

  return (
    <Grommet full theme={grommet}>
      <Grid
        fill
        rows={['auto', 'auto', 'flex']}
        columns={['auto', 'flex']}
        areas={[
          ['header', 'header'],
          ['sidebar', 'main'],
          ['sidebar', 'main']
        ]}
      >
        <Box gridArea="header" direction="row" align="center" justify="between" pad="medium" background="brand">
          <Header toggleSidebar={toggleSidebar} score={score} />
        </Box>
        {sidebar && <Sidebar chooseAnswer={chooseAnswer} />}
        <Box
          gridArea="main"
          justify="center"
          align="center"
          animation={{ type: jiggle ? 'jiggle' : 'none', duration: 100 }}
        >
          {isExploding ? <ConfettiExplosion /> : null}
          <Main showAnswer={isExploding} />
        </Box>
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
    </Grommet>
  )
}

export default Layout
