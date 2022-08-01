import { Box, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import axios from '../../axiosinstance';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import Toast from '../Sweetalert/sweetAlert';
import { useDispatch } from 'react-redux'
import { login } from '../../Redux/Features/userData'

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const [status, setStatus] = useState(false)
  const [otpStatus, setOtpStatus] = useState(false)
  const [phone, setPhone] = useState('');
  const [otpValue, setOtpValue] = useState('');


  const logOnSubmit = (data) => {
    const { email, password } = data
    if (email && password) {
      axios.post("api/user/login", data)
        .then((res) => {
          if (res.data.user && res.data.user.block) {
            Toast.fire({
              icon: 'warning',
              title: 'Account Blocked'
            })
          } else {
            if (res.data.user && !res.data.user.block) {
              const message = res.data.message
              Toast.fire({
                icon: 'success',
                title: message
              })
              const token = res.data.token
              localStorage.setItem("usertoken", token)
              dispatch(login(res.data.user))
              navigate('/home')
            } else {
              Toast.fire({
                icon: 'error',
                title: 'Invalid credentials'
              })
            }
          }
        }).catch((e) => {
          console.log(e)
          Toast.fire({
            icon: 'error',
            title: 'Something went wrong'
          })

        })
    } else {
      Toast.fire({
        icon: 'warning',
        title: 'Invalid user'
      })
    }
  }

  const phoneSubmit = (data) => {
    const { phone } = data
    setPhone(phone)
    if (phone) {
      axios.post("api/user/otplogin", data)
      setOtpStatus(!otpStatus)
    }
  }

  const otpSubmit = () => {
    const values = {
      otp: otpValue,
      phone: phone
    }
    if (otpValue) {
      axios.post("api/user/otpsubmit", values)
        .then((res) => {
          if (res.data.user && !res.data.user.block) {
            const message = res.data.message
            Toast.fire({
              icon: 'success',
              title: message
            })
            const token = res.data.token
            localStorage.setItem("usertoken", token)
            dispatch(login(res.data.user))
            navigate('/home')
          } else {
            Toast.fire({
              icon: 'warning',
              title: 'Account Blocked'
            })
          }
        }).catch((e) => {
          Toast.fire({
            icon: 'error',
            title: 'Something went wrong'
          })

        })
    } else {
      Toast.fire({
        icon: 'warning',
        title: 'Invalid user'
      })
    }
  }

  const handleOtpClick = () => {
    setStatus(!status)
  }

  const handleJoinNow = () => {
    navigate('/register')
  }

  const handleOtpChange = (e) => {
    setOtpValue(e.target.value)
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Paper sx={{
            elevation: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 5,
            height: 'auto',
            width: { xs: 100, sm: 300 },
            margin: '8% auto',
            borderRadius: '10px'
          }}>
            <h2 style={{ marginBottom: '10px', fontFamily: 'Poppins,sans-serif', textAlign: 'center' }}>SIGN IN</h2>
            {
              (!status && !otpStatus) &&
              <>
                <form onSubmit={handleSubmit(logOnSubmit)} autoComplete='off'>
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
                    sx={{ color: '', mb: 2 }}
                    size='small'
                    label='Username'
                    fullWidth
                    placeholder='Enter Username' />
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
                    sx={{ color: '', mb: 2 }}
                    size='small'
                    label='Password'
                    fullWidth
                    placeholder='Enter Password' />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    size='small'
                    sx={{ margin: '0 auto', fontSize: { xs: '0.8rem', sm: '1rem' }, mb: 2 }}>
                    Sign In
                  </Button>
                </form>
                <Typography textAlign='center' mb={2}>Or</Typography>
                <Button
                  fullWidth
                  onClick={handleOtpClick}
                  variant='contained'
                  size='small'
                  sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, mb: 2 }}>
                  Login with OTP
                </Button>
              </>
            }
            {
              (status && !otpStatus) &&
              <form onSubmit={handleSubmit(phoneSubmit)}>
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
                  size='small'
                  label='Phone'
                  fullWidth
                  sx={{ mb: 1 }}
                  placeholder='Enter Phone number' />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  size='small'
                  sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, mb: 2 }}>
                  Submit
                </Button>
              </form>
            }
            {
              otpStatus &&
              <form onSubmit={handleSubmit(otpSubmit)}>
                <TextField
                  name='otp'
                  type='string'
                  {...register('otp', {
                    required: 'This field is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'Please enter a valid OTP'
                    }
                  })}
                  onChange={handleOtpChange}
                  error={!!errors?.otp}
                  helperText={errors?.otp ? errors.otp.message : null}
                  size='small'
                  label='OTP'
                  fullWidth
                  sx={{ mb: 1 }}
                  placeholder='Enter OTP'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  size='small'
                  sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, mb: 2 }}>
                  Submit
                </Button>
              </form>
            }
            <Typography
              textAlign='center'
              fontFamily='Poppins,san-serif'>
              don’t have an account? <Link onClick={handleJoinNow} sx={{ color: 'blue' }}>Join now</Link>
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login