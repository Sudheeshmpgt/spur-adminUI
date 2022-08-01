import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import axios from "../../axiosinstance";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";

function Aside() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.value);

  const [postCount, setPostCount] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

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
        .get(`api/interview//user/upcomming/${user._id}`, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          setPending(res.data.pendingCount);
          setCompleted(res.data.completedCount);
        });
    };

    getPostData();
    getUpcommingData();
  }, [user]);

  const handleClickNotification = () => {
    navigate("/notifications");
  };

  const handleClickUpcomming = () => {
    navigate("/upcomming");
  };

  const handleClickPosts = () => {
    navigate('/posts')
  }

  const handleClickInterviews = () => {
    navigate('/interviews')
  }

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
              height: 480,
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
            <Paper sx={{ width: 120, m: "0 auto", borderRadius: 15 }}>
              <Avatar
                src={user && user?.profileImg}
                sx={{ width: 120, height: 120, m: "-55px auto", elevation: 10 }}
              />
            </Paper>
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
                {user?.name }
              </Typography>
              <Typography
                fontSize={{ sm: "0.9rem" }}
                color="#757575"
                textAlign="center"
                mb={1}
              >
                {user && user?.about}
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
                  {user?.connections?.length}
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
                <Typography fontSize={{ sm: "1rem" }} mt={1} mb={2}>
                  Pending Requests
                </Typography>
                <Typography fontSize={{ sm: "1rem" }} mt={1} mb={2}>
                  {pending}
                </Typography>
              </Box>
            </Box>
            <Box width="90%" m="0 auto">
              <Box
                sx={{
                  width: "80%",
                  m: "0 auto",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box width="20%">
                  <NotificationsActiveIcon sx={{ fontSize: 23, mt: 2 }} />
                </Box>
                <Box width="65%">
                  <Typography
                    onClick={handleClickNotification}
                    textAlign="left"
                    fontSize={{ sm: "1rem", cursor: "pointer" }}
                    mt={2}
                  >
                    Notifications
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Box width="20%">
                  <UpcomingIcon sx={{ fontSize: 23, mt: 2 }} />
                </Box>
                <Box width="65%">
                  <Typography
                    onClick={handleClickUpcomming}
                    fontSize={{ sm: "1rem", cursor: "pointer" }}
                    mt={2}
                  >
                    Upcomming
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Box width="20%">
                  <DynamicFeedIcon sx={{ fontSize: 23, mt: 2 }} />
                </Box>
                <Box width="65%">
                  <Typography onClick={handleClickPosts} fontSize={{ sm: "1rem", cursor:"pointer" }} mt={2}>
                    My Posts
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Box width="20%">
                  <SensorOccupiedIcon sx={{ fontSize: 23, mt: 2 }} />
                </Box>
                <Box width="65%">
                  <Typography onClick={handleClickInterviews} fontSize={{ sm: "1rem", cursor:"pointer" }} mt={2}>
                    My Interviews
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default Aside;
