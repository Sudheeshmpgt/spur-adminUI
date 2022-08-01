import { Avatar, Box, Button, Grid, Paper, TextField } from "@mui/material";
import axios from "../../axiosinstance";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Toast from "../Sweetalert/sweetAlert";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../Redux/Features/adminData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useEffect } from "react";

function AdminLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const logOnSubmit = (data) => {
    const { email, password } = data;
    if (email && password) {
      axios
        .post("api/admin/login", data)
        .then((res) => {
          if (res.data.admin) {
            const message = res.data.message;
            Toast.fire({
              icon: "success",
              title: message,
            });
            const token = res.data.token;
            localStorage.setItem("admintoken", token);
            dispatch(adminLogin(res.data.admin));
            navigate("/admin/dashboard");
          } else {
            Toast.fire({
              icon: "error",
              title: "Invalid credentials",
            });
          }
        })
        .catch((e) => {
          Toast.fire({
            icon: "error",
            title: "Something went wrong",
          });
        });
    } else {
      Toast.fire({
        icon: "warning",
        title: "Please fill all the details",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admintoken")
    if(token){
      navigate("/admin/dashboard")
    }else{
      navigate("/admin/login")
    }
  }, [])
  

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Paper
            sx={{
              elevation: 5,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: 5,
              height: "auto",
              width: { xs: 100, sm: 300 },
              margin: "8% auto",
              borderRadius: "10px",
            }}
          >
            <Avatar
              component={Paper}
              sx={{ m: "0 auto", backgroundColor: "primary.dark" }}
            >
              <LockOpenIcon sx={{ fontSize: 23 }} />
            </Avatar>
            <h2
              style={{
                marginBottom: "10px",
                fontFamily: "Poppins,sans-serif",
                textAlign: "center",
              }}
            >
              ADMIN
            </h2>
            <form onSubmit={handleSubmit(logOnSubmit)} autoComplete="off">
              <TextField
                name="email"
                type="email"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
                variant="outlined"
                sx={{ color: "", mb: 2 }}
                size="small"
                label="Username"
                fullWidth
                placeholder="Enter Username"
              />
              <TextField
                name="password"
                type="password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Password must be more than 4 characters",
                  },
                })}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
                variant="outlined"
                sx={{ color: "", mb: 2 }}
                size="small"
                label="Password"
                fullWidth
                placeholder="Enter Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="small"
                sx={{
                  margin: "0 auto",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  mb: 2,
                }}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AdminLogin;
