import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import '../../common/Scroll.css';
import { useNavigate } from "react-router-dom";
import DashboardDesign from "./DashboardDesign";

function Dashboard() {
    const navigate = useNavigate()
  
    useEffect(() => {
        const token = localStorage.getItem("admintoken")
        if(!token){
            navigate("/admin/login")
        }
    }, []);
  
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
              My Dashboard
            </Typography>
          </Box>
          <Box className="scrollbar-hidden" sx={{overflow:'scroll', height:480, width:'100%'}}>
            <DashboardDesign/>
          </Box>
        </Box>
      </Grid>
    );
  }

export default Dashboard