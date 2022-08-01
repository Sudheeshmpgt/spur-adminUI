import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../../axiosinstance";
import Toast from "../../Sweetalert/sweetAlert";
import CloseIcon from "@mui/icons-material/Close";

function UpdateInterviewer() {
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState({
    name: "",
    phone: "",
    email: "",
    about: "",
  });

  const navigate = useNavigate();

  const editOnSubmit = () => {
    const { name, phone, email, about, experience } = users;
    const values = {
      name,
      phone,
      email,
      about,
      experience,
    };
    axios
      .put(`/api/admin/manage/interviewer/update/${userId}`, values, {
        headers: {
          authToken: localStorage.getItem("admintoken"),
        },
      })
      .then((res) => {
        const message = res.data.message;
        Toast.fire({
          icon: "success",
          title: message,
        });
        navigate("/admin/interviewer");
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      });
    reset({ values });
  };

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    const id = location.state.id;
    setUserId(id);
    axios
      .get(`api/user/details/${id}`, {
        headers: {
          authToken: token,
        },
      })
      .then((res) => {
        setUsers(res.data.user);
        reset(res.data.user)
      });
  }, [location.state.id, reset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers({
      ...users,
      [name]: value,
    });
  };

  const handleCloseClick = () => {
    navigate("/admin/user");
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
            Edit Interviewer
          </Typography>
          <IconButton onClick={handleCloseClick}>
            <CloseIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </Box>

        <Grid item xs={12}>
          <Box
            component={Paper}
            bgcolor="secondary.main"
            sx={{
              elevation: 5,
              padding: 5,
              height: "auto",
              width: { xs: 280, sm: 300 },
              margin: { xs: "25% auto", sm: "4% auto" },
              borderRadius: "10px",
            }}
          >
            <form onSubmit={handleSubmit(editOnSubmit)} autoComplete="off">
              <TextField
                {...register("name", {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Please enter atleast 4 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/,
                    message: "Please enter a valid name",
                  },
                })}
                name="name"
                type="string"
                onChange={handleChange}
                error={!!errors?.name}
                helperText={errors?.name ? errors.name.message : null}
                variant="standard"
                fullWidth
                label="Name"
                value={users.name}
                sx={{ mt: 1 }}
              />

              <TextField
                {...register("about")}
                name="about"
                type="string"
                onChange={handleChange}
                variant="standard"
                fullWidth
                label="About"
                value={users.about}
                sx={{ mt: 1 }}
              />

              <TextField
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
                name="email"
                type="email"
                onChange={handleChange}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
                variant="standard"
                fullWidth
                label="Email"
                value={users.email}
                sx={{ mt: 1 }}
              />

              <TextField
                {...register("phone", {
                  required: "This field is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                name="phone"
                type="string"
                onChange={handleChange}
                error={!!errors?.phone}
                helperText={errors?.phone ? errors.phone.message : null}
                variant="standard"
                fullWidth
                label="Phone"
                value={users.phone}
                sx={{ mt: 1 }}
              />

              <TextField
                {...register("experience", {
                  required: "This field is required",
                })}
                name="experience"
                type="number"
                onChange={handleChange} 
                error={!!errors?.experience}
                helperText={
                  errors?.experience ? errors.experience.message : null
                }
                variant="standard"
                fullWidth
                label="Experience"
                value={users.experience}
                sx={{ mt: 1 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="small"
                sx={{
                  mt: 3,
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  mb: 2,
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

export default UpdateInterviewer;
