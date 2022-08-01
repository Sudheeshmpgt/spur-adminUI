import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import dayjs from "dayjs";
import PreviewIcon from "@mui/icons-material/Preview";
import { useNavigate } from "react-router-dom";

function CompletedInterviews({ requestData }) {
  const navigate = useNavigate()
  
  const handleClickFeedback = () => {
    navigate('/user/feedback', {state:{file : requestData.feedback}})
  };

  return (
    <>
      <Box
        component={Paper}
        width="85%"
        height="auto"
        bgcolor="secondary.main"
        sx={{ m: "25px auto", p: 2, borderRadius: "15px" }}
      >
        <Box
          sx={{
            ml: 2,
          }}
        >
          <Typography
            fontSize="1.25rem"
            fontWeight={600}
            sx={{
              borderBottom: "1px solid",
              borderColor: "rgba(0, 0, 0, 0.38)",
            }}
          >
            Interview Details
          </Typography>
        </Box>
        <Box sx={{ ml: 2, mt: 2 }}>
          <Box sx={{ display: "flex" }}>
            <CalendarTodayIcon sx={{ fontSize: 24, mt: 1.5 }} />
            <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
              {dayjs(requestData.date).format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <ScheduleIcon sx={{ fontSize: 25, mt: 1.8 }} />
            <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
              {dayjs(requestData.time).format("hh:mm a")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <CurrencyRupeeIcon sx={{ fontSize: 26, mt: 1.8 }} />
            <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
              {requestData.interviewerFee}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <PreviewIcon sx={{ fontSize: 26, mt: 1.8 }} />
            <Typography
              onClick={handleClickFeedback}
              fontSize="1.1rem"
              sx={{ mt: 1.5, ml: 1.5, color: "blue", cursor: "pointer" }}
            >
              Feedback notes
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography>
              Your Interview with {requestData.interviewerId.name} is completed
              Successfully on {dayjs(requestData.date).format("MMM DD, YYYY")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CompletedInterviews;
