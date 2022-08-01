import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "../../../axiosinstance"; 
import { useSelector } from "react-redux";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BarChart from './BarChart.js';
import PieChartUser from './PieChartUser';

function DashboardDesign() {
    const [adminProfit, setAdminProfit] = useState(0);
    const [totalUserCount, setTotalUserCount] = useState(0);
    const [revenew, setRevenew] = useState(0);
    const [interviewees, setInterviewees] = useState([])
    const [interviewers, setInterviewers] = useState([])
    const [userAndInter, setUserAndInter] = useState([]) 
    const [posts, setPosts] = useState([]) 

    const user = useSelector((state) => state.userData.value);
    useEffect(()=>{
        axios.get(`/api/chart/admin`,{
            headers: {
                authToken: localStorage.getItem("admintoken"),
              },
        }).then(res=>{
           setAdminProfit(res.data.adminProfit);
           setTotalUserCount(res.data.totalUserCount);
           setRevenew(res.data.revenew);
           setInterviewees(res.data.interviewees);
           setInterviewers(res.data.interviewers);
           setPosts(res.data.posts);
           setUserAndInter(res.data.userAndInter);
        })
    },[])

  return (
    <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3, borderRadius:'15px'}}>
                            <CardContent >
                                <Typography textAlign='center' fontSize='1rem' fontWeight={600}>
                                    Total Users
                                </Typography>
                            </CardContent>
                            <CardContent sx={{backgroundColor:'primary.main'}}>
                                <Typography textAlign='center'  fontSize='1rem' fontWeight={600} >
                                    {totalUserCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ m: 3, borderRadius:'15px'}}>
                            <CardContent >
                                <Typography textAlign='center' fontSize='1rem' fontWeight={600}>
                                    Admin Profit
                                </Typography>
                            </CardContent>
                            <CardContent sx={{backgroundColor:'primary.main',display:'flex', justifyContent:'center'}}>
                            <CurrencyRupeeIcon sx={{fontSize:18, mt:0.2}}/>
                                <Typography textAlign='center'  fontSize='1rem' fontWeight={600} >
                                   {adminProfit}
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
                            <PieChartUser datas = {userAndInter} /> 
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Card sx={{m:3, height:'90%', width:'90%' }}>
                            <BarChart data={posts} />
                        </Card>
                    </Grid>
                </Grid>
  )
}

export default DashboardDesign