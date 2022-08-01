import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Toast from "../../Sweetalert/sweetAlert";
import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import VideocamIcon from "@mui/icons-material/Videocam";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import axios from "../../../axiosinstance";

function Request({ requestData }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [submit, setSubmit] = useState(false);
  const [cancel, setCancel] = useState(false);

  const handleTimeChange = (newValue) => {
    setTime(newValue);
  };
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (id) => {
    const values = {
      requestId: id,
      time: time,
      date: date,
      link: link,
    };
    if ((id, time, date, link)) {
      axios
        .put("api/interview/schedule", values, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          console.log(res.data.message);
          setSubmit(!submit);
        });
    } else {
      Toast.fire({
        icon: "error",
        title: "Please fill all the details",
      });
    }
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
          .post("api/interview/cancel", values, {
            headers: {
              authToken: localStorage.getItem("usertoken"),
            },
          })
          .then((res) => {
            console.log(res.data.message);
            setCancel(!cancel);
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
    setSubmit(requestData.confirmed);
    setCancel(requestData.cancelled);
  }, [requestData]);

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
          src={requestData.userId.profileImg}
          sx={{ height: 55, width: 55, zIndex: 0 }}
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
            <Typography fontSize="1rem">{requestData.userId.name}</Typography>
          </Box>
          <Box width="100%">
            <Typography fontSize="0.8rem" sx={{ mb: 1 }}>
              {requestData.userId.about}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ ml: 8.5, mt: 2 }}>
        <Typography>{requestData?.request}</Typography>
        <Box sx={{ display: "flex" }}>
          <EmailIcon sx={{ fontSize: 25, mt: 1.2 }} />
          <Typography fontSize="1.1rem" sx={{ mt: 1, ml: 1.5 }}>
            {requestData.userId.email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <PhoneIcon sx={{ fontSize: 25, mt: 1.2 }} />
          <Typography fontSize="1.1rem" sx={{ mt: 1, ml: 1.5 }}>
            {requestData.userId.phone}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <CalendarTodayIcon sx={{ fontSize: 25, mt: 1.5 }} />
          {requestData.confirmed ? (
            <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
              {dayjs(requestData.date).format("MMM, DD YYYY")}
            </Typography>
          ) : (requestData.cancelled ? (<Box  sx={{ mt: 2, ml: 1.5}} > - </Box>) : (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Date"
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    component={Paper}
                    size="small"
                    sx={{ mt: 1, ml: 1.5, width: 190, borderRadius: "5px" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          ))}
        </Box>
        <Box sx={{ display: "flex" }}>
          <ScheduleIcon sx={{ fontSize: 25, mt: 1.8 }} />
          {requestData.confirmed ? (
            <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
              {dayjs(requestData.time).format("hh:mm a")}
            </Typography>
          ) : ( requestData.cancelled ? (<Box  sx={{ mt: 2, ml: 1.5}} > - </Box>) : (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time"
                value={time}
                onChange={handleTimeChange}
                renderInput={(params) => (
                  <TextField
                    component={Paper}
                    size="small"
                    sx={{ mt: 1, ml: 1.5, width: 190, borderRadius: "5px" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          ))}
        </Box>
        <Box sx={{ display: "flex" }}>
          <VideocamIcon sx={{ fontSize: 25, mt: 1.8 }} />
          {requestData.confirmed ? (
            <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
              {requestData.link}
            </Typography>
          ) : (requestData.cancelled ? (<Box  sx={{ mt: 2, ml: 1.5}} > - </Box>) : (
            <TextField
              size="small"
              onChange={(e) => handleLinkChange(e)}
              component={Paper}
              sx={{ mt: 1, ml: 1.5, width: 190, borderRadius: "5px" }}
            ></TextField>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {cancel ? (
            <Button
            variant="contained"
            sx={{ borderRadius: "15px" }}
            disabled
          >
            <HighlightOffIcon sx={{fontSize : 25, mr:0.7, color:'#ff3333'}}></HighlightOffIcon>
            <Typography color='#ff3333' fontSize='1.2rem'>Cancelled</Typography>
          </Button>
          ) : submit ? (
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
                onClick={() => handleCancel(requestData._id)}
                variant="contained"
                color="error"
                sx={{ borderRadius: "15px" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSubmit(requestData._id)}
                sx={{ ml: 2, mr: 2, borderRadius: "15px" }}
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Request;
