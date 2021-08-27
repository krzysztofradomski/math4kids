import React from 'react'
import { Box, Button, Text } from 'grommet'
import { CONFIG } from '../utils//config'
import { useTranslation } from '../utils/useTranslations'
import { useMaths } from '../utils/useMaths'
import DifficultySetter from './difficulty-setter'

const Header = ({ toggleSidebar, score }) => {
  const { setCalculation, calculation, getNewCalculation } = useMaths()
  const { translate: t } = useTranslation()
  const chooseCalculation = value => event => setCalculation(value)
  return (
    <>
      <Button onClick={toggleSidebar}>
        <Text size="large">{t('math4kids')}</Text>
      </Button>
      <Button onClick={() => getNewCalculation()}>
        <Box pad="medium">
          <Text>{t('getNewCalc')}</Text>
        </Box>
      </Button>
      <Text>
        {t('score')}: {score}{' '}
      </Text>
      <DifficultySetter />
      {[...Object.keys(CONFIG.calculations)].map(name => (
        <Button key={name} href="#" hoverIndicator onClick={chooseCalculation(name)}>
          <Box pad="small">
            <Text color={name === calculation ? 'accent-1' : 'inherit'}>{t(name)}</Text>
          </Box>
        </Button>
      ))}
    </>
  )
}

export default Header
