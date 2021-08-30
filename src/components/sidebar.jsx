import React from 'react'
import { Box, Text, Button, Grid } from 'grommet'
import { useMaths } from '../utils/useMaths'
import { getRandomAccentColor } from '../utils/misc'

const Sidebar = ({ chooseAnswer }) => {
  const { choices } = useMaths()
  return (
    <Box gridArea="sidebar" background="brand">
      <Grid fill gridArea="sidebar" rows={['flex', 'flex', 'flex']} columns={['auto']}>
        {choices.map((answer, i) => (
          <Button key={`key-${i}-${answer}`} href="#" hoverIndicator onClick={chooseAnswer(answer)}>
            <Box
              pad="large"
              background={getRandomAccentColor()}
              fill
              justify="center"
              animation={{ type: 'slideLeft', duration: 1000 }}
            >
              <Text size="6xl" textAlign="center" color="white">
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
