import { Box, Grid } from "@mui/material";
import React from "react";
import Aside from "../../components/User/Aside";
import UserLayout from "../../Layouts/userLayout";
import Payment from "../../components/User/Notification/Payment";

function PaymentPage() {
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
          <Aside />
        </Box>
        <Box
          sx={{
            width: "75%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
          }}>
              <Payment/>
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

export default PaymentPage