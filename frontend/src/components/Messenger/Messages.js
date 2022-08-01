import { Avatar, Box, Grid, Typography } from '@mui/material'
import React from 'react'
import './Scroll.css'
import dayjs from 'dayjs'

function Messages({ message, own, senderImg, recieverImg }) {
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    const ownStyle = { display: 'flex', mt: 2, width: '100%', justifyContent: 'flex-end', mr:2.7 }
    const normalStyle = { display: 'flex', mt: 2, width: '100%', ml: 2.7 }
    const ownMessageStyle = {maxWidth:'88%', height: 'auto', backgroundColor: 'secondary.main', borderRadius: '10px', p: 1}
    const normalMessageStyle = {maxWidth: '88%', height: 'auto', backgroundColor: '#f5f3f0', borderRadius: '10px', p: 1}
    
    return (
        <Grid container >
            <Box sx={own ? ownStyle : normalStyle}>
                <Box width='7%'>
                    <Avatar src={own ? senderImg : recieverImg} sx={{ width: 37, height: 37 }}></Avatar>
                </Box>
                <Box maxWidth='70%' sx={{ display: 'flex', flexDirection: 'column'}}>
                    <Box sx={own ? ownMessageStyle : normalMessageStyle}> 
                        <Typography>{message.text}</Typography>
                    </Box>
                    <Typography fontSize={10.5} sx={{ ml: 1 }}>{dayjs(message.createdAt).fromNow()}</Typography>
                </Box>
            </Box>
        </Grid>
    )
}

export default Messages