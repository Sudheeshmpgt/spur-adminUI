import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "../../axiosinstance";
import "../common/Scroll.css";
import { useLocation, useNavigate } from "react-router-dom";
import Statistics from "./Statistics";
import InterStatistics from "./InterStatistics";
import UserDetails from "./UserDetails";
import Postsview from "./Postsview";

function About() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [postViewStatus, setPostViewStatus] = useState(false);

  useEffect(() => {
    console.log("hii");
    const id = location.state.id;
    const getUserDataData = () => {
      axios
        .get(`api/user/details/${id}`, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          setUserData(res.data.user);
        });
    };
    getUserDataData();
  }, []);

  const goBack = () => {
    navigate("/home");
  };

  const handlePostViews = () => {
    setPostViewStatus(!postViewStatus);
  };

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
          component={Paper}
          sx={{
            m: "0 auto",
            width: "100%",
            height: 550,
            backgroundColor: "secondary.main",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              height: 80,
              width: "100%",
              backgroundColor: "white",
              borderRadius: "15px 15px 0 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              variant="text"
              onClick={goBack}
              sx={{ mt: -2, ml: 2, color: "text.primary", fontSize: 13 }}
            >
              <ArrowBackIcon sx={{ fontSize: 20 }} /> Go Back
            </IconButton>
          </Box>
          <Paper
            sx={{
              width: 150,
              height: 150,
              mt: -7,
              ml: "auto",
              mr: "auto",
              borderRadius: "50%",
            }}
          >
            <Avatar
              alt="profile"
              src={userData?.profileImg}
              sx={{ m: "0 auto", width: 150, height: 150 }}
            ></Avatar>
          </Paper>
          <Typography
            sx={{
              textAlign: "center",
              mt: 1,
              fontSize: { sm: "1.3rem" },
              fontWeight: 700,
            }}
          >
            {userData && userData.name}
          </Typography>
          <Typography sx={{ textAlign: "center", mt: 0.4, fontSize: "0.9rem" }}>
            {userData && userData.about}
          </Typography>
          {userData.interviewer && (
            <Typography
              sx={{
                textAlign: "center",
                mt: 0.4,
                fontSize: "0.9rem",
                color: "red",
              }}
            >
              Interviewer
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "30%",
                height: 100,
                m: "0 auto",
              }}
            >
              <UserDetails userData={userData} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "30%",
                m: "0 auto",
              }}
            >
              {userData.interviewer ? (
                <InterStatistics userData={userData} />
              ) : (
                <Statistics userData={userData} />
              )}
            </Box>
          </Box>
          {/* <Box sx={{ display: "flex", mt: -10, ml: "45%" }}>
            <Box sx={{ mt: 0.9 }}>
              <Typography>View Posts</Typography>
            </Box>
            <Box sx={{ ml: 1 }}>
              <Switch onClick={handlePostViews}></Switch>
            </Box>
          </Box>
          {postViewStatus && <Box><Postsview user={userData}/></Box>} */}
        </Box>
      </Box>
    </Grid>
  );
}

export default About;
