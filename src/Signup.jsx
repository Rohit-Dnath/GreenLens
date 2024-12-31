import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Simulate successful signup
    setError("");
    navigate("/"); // Redirect to Login after successful signup
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
          Create Account
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "rgba(0, 0, 0, 0.7)" }}>
          Sign up to get started
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
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
          onClick={handleSignup}
        >
          Sign Up
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: "none", color: "#00bcd4" }}>
            Log In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
