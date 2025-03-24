import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from "@mui/material";

const AdminRegister = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", role: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/admin-register") {
      setFormData((prevData) => ({ ...prevData, role: "admin" }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
  
      if (response.ok) {
        setSnackbarMessage("Registration successful! Check your email for verification.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setRegistrationSuccess(true); 
      } else {
        setSnackbarMessage(result.message || "Registration failed!");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("Server error. Please try again later.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.log(error);
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, textAlign: "center" }}>
        {registrationSuccess ? (
          <Typography variant="h5" color="success.main">
            Check your email to verify your account.
          </Typography>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>Admin Registration</Typography>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="First Name" name="firstName" margin="normal" required onChange={handleChange} />
              <TextField fullWidth label="Last Name" name="lastName" margin="normal" required onChange={handleChange} />
              <TextField fullWidth label="Email" name="email" type="email" margin="normal" required onChange={handleChange} />
              <TextField fullWidth label="Password" name="password" type="password" margin="normal" required onChange={handleChange} />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
            </form>
          </>
        )}
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminRegister;