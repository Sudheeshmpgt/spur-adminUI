import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "../../axiosinstance";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Toast from "../Sweetalert/sweetAlert";
import HowToRegIcon from "@mui/icons-material/HowToReg";

function AdminRegister() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  const registerOnSubmit = (data) => {
    const { email, password } = data;
    if (email && password) {
      axios
        .post("api/admin/registration", data)
        .then((res) => {
          if (res.data.admin) {
            const message = res.data.message;
            Toast.fire({
              icon: "success",
              title: message,
            });
            navigate("/admin/login");
          } else {
            Toast.fire({
              icon: "error",
              title: "Invalid credentials",
            });
          }
        })
        .catch((e) => {
            console.log(e)
          Toast.fire({
            icon: "error",
            title: "Something went wrong",
          });
        });
    } else {
      Toast.fire({
        icon: "error",
        title: "Please fill all the details",
      });
    }
  };

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
              <HowToRegIcon sx={{ fontSize: 23 }} />
            </Avatar>
            <Typography
              fontSize="1.4rem"
              fontWeight="600"
              sx={{
                mb: "4px",
                mt: "20px",
                textAlign: "center",
              }}
            >
              ADMIN
            </Typography>
            <Typography
              fontSize="1.1rem"
              fontWeight="600"
              sx={{
                mb: "10px",
                textAlign: "center",
              }}
            >
             Register
            </Typography>
            <form onSubmit={handleSubmit(registerOnSubmit)} autoComplete="off">
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
                Submit
              </Button>
            </form>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AdminRegister;
