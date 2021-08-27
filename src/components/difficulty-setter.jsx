import React from 'react'
import { Box, Text } from 'grommet'
import { useMaths } from '../utils/useMaths'
import { useTranslation } from '../utils/useTranslations'

const DifficultySetter = () => {
  const { translate: t } = useTranslation()
  const { difficulty, setDifficulty } = useMaths()
  return (
    <Box pad="medium" direction="row" align="center">
      <Text style={{ '&::hover': 'cursor' }}>{t('difficulty')}</Text>
      <Text color={difficulty >= 20 ? 'accent-1' : 'inherit'} onClick={() => setDifficulty(20)} textAlign="center">
        *
      </Text>
      <Text color={difficulty >= 40 ? 'accent-1' : 'inherit'} onClick={() => setDifficulty(40)} textAlign="center">
        **
      </Text>
      <Text color={difficulty >= 60 ? 'accent-1' : 'inherit'} onClick={() => setDifficulty(60)} textAlign="center">
        ***
      </Text>
    </Box>
  )
}

export default DifficultySetter
