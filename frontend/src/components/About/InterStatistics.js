import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../axiosinstance";

function InterStatistics({userData}) {
  const [postCount, setPostCount] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const getPostData = () => {
      axios
        .get(`api/post/posts/${userData._id}`, {
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
        .get(`api/interview/interviewer/upcomming/${userData._id}`, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          setCompleted(res.data.completedCount);
        });
    };

    getPostData();
    getUpcommingData();
  }, []);

  return (
    <Grid container>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          m: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Typography sx={{mt:1}} fontSize="1.1rem" fontWeight={600}>
            Networks
          </Typography>
          <Typography sx={{mt:1}} fontSize="1.1rem" fontWeight={600}>
            Interviews
          </Typography>
          <Typography sx={{mt:1}} fontSize="1.1rem" fontWeight={600}>
            Posts
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{mt:1}} fontSize="1.1rem" fontWeight={600} color="blue">
            {userData?.connections?.length}
          </Typography>
          <Typography sx={{mt:1}} fontSize="1.1rem" fontWeight={600} color="blue">
            {completed}
          </Typography>
          <Typography sx={{mt:1}} fontSize="1.1rem" fontWeight={600} color="blue">
            {postCount}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

export default InterStatistics;
