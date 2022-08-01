import React from "react";
import { Grid } from "@mui/material";
import UserLayout from "../../Layouts/userLayout";
import ProfileDesign from "../../components/Profile/ProfileDesign";

function Profile() {
  return (
    <UserLayout>
      <Grid>
        <ProfileDesign />
      </Grid>
    </UserLayout>
  );
}

export default Profile;
