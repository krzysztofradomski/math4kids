import { Text } from 'grommet';
import { CONFIG } from '../utils//config'
import { useMaths } from '../utils/useMaths';

const Main = () => {
    const { numbers, calculation } = useMaths()
    return (   <Text size="6xl" textAlign="center" color="brand" >  {numbers[0]} {CONFIG.calculations[calculation]} {numbers[1]}</Text>)}

export default Main;