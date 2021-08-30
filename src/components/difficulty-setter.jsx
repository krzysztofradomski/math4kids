import React from 'react'
import { Box, Button, Text } from 'grommet'
import { useMaths } from '../utils/useMaths'
import { useTranslation } from '../utils/useTranslations'

const DifficultySetter = ({ size }) => {
  const { translate: t } = useTranslation()
  const { difficulty, setDifficulty } = useMaths()
  return (
    <Box direction="row" align="center">
      <Text style={{ '&::hover': 'cursor' }} size={size !== 'small' ? 'inherit' : 'xsmall'}>
        {t('difficulty')}
      </Text>
      <Box pad="small" direction="row" align="center">
        <Button
          pad="small"
          margin={{ left: 'small' }}
          color={difficulty >= 20 ? 'accent-1' : 'inherit'}
          onClick={() => setDifficulty(20)}
          textAlign="center"
        >
          *
        </Button>
        <Button
          pad="small"
          margin={{ left: 'small' }}
          color={difficulty >= 40 ? 'accent-1' : 'inherit'}
          onClick={() => setDifficulty(40)}
          textAlign="center"
        >
          *
        </Button>
        <Button
          pad="small"
          margin={{ left: 'small' }}
          color={difficulty >= 60 ? 'accent-1' : 'inherit'}
          onClick={() => setDifficulty(60)}
          textAlign="center"
        >
          *
        </Button>
      </Box>
    </Box>
  )
}

export default DifficultySetter
