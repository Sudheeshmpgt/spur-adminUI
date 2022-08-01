import { Box, Button, Grid, Paper, Typography, Modal, IconButton, InputBase } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import axios from '../../axiosinstance';
import Toast from '../Sweetalert/sweetAlert';
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import { createPost } from '../../Redux/Features/postData';

function CreatePost() {
    const navigate = useNavigate()
    const user = useSelector(state => state.userData.value)
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setDescription("");
        setImage("");
        navigate('/home')
    }
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

    const handlePost = (data) => {
        const { description } = data
        setDescription(description)
        let values = new FormData()
        if (description) {
            values.append('postImg', image)
            values.append('description', description)
            values.append('createdBy', user._id)
        }

        if (description) {
            axios.post(`api/post/posts/create`, values, {
                headers: {
                    'authToken': localStorage.getItem("usertoken"),
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    const message = res.data.message
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                    dispatch(createPost(res.data.posts))
                    handleClose();
                })
                .catch(err => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong'
                    })
                })
        }
    }

    const Input = styled('input')({
        display: 'none',
    });

    const changeImage = (e) => {
        setImage(e.target.files[0])
    }

    return (
        <Grid container>
            <Box width='100%'>
                <Paper sx={{ m: '80px auto', elevalation: 10, borderRadius: '15px', width: '80%' }}>
                    <Box sx={{ backgroundColor: '', borderRadius: '15px' }} width='100%' height={80}>
                        <Box width='85%' sx={{ m: '0 auto' }}>
                            <Button fullWidth
                                onClick={handleOpen}
                                variant='contained'
                                color='secondary'
                                size='large'
                                sx={{ m: '20px auto', borderRadius: '10px' }}>
                                <Typography fontSize='1rem' >
                                    Start a post...
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component={Paper} sx={{ width: 550, height: 550, m: '80px auto', borderRadius: '15px', elevalation: 10 }}>
                    <Box sx={{ width: '100%', height: 50, borderBottom: 1, borderColor: 'rgba(0, 0, 0, 0.38)', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '1.21rem', mt: 1.5, ml: 1.5 }} >
                            Create a post
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(handlePost)}>
                        <Box sx={{ height: 425 }}>
                            <InputBase
                                name='description'
                                type='string'
                                {...register('description')}
                                maxRows={9}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                placeholder='What do you want to talk about ?'
                                fullWidth sx={{ ml: 1.5, mr: 1.5, mt: 1 }} />
                            <Box sx={{ width: '95%', height: 200, m: '0 auto' }}>
                                {
                                    image &&
                                    <Box sx={{width:'55%', m:'0 auto'}}> 
                                        <img alt='' src={image && URL.createObjectURL(image)} ></img>
                                    </Box>
                                }
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <label htmlFor="icon-button-file" >
                                <Input accept="image/*"
                                    id="icon-button-file"
                                    type="file"
                                    {...register('picture')}
                                    onChange={changeImage}
                                />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <AddPhotoAlternateIcon style={{ fontSize: 40 }} />
                                </IconButton>
                            </label>
                            <Button sx={{ mr: 1.5, fontSize: '1.1rem' }} type='submit'>
                                Post
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Grid>
    )
}

export default CreatePost