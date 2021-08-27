import React from 'react'
import { Box, Text, Button, Grid } from 'grommet'
import { useMaths } from '../utils/useMaths'

const Sidebar = ({ chooseAnswer }) => {
  const { choices } = useMaths()
  return (
    <Box gridArea="sidebar" background="brand">
      <Grid fill gridArea="sidebar" rows={['flex', 'flex', 'flex']} columns={['auto']}>
        {choices.map((answer, i) => (
          <Button key={`key-${i}-${answer}`} href="#" hoverIndicator onClick={chooseAnswer(answer)}>
            <Box pad="large" background={`accent-${i + 2}`} fill justify="center">
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
