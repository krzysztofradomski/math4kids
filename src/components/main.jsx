import { useEffect } from 'react'
import { Text, Grid, Box } from 'grommet'
import { CONFIG } from '../utils//config'
import { useMaths } from '../utils/useMaths'
import { getRandomAccentColor } from '../utils/misc'

async function lockScreen() {
  let lock
  try {
    lock = await navigator.wakeLock.request('screen')
  } catch (err) {
    console.log('Wake Lock error: ', err)
  }
  return await lock.release()
}

const Main = ({ showAnswer = false }) => {
  const { numbers, calculation, answer } = useMaths()

  useEffect(() => lockScreen(), [])

  return (
    <Grid columns={['flex', 'flex', 'flex', 'flex', 'flex']} gap="small" rows={['flex']}>
      {[numbers[0], CONFIG.calculations[calculation], numbers[1], '=', showAnswer ? answer : '?'].map((val, i) => (
        <Box
          animation={{ type: 'fadeIn', duration: (i + 1) * 1000 }}
          key={val}
          pad={i % 2 === 0 ? 'large' : 'large'}
          background={getRandomAccentColor()}
          round
        >
          <Text size="6xl" textAlign="center" color="white">
            {val}
          </Text>
        </Box>
      ))}
    </Grid>
  )
}

export default Main
