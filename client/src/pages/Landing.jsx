import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Welcome to Our Platform
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Manage your tasks efficiently with our secure and powerful system.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/admin-login")}>
            Admin Login
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate("/customer-login")}>
            Customer Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Landing;