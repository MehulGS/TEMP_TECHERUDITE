import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  // Handle Logout Function
  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/customer-login");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome, Customer!
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Manage your profile, orders, and support requests easily.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/profile")}>
            View Profile
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate("/orders")}>
            My Orders
          </Button>
          <Button variant="contained" color="info" onClick={() => navigate("/support")}>
            Customer Support
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CustomerDashboard;