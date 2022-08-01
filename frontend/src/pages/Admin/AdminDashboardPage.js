import { Box, Grid } from "@mui/material";
import React from "react";
import AdminAside from "../../components/Admin/AdminAside";
import Dashboard from "../../components/Admin/Dashboard/Dashboard";
import AdminLayout from "../../Layouts/adminLayout"

function AdminDashboardPage() {
  return (
    <AdminLayout>
      <Grid>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            backgroundColor: "",
            justifyContent: "space-evenly",
          }}
        >
          <Box sx={{ width: "26%", height:'85vh', display: "flex", ml: "auto", mr: "auto" }}>
            <AdminAside />
          </Box>
          <Box
            sx={{
              width: "74%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
            }}>
             <Dashboard/>
            <Box
              className="scrollbar-hidden"
              width="100%"
              sx={{ mt: -8.0, overflow: "scroll" }}
            ></Box>
          </Box>
        </Box>
      </Grid>
    </AdminLayout>
  )
}

export default AdminDashboardPage