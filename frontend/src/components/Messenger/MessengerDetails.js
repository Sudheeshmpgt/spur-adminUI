import { Avatar, Box, Card, Fab, Grid, IconButton, Input, InputBase, Paper, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'
import axios from '../../axiosinstance'
import { useSelector } from 'react-redux'
import './Scroll.css'
import Messages from './Messages';
import io from 'socket.io-client'

const ENDPOINT = "https://spur-backend.herokuapp.com";
var socket, selectedChatCompare;

function MessengerDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useSelector(state => state.userData.value)
    const [currentChat, setCurrentChat] = useState(null)
    const [user, setUser] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = React.useState([])
    const [socketConnected, setSocketConnected] = useState(false)
    const scrollRef = useRef()
 
    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit("setup",currentUser)
        socket.on("connection", ()=>setSocketConnected(true))  
    },[])

    useEffect(() => {
        const data = location.state.chat
        setCurrentChat(data)
        const friendId = data?.members.filter(member => member !== currentUser._id)
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
    }, [location.state.chat, currentUser?._id])

    const fetchMessages = () => {
        const id = currentChat?._id
        axios.get(`api/messages/${id}`, {
            header: {
                'authToken': localStorage.getItem("usertoken")
            }
        })
            .then(res => {
                setMessages(res.data.message)
                socket.emit("join chat",currentChat?._id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(()=>{
        fetchMessages();
        selectedChatCompare = currentChat;
    },[currentChat])


    const handleSubmit = (e) =>{
        e.preventDefault();
        const message = {
            sender: currentUser._id,
            text: newMessage,
            conversationId : currentChat._id
        }

        socket.emit("new message",{
            senderId: currentUser._id,
            chat: currentChat,
            text: newMessage
        })

        axios.post('api/messages', message)
        .then(res=>{
            setMessages([...messages, res.data.message])
            setNewMessage('')
        })
    }

    useEffect(()=>{
        socket.on("message recieved",(newMessageRecieved)=>{
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id)
            {
                //send notification
            }else{
                setMessages([...messages, newMessageRecieved])
            }
        })
    })


    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    return (
        <Grid container>
            <Box width='100%'>
                <Card sx={{ width: '90%', height: 480, borderRadius: '15px', m: '0 auto' }}>
                    <Box sx={{
                        width: '97%',
                        m: '0 auto',

                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: 1,
                        borderColor: 'rgba(0, 0, 0, 0.38)'
                    }}>
                        <Box sx={{ display: 'flex', p: 1.5 }}>
                            <Avatar src={user?.profileImg} sx={{ width: 45, height: 45 }}></Avatar>
                            <Typography sx={{ ml: 2, mt: 1 }}>{user?.name}</Typography>
                        </Box>
                        <Box sx={{ p: 1.5 }}>
                            <IconButton onClick={() => navigate('/home')}>
                                <CloseIcon sx={{ fontSize: 25 }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box className='scrollbar-hidden' width='100%' height='69%' sx={{ overflow: 'scroll' }}>
                        {
                            messages.map((data, index) =>( 
                                <Box ref={scrollRef} key={index}>
                                    <Messages message={data} own={data.sender === currentUser?._id} senderImg={currentUser?.profileImg} recieverImg={user?.profileImg}  />
                                </Box>
                            ))
                        }
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', p: 1.5 }}>
                        <Box sx={{ width: '85%', backgroundColor: 'secondary.main', borderRadius: '10px' }}>
                            <InputBase
                                sx={{ ml: 2, height: 1, width: '93%' }}
                                onChange={(e)=>setNewMessage(e.target.value)}
                                value={newMessage}
                                fullWidth
                                variant='outlined'
                                placeholder='Write something...'>
                            </InputBase>
                        </Box>
                        <Box width='10%'>
                            <Fab onClick={handleSubmit} size='medium' sx={{ ml: 2, mb: 0.5, backgroundColor: 'secondary.main' }}><SendRoundedIcon sx={{ fontSize: 28, ml: 0.5 }} /></Fab>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Grid>
    )
}

export default MessengerDetails