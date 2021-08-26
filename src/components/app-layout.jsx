import React, { useState } from 'react';
// import { Add, Subtract} from 'grommet-icons';
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import ConfettiExplosion from '@reonomy/react-confetti-explosion';
import { useTranslation } from '../utils/useTranslations'
import { useMaths } from '../utils/useMaths';
import { CONFIG } from '../utils//config'
import Main from './main'

// const Icons = {
//   add: <Add size="small" />,
//   subtract: <Subtract size="small" />,
//   divide: <Text size="small" weight="bold">/</Text>,
//   multiply: <Text size="small" weight="bold">*</Text>,
// }



const HomePage = () => {
  const [sidebar, setSidebar] = useState(true);
  const { translate: t } = useTranslation()
  const { answer, dummyAnswers, setCalculation, calculation, getNewCalculation, difficulty, setDifficulty } = useMaths()
  const [score, setScore] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  const scorePoint = () => setScore(prev => prev + 1)
  const showConfetti = () => {
    setIsExploding(true)
    setTimeout(() => {
      alert(t('correct'))
      setIsExploding(false)
    }, 1000);
  }

  const chooseAnswer = value => event => {
   
    console.log(value)
    if (value === answer) {
      getNewCalculation()
      scorePoint()
      showConfetti()
    } else if (value !== answer) {
      alert(t('wrong'))
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
            <Text 
            size="large"
            tip={{
          plain: true,
          dropProps: { align: { left: 'right' } },
          content: (
            <Box
              pad="small"
              elevation="big"
              background="brand" // no opacity
              round="xsmall"
              margin="xsmall"
              align="center"
            >
              {t('answers')}
            </Box>
          ),
        }}
            >{t('math4kids')}</Text>
          </Button>
          {[...Object.keys(CONFIG.calculations)].map(name => (
              <Button key={name} href="#" hoverIndicator onClick={chooseCalculation(name)} >
                <Box pad='small'>
                  <Text color={ name === calculation ? 'accent-1' : 'inherit'} >{t(name)}</Text>
                </Box>
              </Button>
            ))}
          <Text>{t('score')}: {score} </Text>
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
            <Button onClick={() => getNewCalculation()}>
                <Box pad='medium'>
                  <Text>{t('getNewCalc')}</Text>
                </Box>
            </Button>

            <Box pad='medium' direction="row" align="center">
            <Text style={{"&::hover": "cursor"}}>{t('difficulty')}</Text>
              <Text  color={difficulty >= 20 ? 'accent-1' : 'inherit'} onClick={() => setDifficulty(20)} textAlign="center">*</Text>
              <Text color={difficulty >= 40 ? 'accent-1' : 'inherit'} onClick={() => setDifficulty(40)} textAlign="center">**</Text>
              <Text color={difficulty >= 60 ? 'accent-1' : 'inherit'} onClick={() => setDifficulty(60)} textAlign="center">***</Text>
            </Box>

            <Box pad='medium'>
              <Text  textAlign="center">{t('answers')}</Text>
            </Box>

           
            {[answer, ...dummyAnswers].map(answer => (
              <Button key={answer} href="#" hoverIndicator  onClick={chooseAnswer(answer)}>
                <Box pad='medium'>
                  <Text size="xxlarge" textAlign="center" >{answer}</Text>
                </Box>
              </Button>
            ))}
          </Box>
        )}
        <Box gridArea="main" justify="center" align="center">
        
         {isExploding ? <ConfettiExplosion /> :  <Main />}
        </Box>
      </Grid>
    </Grommet>
  );
};

export default HomePage