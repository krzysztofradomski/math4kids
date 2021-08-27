import { Text, Grid, Box } from 'grommet'
import { CONFIG } from '../utils//config'
import { useMaths } from '../utils/useMaths'

const Main = ({ showAnswer = false }) => {
  const { numbers, calculation, answer } = useMaths()
  return (
    <Grid columns={['flex', 'flex', 'flex', 'flex', 'flex']} gap="small" rows={['flex']}>
      {[numbers[0], CONFIG.calculations[calculation], numbers[1], '=', showAnswer ? answer : '?'].map((val, i) => (
        <Box
          animation={{ type: 'fadeIn', duration: (i + 1) * 1000 }}
          key={val}
          pad={i % 2 === 0 ? 'large' : 'large'}
          background={i === 0 ? 'brand' : `accent-${i}`}
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
