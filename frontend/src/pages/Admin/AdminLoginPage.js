import { Box, Grid } from "@mui/material";
import React from "react";
import AdminLogin from "../../components/Admin/AdminLogin";
import AdminLayout from "../../Layouts/adminLayout"

function AdminLoginPage() {
  return (
    <AdminLayout>
    <Grid container>
      <Box width="100%">
        <AdminLogin/>
      </Box>
    </Grid>
  </AdminLayout>
  )
}

export default AdminLoginPage