import { useEffect } from 'react'
import { Text, Grid, Box } from 'grommet'
import ConfettiExplosion from '@reonomy/react-confetti-explosion'
import { CONFIG } from '../utils//config'
import { useMaths } from '../utils/useMaths'
import { getRandomAccentColor } from '../utils/misc'

async function lockScreen() {
  let lock
  try {
    lock = await navigator.wakeLock.request('screen')
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Wake Lock error: ', err)
  }
  return await lock.release()
}

const Main = ({ showAnswer = false, jiggle, size }) => {
  const { numbers, calculation, answer } = useMaths()
  useEffect(() => lockScreen(), [])
  return (
    <Box
      gridArea="main"
      justify="center"
      align="center"
      animation={{ type: jiggle ? 'jiggle' : 'none', duration: 100 }}
    >
      {showAnswer ? <ConfettiExplosion /> : null}
      <Grid columns={['flex', 'flex', 'flex', 'flex', 'flex']} gap="small" rows={['flex']}>
        {[numbers[0], CONFIG.calculations[calculation], numbers[1], '=', showAnswer ? answer : '?'].map((val, i) => (
          <Box
            animation={{ type: 'fadeIn', duration: (i + 1) * 1000 }}
            key={val}
            pad={size}
            background={getRandomAccentColor()}
            round
          >
            <Text size={CONFIG.fontSizes[size]} textAlign="center" color="white">
              {val}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default Main
