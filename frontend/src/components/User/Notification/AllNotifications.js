import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../../axiosinstance";
import { useSelector } from "react-redux";
import Toast from "../../Sweetalert/sweetAlert";
import Notification from "./Notification";
import '../../common/Scroll.css'
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import {notification} from "../../../Redux/Features/notificationData"

function AllNotifications() {
    const user = useSelector((state) => state.userData.value);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState([]) 
  
    useEffect(() => {
      axios 
        .get(`api/interview/user/${user._id}`, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          setNotifications(res.data.requests);
          dispatch(notification(res.data.requests))
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Something went wrong",
          });
        });
    }, [user, dispatch]);

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
              Notifications
            </Typography>
            <IconButton onClick={handleClick}>
              <CloseIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Box>
          <Box className="scrollbar-hidden" sx={{overflow:'scroll', height:480, width:'100%'}}>
          {
            notifications?.map((data)=>(
              <Notification notificationData={data}/>
            ))
          }
          </Box>
        </Box>
      </Grid>
    );
  }

export default AllNotifications