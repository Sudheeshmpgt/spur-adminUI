import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import dayjs from "dayjs";
import VideocamIcon from "@mui/icons-material/Videocam";

function InterUpcommings({ requestData }) {
  return (
    <Box
      component={Paper}
      width="85%"
      height="auto"
      bgcolor="secondary.main"
      sx={{ m: "25px auto", p: 2, borderRadius: "15px" }}
    >
      <Box sx={{ display: "flex" }}>
        <Avatar
          src={requestData?.userId?.profileImg}
          sx={{ height: 65, width: 65, zIndex: 0 }}
        ></Avatar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            ml: 2,
            justifyContent: "center",
            borderBottom: "1px solid",
            borderColor: "rgba(0, 0, 0, 0.38)",
          }}
        >
          <Box width="100%">
            <Typography fontSize="1.1rem" fontWeight={600}>
              {requestData?.userId?.name}
            </Typography>
          </Box>
          <Box width="100%">
            <Typography fontSize="0.8rem" sx={{ mb: 1 }}>
              {requestData?.userId?.about}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ ml: 2, mt: 2 }}>
        <Typography>
          Your interview with {requestData?.userId?.name} is scheduled as
          follows,
        </Typography>

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
            {requestData.amount}
          </Typography>
          <Typography fontSize="1.1rem" color="Green" sx={{ mt: 1.5, ml: 1.5 }}>
            (PAID)
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <VideocamIcon sx={{ fontSize: 25, mt: 1.8 }} />
          <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
            {requestData?.link}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography fontSize="0.65rem" color="red" sx={{ mt: 1, ml: 0.4 }}>
            *video call link available before 5 minutes of actual timing
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default InterUpcommings;
