import React from 'react'
import { Box, Text, Button, Grid } from 'grommet'
import { useMaths } from '../utils/useMaths'
import { getRandomAccentColor } from '../utils/misc'
import { CONFIG } from '../utils/config'

const Sidebar = ({ chooseAnswer, size }) => {
  const { choices } = useMaths()
  return (
    <Box gridArea={size !== 'small' ? 'sidebar' : 'bottom'} background="brand">
      <Grid fill rows={['flex', 'flex', 'flex']} columns={['auto']}>
        {choices.map((answer, i) => (
          <Button key={`key-${i}-${answer}`} href="#" hoverIndicator onClick={chooseAnswer(answer)}>
            <Box
              pad={size}
              background={getRandomAccentColor()}
              fill
              justify="center"
              animation={{ type: 'slideLeft', duration: 1000 }}
            >
              <Text size={CONFIG.fontSizes[size]} textAlign="center" color="white">
                {answer}
              </Text>
            </Box>
          </Button>
        ))}
      </Grid>
    </Box>
  )
}

export default Sidebar
