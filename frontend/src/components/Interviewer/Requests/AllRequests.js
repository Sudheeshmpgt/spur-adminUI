import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Request from "./Request";
import axios from "../../../axiosinstance";
import { useSelector } from "react-redux";
import Toast from "../../Sweetalert/sweetAlert";
import {useNavigate} from 'react-router-dom'

function AllRequests() {
  const user = useSelector((state) => state.userData.value);
  const [request, setRequest] = useState([]) 
  const navigate = useNavigate()

  const handleCloseClick =() =>{
    navigate('/home')
  }

  useEffect(() => {
    axios
      .get(`api/interview/${user._id}`, {
        headers: {
          authToken: localStorage.getItem("usertoken"),
        },
      })
      .then((res) => {
        setRequest(res.data.requests);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      });
  }, [user]);

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
            Requests
          </Typography>
          <IconButton onClick={handleCloseClick}>
            <CloseIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </Box>
        <Box className="scrollbar-hidden" sx={{overflow:'scroll', height:480, width:'100%'}}>
        {
          request?.map((data)=>(
            <Request requestData={data}/>
          ))
        }
        </Box>
      </Box>
    </Grid>
  );
}

export default AllRequests;
