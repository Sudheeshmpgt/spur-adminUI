import { Grid } from '@mui/material'
import Header from '../components/common/Header'
import TopDesign from '../components/common/TopDesign'

function layout({children}) {
  return (
    <Grid>
        <Header/>
        <TopDesign/>
        {children}
    </Grid>
  )
}

export default layout