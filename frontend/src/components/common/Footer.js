import { Grid, Link } from '@mui/material'
import { Box } from '@mui/system'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import React from 'react'

function Footer() {
    return (
        <div>
            <div className="EllipseFooter"></div>
            <Grid container
                px={{ xs: 3, sm: 20 }}
                py={{ xs: 3, sm: 5 }}
                sx={{ background: '#80c7ff', color: 'black', mt: 14 }}>
                <Grid container
                    spacing={5}
                    columnSpacing={20}
                    maxWidth='xl'
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}>
                    <Grid item xs={12} md={5} m='0 auto' >
                        <Box fontSize='1.2rem' fontWeight='700' fontFamily='Poppins, sans-serif' mb={2} >For Contact</Box>
                        <Box mb={1.2} display='flex'>
                            <Link color='inherit' fontFamily='Poppins, sans-serif' fontSize='1rem' underline='none'>
                                Spur, good professionals are made from here
                            </Link>
                        </Box>
                        <Box mb={0.5} mt={2} display='flex'>
                            <Link color='inherit' fontFamily='Poppins, sans-serif' fontSize='0.9rem' underline='none'>Sudheesh Manikandan</Link>
                        </Box>
                        <Box mb={0.5} display='flex'>
                            <FmdGoodIcon sx={{ fontSize: 18, marginRight: 0.8, color: 'white' }} />
                            <Link color='inherit' fontFamily='Poppins, sans-serif' fontSize='0.9rem' underline='none'>Kerala, India</Link>
                        </Box>
                        <Box mb={0.5} display='flex'>
                            <PhoneIcon sx={{ fontSize: 18, marginRight: 0.8, color: 'white' }} />
                            <Link color='inherit' fontFamily='Poppins, sans-serif' fontSize='0.9rem' underline='none'>+91 7736288180</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3.5} m='0 auto' >
                        <Box fontSize='1.2rem' fontFamily='Poppins, sans-serif' fontWeight='700' mb={2} mt={-4} >Quick Links</Box>
                        <Box mb={1.1} display='flex'>
                            <HomeIcon sx={{ fontSize: 27, marginRight: 1.5, color: 'white' }} />
                            <Link href='/' color='inherit' fontFamily='Poppins, sans-serif' underline='none' fontSize='1rem'>Home</Link>
                        </Box>
                        <Box mb={1.1} display='flex'>
                            <InfoIcon sx={{ fontSize: 27, marginRight: 1.5, color: 'white' }} />
                            <Link href='https://sudheeshmpgt.github.io/Sudheesh_Manikandan/' color='inherit' fontFamily='Poppins, sans-serif' underline='none' fontSize='1rem'>About us</Link>
                        </Box>
                        <Box mb={1.1} display='flex'>
                            <PhoneIcon sx={{ fontSize: 27, marginRight: 1.5, color: 'white' }} />
                            <Link sx={{ cursor: 'pointer' }} color='inherit' fontFamily='Poppins, sans-serif' underline='none' fontSize='1rem'>Contact us</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3.5} m='0 auto'>
                        <Box fontSize='1.2rem' fontFamily='Poppins, sans-serif' fontWeight='700' mb={2} mt={-4}>Connect Us</Box>
                        <Box mb={1.1} display='flex'>
                            <FacebookIcon sx={{ fontSize: 27, marginRight: 1.5, color: 'white' }} />
                            <Link href="https://www.facebook.com/sudheesh.manikandan.pgt/" color='inherit' fontFamily='Poppins, sans-serif' underline='none' fontSize='1rem'>Facebook</Link>
                        </Box>
                        <Box mb={1.1} display='flex'>
                            <InstagramIcon sx={{ fontSize: 27, marginRight: 1.5, color: 'white' }} />
                            <Link href="https://www.instagram.com/sudheesh.manikandan/" color='inherit' fontFamily='Poppins, sans-serif' underline='none' fontSize='1rem'>Instagram</Link>
                        </Box>
                        <Box mb={1.1} display='flex'>
                            <LinkedInIcon sx={{ fontSize: 27, marginRight: 1.5, color: 'white' }} />
                            <Link href='https://www.linkedin.com/in/sudheesh-m-b17874220' color='inherit' fontFamily='Poppins, sans-serif' underline='none' fontSize='1rem'>Linked In</Link>
                        </Box>
                    </Grid>
                </Grid>
                <Grid m='0 auto'>
                    <Box textAlign='center' fontFamily='Poppins, sans-serif' fontSize={14} pt={{ xs: 5, sm: 7 }} pb={{ xs: 5, sm: 0 }}>
                        Sudheesh Manikandan &reg; {new Date().getFullYear()}
                    </Box>
                </Grid>
            </Grid>
            </div >
            )
}

            export default Footer