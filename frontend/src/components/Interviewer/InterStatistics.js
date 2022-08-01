import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from '../../axiosinstance'

function Statistics({userData}) {

    const [postCount, setPostCount] = useState(0);
    const [upcomming, setUpcomming] = useState(0);
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);

    useEffect(() => {
        const getPostData = () => {
            axios.get(`api/post/posts/${userData._id}`, {
              headers: {
                authToken: localStorage.getItem("usertoken"),
              },
            })
            .then((res)=>{
              setPostCount(res.data.postsCount)
            })
          };

          const getUpcommingData = () => {
            axios.get(`api/interview/interviewer/upcomming/${userData._id}`, {
              headers: {
                authToken: localStorage.getItem("usertoken"),
              },
            })
            .then((res)=>{
              setUpcomming(res.data.upcommingCount)
              setPending(res.data.pendingCount)
              setCompleted(res.data.completedCount)
            })
          };

          getPostData();
          getUpcommingData();
    },[userData]) 

    return (
        <Grid container>
            <Box sx={{ width: '100%', display: 'flex',justifyContent:'space-around', m: '0 auto', }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection:'column', height:240 }}>
                    <Typography fontSize='1.1rem' fontWeight={600}>Networks</Typography>
                    <Typography fontSize='1.1rem' fontWeight={600}>Interviews</Typography>
                    <Typography fontSize='1.1rem' fontWeight={600}>Posts</Typography>
                    <Typography fontSize='1.1rem' fontWeight={600}>Pending</Typography>
                    <Typography fontSize='1.1rem' fontWeight={600}>Upcomming </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection:'column' }}>
                    <Typography fontSize='1.1rem' fontWeight={600} color='blue'>{userData?.connections?.length}</Typography>  
                    <Typography fontSize='1.1rem' fontWeight={600} color='blue'>{completed}</Typography>
                    <Typography fontSize='1.1rem' fontWeight={600} color='blue'>{postCount}</Typography>
                    <Typography fontSize='1.1rem' fontWeight={600} color='blue'>{pending}</Typography>
                    <Typography fontSize='1.1rem' fontWeight={600} color='blue'>{upcomming}</Typography>  
                </Box>
            </Box>
        </Grid>
    )
}

export default Statistics