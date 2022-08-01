import { Box, Button, FormControl, FormControlLabel, Grid, Link, Paper, Radio, RadioGroup, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from '../../axiosinstance'
import Toast from '../Sweetalert/sweetAlert'

function JoinNow() {
    const navigate = useNavigate();
    const [interviewer, setInterviewer] = useState(false)
    const [value, setValue] = useState('fresher');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const regOnSubmit = (data) => {
        const { name, phone, email, password, confirmPassword, experience } = data
        const values = {
            name, email, phone, password, confirmPassword, interviewer, experience
        }
        if (name && phone && email && password && (password === confirmPassword)) {
            axios.post("api/user/registration", values)
                .then((res) => {
                    const message = res.data.message
                    navigate('/login')
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
                }).catch(e => { 
                    Toast.fire({
                        icon: 'error',
                        title: "Something went wrong"
                    })
                })
        } else {
            Toast.fire({
                icon: 'error',
                title: "Invalid Credentials"
            })
        }
    }


    const handleSwitch = () => {
        setInterviewer(!interviewer)
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSignIn = () => {
        navigate('/login')
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box>
                    <Paper sx={{
                        elevation: 5,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: 5,
                        height: 'auto',
                        width: { xs: 280, sm: 300 },
                        margin: { xs: '25% auto', sm: '8% auto' },
                        borderRadius: '10px'
                    }}>
                        <h2 style={{ marginBottom: '10px', fontFamily: 'Poppins,sans-serif', textAlign: 'center', marginTop: -10 }}>JOIN NOW</h2>
                        <form onSubmit={handleSubmit(regOnSubmit)} autoComplete='off'>
                            <TextField
                                name='name'
                                type='string'
                                {...register('name', {
                                    required: 'This field is required',
                                    minLength: {
                                        value: 4,
                                        message: 'Please enter atleast 4 characters'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/,
                                        message: 'Please enter a valid name'
                                    }
                                })}
                                error={!!errors?.name}
                                helperText={errors?.name ? errors.name.message : null}
                                variant='outlined'
                                sx={{ color: '', mb: 1.2 }}
                                size='small'
                                label='Fullname'
                                fullWidth
                                placeholder='Enter Fullname' />
                            <TextField
                                name='email'
                                type='email'
                                {...register('email', {
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email'
                                    }
                                })}
                                error={!!errors?.email}
                                helperText={errors?.email ? errors.email.message : null}
                                variant='outlined'
                                sx={{ color: '', mb: 1.2 }}
                                size='small'
                                label='Email'
                                fullWidth
                                placeholder='Enter Email' />
                            <TextField
                                name='phone'
                                type='string'
                                {...register('phone', {
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: 'Please enter a valid phone number'
                                    }
                                })}
                                error={!!errors?.phone}
                                helperText={errors?.phone ? errors.phone.message : null}
                                variant='outlined'
                                sx={{ color: '', mb: 1.2 }}
                                size='small'
                                label='Phone'
                                fullWidth
                                placeholder='Enter Phone' />
                            <TextField
                                name='password'
                                type='password'
                                {...register('password', {
                                    required: 'This field is required',
                                    minLength: {
                                        value: 4,
                                        message: 'Password must be more than 4 characters'
                                    }
                                })}
                                error={!!errors?.password}
                                helperText={errors?.password ? errors.password.message : null}
                                variant='outlined'
                                sx={{ color: '', mb: 1.2 }}
                                size='small'
                                label='Password'
                                fullWidth
                                placeholder='Enter Password' />
                            <TextField
                                name='confirmPassword'
                                type='password'
                                {...register('confirmPassword', {
                                    required: 'This field is required',
                                    minLength: {
                                        value: 4,
                                        message: 'Password must be more than 4 characters'
                                    }
                                })}
                                error={!!errors?.confirmPassword}
                                helperText={errors?.confirmPassword ? errors.confirmPassword.message : null}
                                variant='outlined'
                                sx={{ color: '', mb: 1.2 }}
                                size='small'
                                label='Confirm Password'
                                fullWidth
                                placeholder='Confirm Password' />
                            <Typography sx={{ mb: 1 }}>Register as Interviewer
                                <Switch sx={{ ml: { xs: 5.2, sm: 7.2 } }} checked={interviewer} onClick={handleSwitch} />
                            </Typography>
                            {
                                interviewer &&
                                <FormControl sx={{ mb: 1 }}>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                        row
                                    >
                                        <FormControlLabel sx={{ margin: '0 auto' }} value="fresher" control={<Radio />} label="Fresher" />
                                        <FormControlLabel sx={{ marginLeft: { sm: 7.5, xs: 4.5 } }} value="experienced" control={<Radio />} label="Experienced" />
                                    </RadioGroup>
                                </FormControl>
                            }
                            {
                                value === "experienced" &&
                                <TextField
                                    name='experience'
                                    type='number'
                                    {...register('experience', {
                                        required: 'This field is required',
                                    })}
                                    error={!!errors?.experience}
                                    helperText={errors?.experience ? errors.experience.message : null}
                                    variant='outlined'
                                    sx={{ color: '', mb: 1.2 }}
                                    size='small'
                                    label='Experience'
                                    fullWidth
                                    placeholder='No. of years'/>
                            }
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                size='small'
                                sx={{ margin: '0 auto', fontSize: { xs: '0.8rem', sm: '1rem' }, mb: 2 }}>
                                Submit
                            </Button>
                        </form>
                        <Typography
                            textAlign='center'
                            fontFamily='Poppins,san-serif'>
                            already have an account? <Link onClick={handleSignIn} sx={{ color: 'blue' }}>Sign IN</Link>
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    )
}

export default JoinNow