import React from 'react'
import { Box, Button, Text } from 'grommet'
import { useTranslation } from '../utils/useTranslations'
import { useMaths } from '../utils/useMaths'
import DifficultySetter from './difficulty-setter'

const Controls = ({ score }) => {
  const { getNewCalculation } = useMaths()
  const { translate: t } = useTranslation()

  return (
    <Box direction="column" style={{ position: 'absolute', bottom: '0px', right: '0px' }}>
      <Box margin="small" pad="small" background={{ color: 'brand', opacity: true }} elevation="large">
        <Text>
          {t('score')}: {score}{' '}
        </Text>
      </Box>
      <Box margin="small" pad="small" background={{ color: 'brand', opacity: true }} elevation="large">
        <Button onClick={() => getNewCalculation()} hoverIndicator>
          <Text>{t('getNewCalc')}</Text>
        </Button>
      </Box>
      <Box margin="small" pad="small" background={{ color: 'brand', opacity: true }} elevation="large">
        <DifficultySetter />
      </Box>
    </Box>
  )
}

export default Controls
