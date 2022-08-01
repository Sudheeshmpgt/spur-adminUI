import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Aside from "../../components/User/Aside";
import "../../components/common/Scroll.css";
import { useSelector } from "react-redux";
import InterAside from "../../components/Interviewer/InterAside";
import { useNavigate } from "react-router-dom";
import Layouts from "../../Layouts/userLayout";
import About from "../../components/About/About";

function AboutPage() {
  const user = useSelector((state) => state.userData.value);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <Layouts>
      <Grid>
        {user?.interviewer ? (
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
              }}
            >
              <About/>
              <Box
                className="scrollbar-hidden"
                width="100%"
                sx={{ mt: -8.0, overflow: "scroll" }}
              ></Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              backgroundColor: "",
              justifyContent: "space-evenly",
            }}
          >
            <Box sx={{ width: "25%", display: "flex", ml: "auto", mr: "auto" }}>
              <Aside />
            </Box>
            <Box
              sx={{
                width: "75%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <About/>
              <Box
                className="scrollbar-hidden"
                width="100%"
                sx={{ mt: -8.0, overflow: "scroll" }}
              ></Box>
            </Box>
          </Box>
        )}
      </Grid>
    </Layouts>
  );
}

export default AboutPage;
