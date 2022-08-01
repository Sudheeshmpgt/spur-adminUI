import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosinstance";

function InterAside() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.value);
  const [name, setName] = useState("");
  const [postCount, setPostCount] = useState(0);
  const [upcomming, setUpcomming] = useState(0);
  

  const handleRequestClick = () => {
    navigate("/requests");
  };

  const handleUpcommingClick = () => {
    navigate("/upcommings");
  };

  const handleManageRequestClick = () => {
    navigate("/interview/management");
  };

  const handleReportClick = () => {
    navigate("/report");
  };

  const handlePostClick = () => {
    navigate('/posts')
  }

  const handleDashboardClick = () => {
    navigate('/dashboard')
  }
 
  useEffect(() => {
    const getPostData = () => {
      axios
        .get(`api/post/posts/${user._id}`, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          setPostCount(res.data.postsCount);
        });
    };

    const getUpcommingData = () => {
      axios
        .get(`api/interview/interviewer/upcomming/${user._id}`, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          setUpcomming(res.data.upcommingCount);
        });
    };

    getPostData();
    getUpcommingData();
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      navigate("/");
    } else {
      const name = localStorage.getItem("userName");
      setName(name);
    }
  }, [navigate]);

  return (
    <Grid container>
      <Box width="100%">
        <Paper
          sx={{
            m: "80px auto",
            elevalation: 10,
            borderRadius: "15px",
            width: "72%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 490,
              backgroundColor: "secondary.main",
              borderRadius: "15px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 80,
                backgroundColor: "white",
                borderRadius: "15px 15px 0 0",
              }}
            ></Box>
            <Avatar
              src={user && user.profileImg}
              sx={{ width: 120, height: 120, m: "-55px auto", elevation: 10 }}
            />
            <Box
              width="90%"
              borderBottom={1}
              borderColor="rgba(0, 0, 0, 0.38)"
              m="0 auto"
            >
              <Typography
                fontSize={{ sm: "1.1rem" }}
                fontWeight={600}
                mt="60px"
                textAlign="center"
                fontFamily="Poppins, sans-serif"
              >
                {user.name ? user.name : name}
              </Typography>
              <Typography
                fontSize={{ sm: "0.9rem" }}
                color="#757575"
                textAlign="center"
                mb={1}
              >
                {user && user.about}
              </Typography>
            </Box>
            <Box
              width="90%"
              borderBottom={1}
              borderColor="rgba(0, 0, 0, 0.38)"
              m="0 auto"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Typography fontSize={{ sm: "1rem" }} mt={2}>
                  Networks
                </Typography>
                <Typography fontSize={{ sm: "1rem" }} mt={2}>
                  {user ? user.connections?.length : 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Typography onClick={handlePostClick} fontSize={{ sm: "1rem" }} mt={1} mb={1} sx={{cursor:'pointer'}}>
                  My Posts
                </Typography>
                <Typography fontSize={{ sm: "1rem" }} mt={1} mb={1}>
                  {postCount ? postCount : 0}
                </Typography>
              </Box>
            </Box>
            <Box
              width="90%"
              borderBottom={1}
              borderColor="rgba(0, 0, 0, 0.38)"
              m="0 auto"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Typography
                  onClick={handleUpcommingClick}
                  fontSize={{ sm: "1rem", cursor: "pointer" }}
                  mt={2}
                >
                  Upcoming
                </Typography>
                <Typography fontSize={{ sm: "1rem" }} mt={2}>
                  {upcomming}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Typography
                  onClick={handleRequestClick}
                  fontSize={{ sm: "1rem", cursor: "pointer" }}
                  mt={1}
                  mb={1}
                >
                  Requests
                </Typography>
              </Box>
            </Box>
            <Box width="90%" m="0 auto">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Typography   onClick={handleDashboardClick} fontSize={{ sm: "1rem", cursor: "pointer" }} mt={2}>
                  Dashboard
                </Typography>
                {/* <Typography fontSize={{ sm: '1rem' }} mt={2} >5</Typography> */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Typography
                  onClick={handleManageRequestClick}
                  fontSize={{ sm: "1rem", cursor: "pointer" }}
                  mt={1}
                >
                  Manage Requests
                </Typography>
                {/* <Typography fontSize={{ sm: '1rem' }} mt={1} >3</Typography> */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Typography
                  onClick={handleReportClick}
                  fontSize={{ sm: "1rem", cursor: "pointer" }}
                  mt={1}
                  mb={1.5}
                >
                  Report
                </Typography>
                {/* <Typography fontSize={{ sm: '1rem' }} mt={1} mb={1.5} >0</Typography> */}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default InterAside;
