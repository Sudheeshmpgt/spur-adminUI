import { Box, Paper, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import React from "react";
import './shimmer.css'

function WalletDesign({ balance }) {
  return (
    <Box width="100%">
      <Box
        component={Paper}
        bgcolor="secondary.main"
        sx={{
          width: 450,
          height: 280,
          m: "60px auto",
          borderRadius: "15px",
          border: "1px solid rgba(0, 0, 0, 0.38)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              width: "65%",
              position: "relative",
              top: 105,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box  width="40%" textAlign='right'>
              <CurrencyRupeeIcon sx={{ fontSize: "3.5rem", m: "7px auto" }} />
            </Box>
            <Box  className="shimmer"  width="60%">
              <Typography fontSize="3rem" fontWeight={600}>{balance}</Typography>
            </Box>
          </Box>
          <Box
            component={Paper}
            bgcolor="primary.main"
            sx={{
              width: 170,
              height: 80,
              position: "relative",
              top: 100,
              float: "right",
              right: -25,
              border: "1px solid rgba(0, 0, 0, 0.38)",
              borderRadius: "35px 15px 15px 35px",
            }}
          >
            <Box
              component={Paper}
              bgcolor="secondary.main"
              sx={{
                width: 40,
                height: 40,
                position: "relative",
                top: 20,
                left: 20,
                borderRadius: "35px 35px 35px 35px",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WalletDesign;
