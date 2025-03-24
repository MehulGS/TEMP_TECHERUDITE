import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import {jwtDecode} from "jwt-decode" // Import jwtDecode

const EmailVerification = () => {
  const { token } = useParams(); // Get token from URL parameter
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage("Invalid verification link.");
        setError(true);
        setLoading(false);
        return;
      }

      try {
        // Decode token to get user role
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role; // Assuming role is stored in the token payload

        // Verify email by calling the backend
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify/${token}`
        );
        setMessage(res.data.message);
        setError(false);

        // Navigate based on role
        setTimeout(() => {
          if (userRole === "admin") {
            navigate("/admin-login");
          } else {
            navigate("/customer-login");
          }
        }, 2000);
      } catch (err) {
        setMessage(err.response?.data?.message || "Email verification failed.");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Alert severity={error ? "error" : "success"}>{message}</Alert>
          {!error && (
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: "10px" }}
            >
              Redirecting to {error ? "" : "login page"} in 2 seconds...
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default EmailVerification;
