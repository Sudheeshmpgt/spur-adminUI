import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import ImageOne from '../../images/imageOne.svg'
import ImageTwo from '../../images/imageTwo.svg'
import ImageThree from '../../images/imageThree.svg'
import ImageFour from '../../images/imageFour.svg'
import ImageFive from '../../images/imageFive.svg'
import ImageSix from '../../images/imageSix.svg'
import './Bubble.css'
import { useNavigate } from 'react-router-dom'

function StaticrowOne() {
    const navigate = useNavigate()
    const handleLearnMore = () => {
        navigate('/register')
    }
    return (
        <Grid container>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column' }} >
                    <Box className='box sb1' sx={{ fontFamily: 'Poppins, sans-serif' }}>
                        can’t crack the test?
                    </Box>
                    <Box sx={{}}>
                        <img src={ImageOne} alt='' style={{ height: '300px' }}></img>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column' }} >
                    <Box className='box sb2' sx={{ fontFamily: 'Poppins, sans-serif' }}>
                        doesn’t get the right job?
                    </Box>
                    <Box sx={{ marginLeft: 10 }}>
                        <img src={ImageTwo} alt='' style={{ height: '300px' }}></img>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column' }} >
                    <Box className='box sb3' sx={{ fontFamily: 'Poppins, sans-serif' }}>
                        tired of interviews?
                    </Box>
                    <Box sx={{ marginTop: -9, marginLeft: 10 }}>
                        <img src={ImageThree} alt='' style={{ height: '300px' }}></img>
                    </Box>
                </Grid>
                <Grid container sx={{ marginTop: { xs: 5, sm: 15 }, width: '100%', display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-evenly' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box item xs={12} sx={{ fontFamily: 'Oswald, sans-serif', fontSize: { xs: '1rem', sm: '2rem' }, marginTop: { sm: 10 }, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                            Get help from  10+ years of <br /> experienced interviewers
                        </Box>
                        <Box width='100%' mt={5}>
                            <Button variant='contained' onClick={handleLearnMore} >Learn more</Button>
                        </Box>
                    </Box>
                    <Box item xs={12} >
                        <img src={ImageFour} alt='' style={{ height: '350px' }}></img>
                    </Box>
                </Grid>
                <Grid container sx={{ marginTop: { xs: 5, sm: 15 }, width: '100%', display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#80c7ff' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box item xs={12} sx={{ fontFamily: 'Oswald, sans-serif', fontSize: { xs: '1rem', sm: '2rem' }, marginTop: { sm: 10 }, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                            Get more idea on interview by <br /> attending mock interviews
                        </Box>
                        <Box width='100%' mt={5}>
                            <Button variant='contained' onClick={handleLearnMore} sx={{ color: 'black', backgroundColor: '#ffff' }} >Learn more</Button>
                        </Box>
                    </Box>
                    <Box item xs={12} >
                        <img src={ImageFive} alt='' style={{ height: '350px' }}></img>
                    </Box>
                </Grid>
                <Grid container sx={{ marginTop: { xs: 5, sm: 15 }, width: '100%', display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-evenly' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box item xs={12} sx={{ fontFamily: 'Oswald, sans-serif', fontSize: { xs: '1rem', sm: '2rem' }, marginTop: { sm: 10 }, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                            Join with us and be a success in <br /> your career
                        </Box>
                        <Box width='100%' mt={5}>
                            <Button variant='contained' onClick={handleLearnMore} >Learn more</Button>
                        </Box>
                    </Box>
                    <Box item xs={12} >
                        <img src={ImageSix} alt='' style={{ height: '350px' }}></img>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StaticrowOne