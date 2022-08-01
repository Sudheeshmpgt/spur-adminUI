import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import axios from '../../axiosinstance'

function Conversations({ conversation, currentUser }) {
    const [user, setUser] = React.useState(null)

    useEffect(() => {
        const friendId = conversation.members.filter(member => member !== currentUser._id)
        const getUser = () => {
            axios.get(`api/user/details/${friendId}`, {
                headers: {
                    'authToken': localStorage.getItem("usertoken")
                }
            })
                .then(res => {
                    setUser(res.data.user)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        getUser();
    }, [conversation, currentUser])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', m: '25px auto' }} >
            <Box width='35%'>
                <Avatar src={user?.profileImg} sx={{ width: 50, height: 50, m: '0 auto' }}></Avatar>
            </Box>
            <Box width='65%' borderBottom={1} borderColor='rgba(0, 0, 0, 0.38)'>
                <Typography fontSize={{ sm: '1rem' }} mt={2} >{user?.name}</Typography>
            </Box>
        </Box>
    )
}

export default Conversations