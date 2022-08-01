import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../../axiosinstance";
import { useSelector } from "react-redux";
import '../../common/Scroll.css';
import { useNavigate } from "react-router-dom";
import WalletDesign from "./WalletDesign";

function Wallet() {
  const user = useSelector((state) => state.userData.value);
  const navigate = useNavigate()
  const [balance, setBalance] = useState([]) 

  useEffect(() => {
      const getBalanceData = () => {
          axios.get(`/api/interviewer/wallet/${user._id}`, {
            headers: {
              authToken: localStorage.getItem("usertoken"),
            },
          })
          .then((res)=>{
            console.log(res.data)
            setBalance(res.data.balance)
          })
        };
        getBalanceData();
  }, [user]);

  const handleClick = () => {
      navigate('/home')
  }

  return (
    <Grid container>
      <Box
        component={Paper}
        width="95%"
        height={550}
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
            My Wallet
          </Typography>
          <IconButton onClick={handleClick}>
            <CloseIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </Box>
        <Box className="scrollbar-hidden" sx={{overflow:'scroll', height:480, width:'100%'}}>
          <WalletDesign balance={balance}/>
        </Box>
      </Box>
    </Grid>
  );
}


export default Wallet