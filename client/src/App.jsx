import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import NotFound from "./pages/NotFound";
import EmailVerification from "./pages/EmailVerification";
import CustomerRegister from "./pages/CustomerRegister";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import CustomerLogin from "./pages/CustomerLogin";
import Landing from "./pages/Landing";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
    <Router>
      <CssBaseline />
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/customer-register" element={<CustomerRegister />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/verify/:token" element={<EmailVerification />} />
          

          <Route 
            path="/customer-dashboard" 
            element={<ProtectedRoute element={<CustomerDashboard />} allowedRoles={["customer"]} />} 
          />
          <Route 
            path="/admin-dashboard" 
            element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} 
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
    </>
  );
}

export default App;