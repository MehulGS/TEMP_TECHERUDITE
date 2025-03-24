import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.data.token);

      navigate("/admin-dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button
            onClick={() => navigate("/admin-register")}
            sx={{ textTransform: "none" }}
          >
            Admin Register
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminLogin;