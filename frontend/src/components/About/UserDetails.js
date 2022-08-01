import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

function UserDetails({userData}) {
  return (
    <Grid container>
            <Box sx={{ width: '100%', display: 'flex',justifyContent:'space-around', m: '0 auto', }}>
                <Box sx={{ display: 'flex', flexDirection:'column', height:240 }}>
                    <Typography mt={1} fontSize='1.1rem' fontWeight={600}>Name</Typography>
                    <Typography mt={1} fontSize='1.1rem' fontWeight={600}>About</Typography>
                    <Typography mt={1} fontSize='1.1rem' fontWeight={600}>Phone</Typography>
                    <Typography mt={1} fontSize='1.1rem' fontWeight={600}>Email</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'column' }}>
                    <Typography mt={1} fontSize='1.1rem' fontWeight={600}>: {userData?.name}</Typography>  
                    <Typography mt={1} fontSize='1.1rem' fontWeight={600}>: {userData?.about}</Typography>
                    <Typography mt={1} fontSize='1.1rem' fontWeight={600}>: {userData?.phone}</Typography>
                    <Typography mt={1} fontSize='1.1rem' fontWeight={600}>: {userData?.email}</Typography>
                </Box>
            </Box>
        </Grid>
  )
}

export default UserDetails