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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosinstance";
import CloseIcon from "@mui/icons-material/Close";
import Toast from "../../Sweetalert/sweetAlert";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../../common/Scroll.css";

function MangeUser() {
  const user = useSelector((state) => state.userData.value);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [view, setView] = useState([]);
  const [page, setPage] = useState(1);
  const pageItems = 4;
  const pageCount = Math.ceil(users.length / pageItems);

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    setView(
      users.slice((page - 1) * pageItems, (page - 1) * pageItems + pageItems)
    );
  }, [users, page]);

  useEffect(() => {
    setView(
      users.slice((page - 1) * pageItems, (page - 1) * pageItems + pageItems)
    );
  }, [page, users]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCloseClick = () => {
    navigate("/admin/dashboard");
  };

  const handleBlockClick = (id) => {
    const values = {}
    axios
      .put(`/api/admin/manage/user/status/${id}`,values, {
        headers: {
          authToken: localStorage.getItem("admintoken"),
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        Toast.fire({
          icon: "success",
          title: "User status changed successfully",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
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
          .delete(`/api/admin/manage/user/delete/${id}`, {
            headers: {
              authToken: localStorage.getItem("admintoken"),
            },
          })
          .then((res) => {
            setUsers(res.data.users);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleEditClick = (id) => {
    navigate('/admin/user/update', {state: {id : id}})
  }

  useEffect(() => {
    axios
      .get(`/api/admin/manage/user`, {
        headers: {
          authToken: localStorage.getItem("admintoken"),
        },
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      });
  }, [user]);

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
            Manage Users
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
          <Table sx={{ width: 1011 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#0037ff6e" }}>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Phone No.</TableCell>
                <TableCell align="center">About</TableCell>
                <TableCell align="center">Block</TableCell>
                <TableCell align="center" colSpan={2}>
                  Actions
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
                    {data?.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 95 }}
                  >
                    {data?.phone}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 130 }}
                  >
                    {data?.about}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 70 }}
                  >
                    {data.block ? (
                      <Button
                        onClick={() => handleBlockClick(data._id)}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        UnBlock
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleBlockClick(data._id)}
                        variant="contained"
                        color="secondary"
                        size="small"
                      >
                        Block
                      </Button>
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 50 }}
                  >
                    <IconButton onClick={() => handleDeleteClick(data._id)}>
                      <DeleteIcon sx={{ fontSize: 25, color: "red" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "0.9rem", width: 50 }}
                  >
                    <IconButton onClick={() => handleEditClick(data._id)}>
                      <EditIcon sx={{ fontSize: 25, color: "green" }} />
                    </IconButton>
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

export default MangeUser;
