import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import UserLayout from "../../Layouts/userLayout";
import StaticContents from "../../components/Landingpage/StaticHeading";
import StaticRowOne from "../../components/Landingpage/StaticRowOne";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    setToken(token);
  }, [token]);

  if (token) {
    navigate("/home");
  }

  return (
    <UserLayout>
      <Grid container>
        <Box sx={{ margin: "9% auto" }}>
          <StaticContents />
        </Box>
        <StaticRowOne sx={{ width: "100%", margin: "10 auto" }} />
        <Footer />
      </Grid>
    </UserLayout>
  );
}

export default Home;
