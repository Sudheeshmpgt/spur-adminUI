import { Grid } from '@mui/material'
import AdminHeader from '../components/Admin/AdminHeader'
import TopDesign from '../components/common/TopDesign'

function adminLayout({children}) {
    return (
        <Grid>
            <AdminHeader/>
            <TopDesign/>
            {children}
        </Grid>
      )
}

export default adminLayout