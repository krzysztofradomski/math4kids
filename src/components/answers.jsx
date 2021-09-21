import { useState, useEffect } from 'react'
import { Box, Text, Button, Grid } from 'grommet'
import { useMaths } from '../utils/useMaths'
import { getRandomAccentColor as gc } from '../utils/misc'
import { CONFIG } from '../utils/config'

const Answers = ({ chooseAnswer, size }) => {
  const { choices } = useMaths()
  const [colors, setColors] = useState([gc(4), gc(4), gc(4), gc(4)])
  useEffect(() => {
    setColors([gc(4), gc(4), gc(4), gc(4)])
  }, [choices])
  return (
    <Box gridArea={size !== 'small' ? 'sidebar' : 'bottom'} background="brand">
      <Grid fill rows={['flex', 'flex', 'flex']} columns={['auto']}>
        {choices.map((answer, i) => (
          <Button key={`key-${i}-${answer}`} href="#" hoverIndicator onClick={chooseAnswer(answer)}>
            <Box
              pad={size}
              background={colors[i]}
              fill
              justify="center"
              animation={{ type: 'slideLeft', duration: 1000 }}
              border={{ color: 'brand', size: 'small' }}
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

export default Answers
