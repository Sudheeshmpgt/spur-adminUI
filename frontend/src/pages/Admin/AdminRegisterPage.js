import { Box, Grid } from "@mui/material";
import React from "react";
import AdminRegister from "../../components/Admin/AdminRegister";
import AdminLayout from "../../Layouts/adminLayout"

function AdminRegisterPage() {
  return (
    <AdminLayout>
    <Grid container>
      <Box width="100%">
        <AdminRegister/>
      </Box>
    </Grid>
  </AdminLayout>
  )
}

export default AdminRegisterPage
