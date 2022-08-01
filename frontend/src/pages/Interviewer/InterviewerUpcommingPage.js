import { Box, Grid } from "@mui/material";
import React from "react";
import UserLayout from "../../Layouts/userLayout";  
import InterAside from "../../components/Interviewer/InterAside";
import InterAllUpcomming from "../../components/Interviewer/Upcomming/InterAllUpcomming";

function InterviewerUpcommingPage() {
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
                display: "flex",
                flexDirection: "column",
              }}>
                  <InterAllUpcomming/>
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

export default InterviewerUpcommingPage