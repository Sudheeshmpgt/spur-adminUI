import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import UserLayout from "../../Layouts/userLayout";
import Aside from "../../components/User/Aside";
import ChatAside from "../../components/Messenger/ChatAside";
import "../../components/common/Scroll.css";
import { useSelector } from "react-redux";
import InterAside from "../../components/Interviewer/InterAside";
import { useNavigate } from "react-router-dom";
import MessengerDetails from "../../components/Messenger/MessengerDetails";

function Messenger() {
  const user = useSelector((state) => state.userData.value);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <UserLayout>
      <Grid>
        {user.interviewer ? (
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
                width: "50%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                mt: 10,
              }}
            >
                <MessengerDetails />
            </Box>
            <Box sx={{ width: "25%" }}>
              <ChatAside />
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
                width: "50%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                mt: 10,
              }}
            >
              <MessengerDetails />
            </Box>
            <Box sx={{ width: "25%" }}>
              <ChatAside />
            </Box>
          </Box>
        )}
      </Grid>
    </UserLayout>
  );
}

export default Messenger;
