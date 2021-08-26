import React, { useState } from 'react';
import { Add, Subtract} from 'grommet-icons';
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { useTranslation } from '../utils/useTranslations'
import { useMaths } from '../utils/useMaths';
import { CONFIG } from '../utils//config'
import Main from './main'

const Icons = {
  add: <Add size="small" />,
  subtract: <Subtract size="small" />,
  divide: <Text size="small" weight="bold">/</Text>,
  multiply: <Text size="small" weight="bold">*</Text>,
}



const HomePage = () => {
  const [sidebar, setSidebar] = useState(true);
  const { translate: t } = useTranslation()
  const { answer, dummyAnswers, setCalculation, getNewCalculation } = useMaths()

  const chooseAnswer = value => event => {
    console.log(value)
    if (value === answer) {
      alert('correct')
      getNewCalculation()
    } else if (value !== answer) {
      alert('wrong')
    }
  }

  const chooseCalculation = value => event => setCalculation(value)
  return (
    <Grommet full theme={grommet}>
      <Grid
        fill
        rows={['auto', 'flex']}
        columns={['auto', 'flex']}
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'sidebar', start: [0, 1], end: [0, 1] },
          { name: 'main', start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box
          gridArea="header"
          direction="row"
          align="center"
          justify="between"
          pad='medium'
          background="brand"
        >
          <Button onClick={() => setSidebar(!sidebar)}>
            <Text size="large">{t('math4kids')}</Text>
          </Button>
          {[...Object.keys(CONFIG.calculations)].map(name => (
              <Button key={name} href="#" hoverIndicator onClick={chooseCalculation(name)} >
                <Box pad='small'>
                  <Text>{t(name)}</Text>
                </Box>
              </Button>
            ))}
          <Text>{t('score')}: 0 </Text>
          <Button onClick={() => getNewCalculation()}>Get new calculation</Button>
        </Box>
        {sidebar && (
          <Box
            gridArea="sidebar"
            background="brand"
            width="small"
            animation={[
              { type: 'fadeIn', duration: 300 },
              { type: 'slideRight', size: 'xlarge', duration: 150 },
            ]}
          >
            {[answer, ...dummyAnswers].map(answer => (
              <Button key={answer} href="#" hoverIndicator  onClick={chooseAnswer(answer)}>
                <Box pad='medium'>
                  <Text>{answer}</Text>
                </Box>
              </Button>
            ))}
          </Box>
        )}
        <Box gridArea="main" justify="center" align="center">
         <Main />
        </Box>
      </Grid>
    </Grommet>
  );
};

export default HomePage