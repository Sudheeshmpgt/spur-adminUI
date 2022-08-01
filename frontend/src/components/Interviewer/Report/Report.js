import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosinstance";
import CloseIcon from "@mui/icons-material/Close";
import Toast from "../../Sweetalert/sweetAlert";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "../../common/Scroll.css";

function Report() {
    const user = useSelector((state) => state.userData.value);
    const [request, setRequest] = useState([]);
    const navigate = useNavigate(); 
  
    const handleCloseClick = () => {
      navigate("/home");
    };
  
   
  
    useEffect(() => {
      axios
        .get(`api/interview/${user._id}`, {
          headers: {
            authToken: localStorage.getItem("usertoken"),
          },
        })
        .then((res) => {
          setRequest(res.data.requests);
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Something went wrong",
          });
        });
    }, [user]);
  
  
    const columns = [
      {
        field: "id",
        headerClassName: "super-app-theme--header",
        headerName: "ID",
        width: 75,
      },
      {
        field: "name",
        headerClassName: "super-app-theme--header",
        headerName: "Name",
        width: 165,
        editable: true,
      },
      {
        field: "about",
        headerClassName: "super-app-theme--header",
        headerName: "About",
        width: 140,
        editable: true,
      },
      {
        field: "phone",
        headerClassName: "super-app-theme--header",
        headerName: "Phone",
        width: 130,
        editable: true,
      },
      {
        field: "date",
        headerClassName: "super-app-theme--header",
        headerName: "Date",
        width: 130,
        editable: true,
      },
      {
        field: "time",
        headerClassName: "super-app-theme--header",
        headerName: "Time",
        type: "number",
        width: 110,
        editable: true,
      },
      {
        field: "fee",
        headerClassName: "super-app-theme--header",
        headerName: "Fee",
        type: "number",
        width: 100,
        editable: true,
      },
      {
        field: "status",
        headerClassName: "super-app-theme--header",
        headerName: "Status",
        width: 140,
        editable: true,
      },
    ];
  
  
    const rows = request.map((data, index) => ({
      id: index + 1,
      name: data.userId.name,
      about: data.userId.about,
      phone: data.userId.phone,
      date: dayjs(data.date).format("MMM, DD YYYY"),
      time: dayjs(data.time).format("hh:mm a"),
      fee:  data.status === 'Cancelled' ? "-" : (data.creditStatus ? `Rs. ${data.interviewerFee}` : `Pending`),
      status: data.status 
    }));
  
    return (
      <Grid container>
        <Box
          component={Paper}
          width="95%"
          height={550}
          marginTop={10}
          borderRadius="10px"
        >
          <Box
            sx={{
              borderBottom: "1px solid",
              borderColor: "rgba(0, 0, 0, 0.38)",
              minHeight: "35px",
              maxWidth: "96%",
              m: "0 auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontSize={{ xs: "1rem", sm: "1.3rem" }}
              sx={{ mt: 2, mb: 1 }}
            >
             Report
            </Typography>
            <IconButton onClick={handleCloseClick}>
              <CloseIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Box>
          <TableContainer
            className="scrollbar-hidden"
            component={Paper}
            style={{
              width: "95%",
              margin: "20px auto",
              height: 401.9,
              overflow: "scroll",
            }}
          >
            <Box
              sx={{
                height: 401.9,
                width: 1,
                "& .super-app-theme--header": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{ Toolbar: GridToolbarExport }}
                disableSelectionOnClick
              ></DataGrid>
            </Box>
          </TableContainer>
        </Box>
      </Grid>
    );
  }
  

export default Report