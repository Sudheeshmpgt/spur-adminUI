import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Swal from "sweetalert2";
import axios from "../../../axiosinstance";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Notification({ notificationData }) {
  const [userSubmit, setUserSubmit] = useState(false);
  const [userCancel, setUserCancel] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (id) => {
    navigate("/payment", { state: { id: id } });
  };

  const handleCancel = (id) => {
    const values = {
      requestId: id,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("api/interview/user/cancel", values, {
            headers: {
              authToken: localStorage.getItem("usertoken"),
            },
          })
          .then((res) => {
            console.log(res.data.message);
            setUserCancel(!userCancel);
          });
        Swal.fire(
          "Cancelled!",
          "Interview request has been cancelled.",
          "success"
        );
      }
    });
  };

  useEffect(() => {
    setUserSubmit(notificationData.userConfirmation);
    setUserCancel(notificationData.userCancellation);
  }, [notificationData]);

  return (
    <>
      {(notificationData.confirmed || notificationData.cancelled) && (
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
              Request Notification
            </Typography>
          </Box>
          <Box sx={{ ml: 2, mt: 2 }}>
            {notificationData.confirmed ? (
              <Typography>
                Your request for mock interview is confirmed by{" "}
                {notificationData.interviewerId.name}
              </Typography>
            ) : (
              notificationData.cancelled && (
                <Typography>
                  Your request for mock interview is cancelled by{" "}
                  {notificationData.interviewerId.name}
                </Typography>
              )
            )}
            <Box sx={{ display: "flex" }}>
              <CalendarTodayIcon sx={{ fontSize: 24, mt: 1.5 }} />
              <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                {dayjs(notificationData.date).format("DD/MM/YYYY")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <ScheduleIcon sx={{ fontSize: 25, mt: 1.8 }} />
              <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                {dayjs(notificationData.time).format("hh:mm a")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <CurrencyRupeeIcon sx={{ fontSize: 26, mt: 1.8 }} />
              <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                {notificationData.amount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              {userCancel || notificationData.cancelled ? (
                <Button
                  variant="contained"
                  sx={{ borderRadius: "15px" }}
                  disabled
                >
                  <HighlightOffIcon sx={{fontSize : 25, mr:0.7, color:'#ff3333'}}></HighlightOffIcon>
                  <Typography color='#ff3333' fontSize='1.2rem'>Cancelled</Typography>
                </Button>
              ) : userSubmit ? (
                <Box
                  variant="contained"
                  sx={{ borderRadius: "15px", p:1, display:'flex' }}  
                >
                  <CheckCircleOutlineIcon sx={{fontSize : 25, mr:0.7, color:'green'}}></CheckCircleOutlineIcon>
                  <Typography color='green' fontSize='1.2rem'>Confirmed</Typography>
                </Box>
              ) : (
                <>
                  <Button
                    onClick={() => handleCancel(notificationData._id)}
                    variant="contained"
                    color="error"
                    sx={{ borderRadius: "15px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleSubmit(notificationData._id)}
                    sx={{ ml: 2, mr: 2, borderRadius: "15px" }}
                  >
                    Confirm
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Notification;
