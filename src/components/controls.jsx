import React from 'react'
import { Box, Button, Text } from 'grommet'
import { useTranslation } from '../utils/useTranslations'
import { useMaths } from '../utils/useMaths'
import DifficultySetter from './difficulty-setter'

const Controls = ({ score, size }) => {
  const { getNewCalculation } = useMaths()
  const { translate: t } = useTranslation()
  return (
    <Box gridArea="footer" direction={size !== 'small' ? 'column' : 'row'} flex justify="center">
      <Box justify="center" margin="small" pad="small" background={{ color: 'brand', opacity: true }} elevation="large">
        <Text size={size !== 'small' ? 'inherit' : 'xsmall'}>
          {t('score')}: {score}
        </Text>
      </Box>
      <Box justify="center" margin="small" pad="small" background={{ color: 'brand', opacity: true }} elevation="large">
        <Button onClick={() => getNewCalculation()} hoverIndicator>
          <Text size={size !== 'small' ? 'inherit' : 'xsmall'}>{t('getNewCalc')}</Text>
        </Button>
      </Box>
      <Box justify="center" margin="small" pad="small" background={{ color: 'brand', opacity: true }} elevation="large">
        <DifficultySetter size={size} />
      </Box>
    </Box>
  )
}

export default Controls
