import { Box, Grid } from "@mui/material";
import React from "react";
import UserLayout from "../../Layouts/userLayout";
import Login from "../../components/Login/Login";

function LoginPage() {
  return (
    <UserLayout>
      <Grid container>
        <Box width="100%">
          <Login />
        </Box>
      </Grid>
    </UserLayout>
  );
}

export default LoginPage;
