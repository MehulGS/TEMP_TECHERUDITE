import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    const adminToken = localStorage.getItem("adminToken");
    const customerToken = localStorage.getItem("customerToken");

    if (adminToken) {
      navigate("/admin-dashboard");
    } else if (customerToken) {
      navigate("/customer-dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Typography variant="h1" color="error">
          404
        </Typography>
        <Typography variant="h5">Oops! Page Not Found</Typography>
        <Typography variant="body1" color="textSecondary">
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
