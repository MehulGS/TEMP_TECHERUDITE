import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/admin-login"); 
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome, Admin!
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Manage users, orders, and customer support efficiently.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/manage-users")}>
            Manage Users
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate("/manage-orders")}>
            Manage Orders
          </Button>
          <Button variant="contained" color="info" onClick={() => navigate("/admin-support")}>
            Admin Support
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;