import { Box, Grid, Paper, Typography } from "@mui/material";
import "../common/Scroll.css";
import React, { useEffect } from "react";
import Conversations from "./Conversations";
import { useSelector } from "react-redux";
import axios from "../../axiosinstance";
import { useNavigate } from "react-router-dom";

function ChatAside() {
  const user = useSelector((state) => state.userData.value);
  const navigate = useNavigate();
  const [conversation, setConversation] = React.useState([]);

  useEffect(() => {
    const getConversations = async () => {
      axios
        .get(`api/conversations/${user._id}`, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          setConversation(res.data.conversation);
        });
    };
    getConversations();
  }, [user]);

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
            <Paper
              elevation={5}
              sx={{
                width: "80%",
                height: 55,
                m: "-35px auto",
                borderRadius: "10px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 55,
                  backgroundColor: "primary.main",
                  borderRadius: "10px",
                }}
              ></Box>
              <Typography
                textAlign="center"
                fontSize={{ sm: "1.25rem" }}
                fontWeight={500}
                sx={{ color: "text.primary", mt: -5 }}
              >
                Messaging
              </Typography>
            </Paper>
            <Box width="100%" sx={{ mt: "70px" }}></Box>
            <Box
              className="scrollbar-hidden"
              width="90%"
              m="0px auto"
              sx={{ overflow: "scroll" }}
            >
              {conversation.map((data, index) => (
                <Box
                  key={index}
                  onClick={() =>
                    navigate("/messenger", { state: { chat: data } })
                  }
                  sx={{ cursor: "pointer" }}
                >
                  <Conversations conversation={data} currentUser={user} />
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default ChatAside;
