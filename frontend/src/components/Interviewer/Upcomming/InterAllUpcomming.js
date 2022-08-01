import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../../axiosinstance";
import { useSelector } from "react-redux";
import '../../common/Scroll.css';
import { useNavigate } from "react-router-dom";
import InterUpcommings from "./InterUpcommings"; 

function InterAllUpcomming() {
    const user = useSelector((state) => state.userData.value);
    const navigate = useNavigate()
    const [upcomming, setupComming] = useState([]) 
  
    useEffect(() => {
        const getupCommingData = () => {
            axios.get(`api/interview/interviewer/upcomming/${user._id}`, {
              headers: {
                authToken: localStorage.getItem("usertoken"),
              },
            })
            .then((res)=>{
              setupComming(res.data.upcomming)
            })
          };
          getupCommingData();
    }, [user]);

    const handleClick = () => {
        navigate('/home')
    }
  
    return (
      <Grid container>
        <Box
          component={Paper}
          width="95%"
          height={550}
          marginTop={10}
          borderRadius="10px"
        >
          <Box
            sx={{
              borderBottom: "1px solid",
              borderColor: "rgba(0, 0, 0, 0.38)",
              minHeight: "35px",
              maxWidth: "96%",
              m: "0 auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontSize={{ xs: "1rem", sm: "1.3rem" }}
              sx={{ mt: 2, mb: 1 }}
            >
              Upcomming Interviews
            </Typography>
            <IconButton onClick={handleClick}>
              <CloseIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Box>
          <Box className="scrollbar-hidden" sx={{overflow:'scroll', height:480, width:'100%'}}>
          {
            upcomming?.map((data)=>(
              <InterUpcommings requestData={data}/>
            ))
          }
          </Box>
        </Box>
      </Grid>
    );
  }


export default InterAllUpcomming