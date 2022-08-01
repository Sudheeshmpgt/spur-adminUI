import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';

function AdminAside() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleUsersClick = () => {
    navigate("/admin/user");
  };

  const handleInterviewersClick = () => {
    navigate("/admin/interviewer")
  };

  const handleInterviewClick = () => {
    navigate("/admin/interview")
  }

  const handleReportClick = () => {
    navigate("/admin/report")
  }

  const handleDashboardClick = () => {
    navigate("/admin/dashboard")
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
              height: "65vh",
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
            <Box
              component={Paper}
              width="80%"
              height="auto"
              sx={{
                padding: 1,
                backgroundColor: "primary.main",
                ml: "auto",
                mr: "auto",
                mt: -3,
                borderRadius: 3,
              }}
            >
              <Typography
                fontSize={{ sm: "1.1rem" }}
                fontWeight={600}
                textAlign="center"
                fontFamily="Poppins, sans-serif"
              >
                Admin
              </Typography>
            </Box>
            <Box width="90%" m="25px auto">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  m: "0 auto",
                }}
              >
                <Box width="30%">
                  <DashboardIcon sx={{ fontSize: 23, mt: 2.25, mb: 1 }} />
                </Box>
                <Box width="70%" onClick={handleDashboardClick} sx={{cursor:"pointer"}}>
                  <Typography fontSize={{ sm: "1.25rem" }} mt={2}>
                    Dashboard
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
                <Box width="30%">
                  <AssignmentIndIcon sx={{ fontSize: 25, mt: 2.25, mb: 1 }} />
                </Box>
                <Box onClick={handleInterviewersClick} sx={{cursor:'pointer'}} width="70%">
                  <Typography fontSize={{ sm: "1.25rem" }} mt={2}>
                    Interviewers
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
                <Box width="30%">
                  <SupervisedUserCircleIcon
                    sx={{ fontSize: 25, mt: 2.25, mb: 1 }}
                  />
                </Box>
                <Box  onClick={handleUsersClick} width="70%">
                    <Typography
                      fontSize={{ sm: "1.25rem" }}
                      mt={2}
                      sx={{cursor:'pointer'}}
                    >
                      Users
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
                <Box width="30%">
                  <SensorOccupiedIcon sx={{ fontSize: 25, mt: 2.25, mb: 1 }} />
                </Box>
                <Box width="70%" onClick={handleInterviewClick} sx={{cursor:"pointer"}}>
                  <Typography textAlign="" fontSize={{ sm: "1.25rem" }} mt={2}>
                    Interviews
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
                <Box width="30%">
                  <AssignmentIcon sx={{ fontSize: 25, mt: 2.25, mb: 1 }} />
                </Box>
                <Box width="70%" onClick={handleReportClick} sx={{cursor:"pointer"}}>
                  <Typography textAlign="" fontSize={{ sm: "1.25rem" }} mt={2}>
                    Report
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

export default AdminAside;
