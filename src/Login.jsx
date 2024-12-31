import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Preset credentials
    const validEmail = "user@example.com";
    const validPassword = "1234";

    if (
      credentials.email === validEmail &&
      credentials.password === validPassword
    ) {
      setError("");
      navigate("/app"); // Navigate to the App page after successful login
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, rgba(34, 193, 195, 0.8), rgba(253, 187, 45, 0.8))",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          width: "400px",
          textAlign: "center",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "rgba(0, 0, 0, 0.7)" }}>
          Login to continue
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        {error && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 1, mb: 2, fontWeight: 500 }}
          >
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1,
            background:
              "linear-gradient(135deg, rgba(34, 193, 195, 1), rgba(253, 187, 45, 1))",
            fontWeight: "bold",
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "#00bcd4" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
  
};

export default Login;
