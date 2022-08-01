import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import Toast from '../Sweetalert/sweetAlert'
import axios from '../../axiosinstance'
import { useNavigate } from 'react-router-dom'

function PasswordChange() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const changeOnSubmit = (data) => {
        const {email, password, confirmPassword} = data
        if(email && password && (password === confirmPassword)){
            axios.put('api/user/change/credentials', data, {
                headers: {
                    'authToken': localStorage.getItem("usertoken"),
                } 
            })
            .then((res)=>{
                const message = res.data.message
                    navigate('/login')
                    Toast.fire({
                        icon: 'success',
                        title: message
                    })
            })
            .catch((err)=>{
                Toast.fire({
                    icon: 'error',
                    title: "Some thing went wrong"
                })
            })
        }else{
            Toast.fire({
                icon: 'error',
                title: "Invalid Credentials"
            })
        }

    };

    return (
        <Box width='90%' height='auto' sx={{m:'20px auto'}}>
            <form onSubmit={handleSubmit(changeOnSubmit)} autoComplete='off'>
                <TextField
                   sx={{ mt: 1 }}
                   size='small'
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
                    label='Email'
                    placeholder='Enter Email'
                    fullWidth />
                <TextField
                   sx={{ mt: 1 }}
                   size='small'
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
                    label='New Password'
                    placeholder='Enter new password'
                    fullWidth />
                <TextField
                   sx={{ mt: 1 }}
                   size='small'
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
                    label='Confirm Password'
                    placeholder='Confirm new password'
                    fullWidth />
                <Button
                    sx={{ marginTop: 1, marginBottom:3, fontSize: 16, fontWeight: 600 }}
                    type='submit'
                    variant="contained"
                    fullWidth>Submit</Button>
            </form>
        </Box>
    )
}

export default PasswordChange