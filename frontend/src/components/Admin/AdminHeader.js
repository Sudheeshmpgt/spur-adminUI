import { Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Paper, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { adminLogin } from '../../Redux/Features/adminData'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function AdminHeader() {
    const admin = useSelector(state => state.adminData.value)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
    const token = localStorage.getItem("admintoken")
    setToken(token)
    if(!token){
        navigate("/") 
    }
    },[])

    const logout = () => {
        handleCloseUserMenu();
        dispatch(adminLogin(''))
        localStorage.removeItem("admintoken")
        navigate('/')
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleJoinNow = () => {
        navigate('/register');
        handleCloseNavMenu();
    }

    const handleSignIn = () => {
        navigate('/login');
        handleCloseNavMenu();
    }

    const handleProfile = () => {
        navigate('/profile');
        handleCloseUserMenu();
    }

    return (
        <Box sx={{ width: '100%', position: 'fixed', zIndex: '1' }}>
            <Box sx={{ backgroundColor: '#80c7ff' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Abril Fatface, cursive',
                                fontSize: '2.3rem',
                                fontWeight: 700,
                                letterSpacing: '0.15rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                textShadow: '2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3)'
                            }}
                        >
                            Spur
                        </Typography>
                        <Typography
                            variant="p"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'Abril Fatface, cursive',
                                fontSize: '1.4rem',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Spur
                        </Typography>
                        {
                            !admin._id ? ( 
                                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={handleJoinNow}
                                        sx={{
                                            ml: 2, color: 'text.primary', display: 'block', fontSize: {
                                                xs: '1rem', md: '1rem'
                                            }
                                        }}
                                    >Join Now
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={handleSignIn}
                                        sx={{
                                            ml: 2, color: 'text.primary', display: 'block', fontSize: {
                                                xs: '1rem', md: '1rem'
                                            }
                                        }}
                                    >Sign In
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Box component={Paper} sx={{
                                                display:'flex',
                                                justifyContent:'center',
                                                ml:-1.6,
                                                mr: 2,
                                                width: 90,
                                                height: 'auto',
                                                p: 0.7,
                                                backgroundColor: '#cce8ff',
                                                borderRadius: 3,
                                            }}><Typography fontWeight={700} fontSize={{sm:'0.9rem'}} cololr='text.primary'>Admin</Typography>
                                            <ArrowDropDownIcon sx={{fontSize:20, ml:1}}/>
                                            </Box>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        
                                            {/* <MenuItem onClick={handleProfile}>
                                                <Typography textAlign="center">Profile</Typography>
                                            </MenuItem> */}
                                            <MenuItem onClick={logout}>
                                                <Typography textAlign="center">logout</Typography>
                                            </MenuItem>
                                       
                                    </Menu>
                                </Box>
                            )
                        }

                    </Toolbar>
                </Container>
            </Box>
        </Box>
    )
}

export default AdminHeader