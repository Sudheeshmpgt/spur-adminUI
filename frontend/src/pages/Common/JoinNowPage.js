import { Box, Grid } from "@mui/material";
import React from "react";
import JoinNow from "../../components/UserRegister/JoinNow";
import UserLayout from "../../Layouts/userLayout";

function JoinNowPage() {
  return (
    <UserLayout>
      <Grid container>
        <Box width="100%">
          <JoinNow />
        </Box>
      </Grid>
    </UserLayout>
  );
}

export default JoinNowPage;
