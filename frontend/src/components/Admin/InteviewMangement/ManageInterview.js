import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosinstance";
import CloseIcon from "@mui/icons-material/Close";
import Toast from "../../Sweetalert/sweetAlert";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "../../common/Scroll.css";

function ManageInterview() {
  const user = useSelector((state) => state.userData.value);
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  const [view, setView] = useState([]);
  const [page, setPage] = useState(1);
  const pageItems = 4;
  const pageCount = Math.ceil(interviews.length / pageItems);

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`/api/admin/manage/interview`, {
        headers: {
          authToken: localStorage.getItem("admintoken"),
        },
      })
      .then((res) => {
        setInterviews(res.data.interviews);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      });
  }, []);

  useEffect(() => {
    setView(
      interviews.slice(
        (page - 1) * pageItems,
        (page - 1) * pageItems + pageItems
      )
    );
  }, [interviews, page]);

  useEffect(() => {
    setView(
      interviews.slice(
        (page - 1) * pageItems,
        (page - 1) * pageItems + pageItems
      )
    );
  }, [page, interviews]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCloseClick = () => {
    navigate("/admin/dashboard");
  };

  const handlePercentChange = (e, id) => {
    const splitPercent = e.target.value;
    const values = {
      splitPercent: splitPercent,
    };
    axios
      .put(`/api/admin/manage/interview/${id}`, values, {
        headers: {
          authToken: localStorage.getItem("admintoken"),
        },
      })
      .then((res) => {
        setInterviews(res.data.interviews);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/admin/manage/interviewer/delete/${id}`, {
            headers: {
              authToken: localStorage.getItem("admintoken"),
            },
          })
          .then((res) => {
            setInterviews(res.data.interviewers);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleCredit = (id) => {
    const values = {
      id
    }
    axios.post(`/api/interviewer/wallet/${id}`, values, {
      headers: {
        authToken: localStorage.getItem("admintoken"),
      },
    })
    .then(res=>{
      setInterviews(res.data.interviews);
    })
    .catch(err=>{
      console.log(err)
    })
  };

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
            Manage Interviews
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
            height: 450,
            overflow: "scroll",
          }}
        >
          <Table sx={{ width: 1350 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "primary.main" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  No.
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Interviewee
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Interviewer
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Percent(%)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Interviewer Fee
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Admin Profit
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Total
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Wallet Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {view.map((data, index) => (
                <TableRow
                  key={data?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ width: 40 }}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 130 }}
                  >
                    {data?.userId?.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 130 }}
                  >
                    {data?.interviewerId?.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 130 }}
                  >
                    {dayjs(data.date).format("MMM DD YYYY")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 130 }}
                  >
                    {data?.status}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 80 }}
                  >
                    <Box sx={{ minWidth: 80 }}>
                      <TextField
                        name="splitPercent"
                        label="Percent"
                        select
                        value={data.splitPercent ? data.splitPercent : ""}
                        onChange={(e) => {
                          handlePercentChange(e, data._id);
                        }}
                        fullWidth
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                      </TextField>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "0.9rem",
                      width: 150,
                    }}
                  >
                    <CurrencyRupeeIcon sx={{ fontSize: 15 }} />
                    {data?.interviewerFee}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 120 }}
                  >
                    <CurrencyRupeeIcon sx={{ fontSize: 15 }} />
                    {data?.adminProfit}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 80 }}
                  >
                    <CurrencyRupeeIcon sx={{ fontSize: 15 }} />
                    {data?.amount}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 150 }}
                  >
                    {
                      data?.creditStatus ? 
                      (
                        <Button variant="contained" disabled>Credited</Button>
                      ) : (
                        <Button onClick={()=>handleCredit(data._id)} variant="contained">Not Credited</Button>
                      )
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={pageCount}
            onChange={handlePageChange}
            color="primary"
          />
        </TableContainer>
      </Box>
    </Grid>
  );
}

export default ManageInterview;
