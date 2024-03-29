import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../../style/style.css"
const defaultTheme = createTheme();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // Add a state variable for shaking animation
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://autozone-backend.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
      
        if (responseData.status) {
          const token = responseData.data.token;
          localStorage.setItem("authToken", token);
          window.location.href = "/popup";
        } else {
          // Handle unsuccessful login, e.g., show an error message.
          setError("Login failed: " + responseData.message);
          setIsShaking(true); // Trigger the shake animation
          setTimeout(() => {
            setIsShaking(false);
          }, 300);
        }
      } else {
        // Handle other network errors.
        setError(responseData.message );
        setIsShaking(true); // Trigger the shake animation
        setTimeout(() => {
          setIsShaking(false);
        }, 300);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setIsShaking(true); // Trigger the shake animation
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  return (
  
    <ThemeProvider theme={defaultTheme} >
      <Box sx={{ flexGrow: 1}}></Box>

      <Grid container component="main" sx={{ height: "calc(100vh - 100px)", overflow: "hidden" , }}>

        <CssBaseline />
        <Grid
      item
      xs={false}
      sm={6}
      md={7}
      sx={{
        height: '600px',
        my: 9,
        marginLeft: "0", // Adjusted marginLeft
        paddingLeft:"100px",
        // backgroundColor:"black"
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          width: '80%',
          height: '80%',
          objectFit: 'cover',
          
        }}
      >
        
        <source src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/man-doing-business-data-analysis-4835205-4019940.mp4" type="video/mp4" />
       
      </video>
    </Grid>
        <Grid item xs={12} sm={8} md={5}  >
      
      
         <Box
         >
          <Box
          sx={{
            // border: "solid",
            // backgroundColor:"black",
            // marginTop:"-200px",
            // backgroundColor:"#ffd255",
            height:"500px",
            width:"400px",
            my: 9,
            mx: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // marginRight: "100px",
            padding:"50px",
            boxShadow: "6px 2px 13px rgba(255,189,1,255)", // Add your shadow properties here
            borderRadius:"30px",
            animation: isShaking ? "shake 0.5s" : "",
          }}
          >
            <img
              src="../../assets/sabooautozone.webp"
              alt="Logo"
              height="300"
              width="150"
              style={{ marginRight: "16px", marginTop: "-20px",  }}
            />
            <Avatar sx={{ m: 1, backgroundColor: "#5f64d6" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Sign in
            </Typography>

            {error && <p className="text-danger">{error}</p>}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={toggleShowPassword}
                      aria-label={
                        showPassword ? "Hide Password" : "Show Password"
                      }
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#5f64d6",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#a22a2d",
                  },
                }}
              >
                Login In
              </Button>
            </Box>
          </Box>
          </Box>
       
        </Grid>
      </Grid>
    </ThemeProvider>
  
  );
};

export default Login;


