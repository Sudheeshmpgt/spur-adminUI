import { Box, Grid } from "@mui/material";
import React from "react";
import Dashboard from "../../components/Interviewer/Dashboard/Dashboard";
import InterAside from "../../components/Interviewer/InterAside";
import UserLayout from "../../Layouts/userLayout";

function DashboardPage() {
  return (
    <UserLayout>
    <Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          backgroundColor: "",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ width: "25%", display: "flex", ml: "auto", mr: "auto" }}>
          <InterAside />
        </Box>
        <Box
          sx={{
            width: "75%",
            height: "auto",
          }}>
            <Dashboard/>
          <Box
            className="scrollbar-hidden"
            width="100%"
            sx={{ mt: -8.0, overflow: "scroll" }}
          ></Box>
        </Box>
      </Box>
    </Grid>
  </UserLayout>
  )
}

export default DashboardPage