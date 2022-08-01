import { Box, Grid } from "@mui/material";
import React from "react";
import InterAside from "../../components/Interviewer/InterAside";
import Wallet from "../../components/Interviewer/Wallet/Wallet"
import UserLayout from "../../Layouts/userLayout";

function WalletPage() {
  
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
              <InterAside />
            </Box>
            <Box
              sx={{
                width: "75%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
              }}>
                <Wallet/>
              <Box
                className="scrollbar-hidden"
                width="100%"
                sx={{ mt: -8.0, overflow: "scroll" }}
              ></Box>
            </Box>
          </Box>
        </Grid>
      </UserLayout>
    );
  }

export default WalletPage