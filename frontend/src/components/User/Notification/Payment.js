import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../../axiosinstance";
import { useSelector } from "react-redux";
import Toast from "../../Sweetalert/sweetAlert";
import "../../common/Scroll.css";
import { useNavigate, useLocation } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import VideocamIcon from "@mui/icons-material/Videocam";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import dayjs from "dayjs";

function Payment() {
  const user = useSelector((state) => state.userData.value);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const [request, setRequest] = useState({});

  function loadRazorpay(id) {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onerror = () => {
        console.log('Razorpay SDK failed to load. Are you online?');
    }
    script.onload = async () => {
        try {
            setLoading(true)
            const result = await axios.post('/api/payment/create_order', {
                amount: request.amount + '00',
            }, {
                headers: {
                    'authToken': localStorage.getItem("usertoken"),
                }
            })
            const { amount, id: order_id, currency } = result.data
            const {
                data: { key: razorpayKey }
            } = await axios.get('/api/payment/get_key', {
                headers: {
                    'authToken': localStorage.getItem("usertoken"),
                }
            })
            const options = {
                key: razorpayKey,
                amount: amount.toString(),
                currency: currency,
                name: 'example name',
                description: 'example transaction',
                order_id: order_id,
                handler: async function (response) {
                    const result = await axios.post('/api/payment/pay_order', {
                        amount: amount,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_Signature,
                    }, {
                        headers: {
                            'authToken': localStorage.getItem("usertoken"),
                        }
                    })
                        .then((res) => {
                            const message = res.data.message
                            if (message === 'Payment was successful') {
                                confirmRequest(id);
                            }
                        })
                },
                prefill: {
                    name: 'example name',
                    email: 'email@example.com',
                    contact: '1111111111',
                }, notes: {
                    address: 'example address'
                }, theme: {
                    color: '#FF5A09'
                }
            }
            setLoading(false)
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        } catch (error) {
            setLoading(false)
        }
    }
    document.body.appendChild(script);
}

const confirmRequest =( id) =>{
  const values = {
    requestId: id,
  };
  
  if (id) {
    axios
      .put("api/interview/user/confirm", values, {
        headers: {
          authToken: localStorage.getItem("usertoken"),
        },
      })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Payment successfull",
        });
        navigate('/notifications')
      });
  } else {
    Toast.fire({
      icon: "error",
      title: "Something went wrong",
    });
  }
} 

  const handleSubmit = (id) => {
    loadRazorpay(id);
  };

  useEffect(() => {
    const id = location.state.id;
    axios
      .get(`api/interview//user/request/${id}`, {
        headers: {
          authToken: localStorage.getItem("usertoken"),
        },
      })
      .then((res) => {
        setRequest(res.data.requests);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      });
  }, [location.state.id]);

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <Grid container>
      <Box
        component={Paper}
        width="95%"
        height={490}
        marginTop={10}
        borderRadius="10px"
      >
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: "rgba(0, 0, 0, 0.38)",
            minHeight: "35px",
            maxWidth: "96%",
            m: "0 auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            fontSize={{ xs: "1rem", sm: "1.3rem" }}
            sx={{ mt: 2, mb: 1 }}
          >
            Request Confirmation
          </Typography>
          <IconButton onClick={handleClick}>
            <CloseIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </Box>
        <Box sx={{ width: "90%", m: "10px auto" }}>
          <Box sx={{ display: "flex" }}>
            <Avatar
              src={request?.interviewerId?.profileImg}
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
                  {request?.interviewerId?.name}
                </Typography>
              </Box>
              <Box width="100%">
                <Typography fontSize="0.8rem" sx={{ mb: 1 }}>
                  {request?.interviewerId?.about}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ ml: 8.5, mt: 2 }}>
            <Typography fontSize='1.1rem' sx={{mt:2, mb: 1 }}>
              Your request for mock interview is confirmed by{" "}
              {request?.interviewerId?.name}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <CalendarTodayIcon sx={{ fontSize: 25, mt: 1.5 }} />
              <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                {dayjs(request?.date).format("MMM DD, YYYY")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <ScheduleIcon sx={{ fontSize: 25, mt: 1.8 }} />
              <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                {dayjs(request?.time).format("hh:mm a")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <CurrencyRupeeIcon sx={{ fontSize: 26, mt: 1.8 }} />
              <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                {request?.amount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <VideocamIcon sx={{ fontSize: 25, mt: 1.8 }} />
              <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                {request?.link}
              </Typography>
            </Box>
            <Box >
              <Typography fontSize="1.3rem" sx={{ mt: 1.4, ml: 0.4, color:'green' }}>
                 Total : <CurrencyRupeeIcon sx={{ fontSize: 16, mt: 1.4 }} /> {request?.amount} 
              </Typography>
            </Box>
            <Box >
              <Typography fontSize="0.65rem" color='red' sx={{ mt: 1, ml: 0.4 }}>
              *video call link available before 5 minutes of actual timing
              </Typography>
            </Box>
            <Box width="100%" sx={{ ml: "89%", mt: 3 }}>
              <Button
                variant="contained"
                onClick={() => handleSubmit(request._id)}
                sx={{ borderRadius: "15px" }}
              >
                Pay Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default Payment;
