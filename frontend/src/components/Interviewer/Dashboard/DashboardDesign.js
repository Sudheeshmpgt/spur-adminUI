import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "../../../axiosinstance"; 
import { useSelector } from "react-redux";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BarChart from './BarChart';
import LineChart from './LineChart';

function DashboardDesign() {

    const [request, setRequest] = useState(0);
    const [interview, setInterview] = useState(0);
    const [revenew, setRevenew] = useState(0);
    const [orderStatus, setOrderStatus] = useState([])
    const [orderStatusValue, setOrderStatusValue] = useState([])
    const [walletStatus, setWalletStatus] = useState([]) 
    const [walletStatusValue, setWalletStatusValue] = useState([]) 

    const user = useSelector((state) => state.userData.value);
    useEffect(()=>{
        axios.get(`/api/chart/interviewer/${user._id}`,{
            headers: {
                authToken: localStorage.getItem("usertoken"),
              },
        }).then(res=>{
            setRequest(res.data.requests);
            setInterview(res.data.interviews);
            setRevenew(res.data.revenew); 
            setOrderStatus(res.data.orderStatus)
            setOrderStatusValue(res.data.orderStatusValue)
            setWalletStatus(res.data.walletStatus)
            setWalletStatusValue(res.data.walletStatusValue)
            
        })
    },[])

  return (
    <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3, borderRadius:'15px'}}>
                            <CardContent >
                                <Typography textAlign='center' fontSize='1rem' fontWeight={600}>
                                    Requests
                                </Typography>
                            </CardContent>
                            <CardContent sx={{backgroundColor:'primary.main'}}>
                                <Typography textAlign='center'  fontSize='1rem' fontWeight={600} >
                                    {request}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3, borderRadius:'15px'}}>
                            <CardContent >
                                <Typography textAlign='center' fontSize='1rem' fontWeight={600}>
                                    Interviews
                                </Typography>
                            </CardContent>
                            <CardContent sx={{backgroundColor:'primary.main'}}>
                                <Typography textAlign='center'  fontSize='1rem' fontWeight={600} >
                                   {interview}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3, borderRadius:'15px'}}>
                            <CardContent >
                                <Typography textAlign='center' fontSize='1rem' fontWeight={600}>
                                    Revenue
                                </Typography>
                            </CardContent>
                            <CardContent sx={{backgroundColor:'primary.main', display:'flex', justifyContent:'center'}}>
                            <CurrencyRupeeIcon sx={{fontSize:18, mt:0.2}}/>
                                <Typography textAlign='center'  fontSize='1rem' fontWeight={600} >
                                       {revenew} 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{m:3, height:'90%', width:'90%' }}>  
                            <LineChart data = {orderStatusValue} value = {orderStatus} />
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Card sx={{m:3, height:'90%', width:'90%' }}>
                            <BarChart data = {walletStatusValue} value = {walletStatus} />
                        </Card>
                    </Grid>
                   
                </Grid>
  )
}

export default DashboardDesign