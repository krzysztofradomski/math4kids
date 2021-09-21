import React from 'react'
import { Box, Button, Text } from 'grommet'
import { CONFIG } from '../utils//config'
import { useTranslation } from '../utils/useTranslations'
import { useMaths } from '../utils/useMaths'

const Header = ({ toggleSidebar, size }) => {
  const { setCalculation, calculation } = useMaths()
  const { translate: t } = useTranslation()
  const chooseCalculation = value => event => setCalculation(value)

  return (
    <Box gridArea="header" direction="row" align="center" justify="between" pad="medium" background="brand">
      <Button onClick={toggleSidebar}>
        <Text size={size}>{t('answers')}</Text>
      </Button>
      {[...Object.keys(CONFIG.calculations)].map(name => (
        <Button key={name} href="#" hoverIndicator onClick={chooseCalculation(name)}>
          <Box pad="small">
            <Text size={size} color={name === calculation ? 'accent-1' : 'inherit'}>
              {t(name)}
            </Text>
          </Box>
        </Button>
      ))}
    </Box>
  )
}

export default Header
