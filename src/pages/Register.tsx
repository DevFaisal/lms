import React from "react";
import { Box, Typography, TextField, Button, Paper, Container, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { userService } from "../services/users";

const RegisterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 400,
  margin: "0 auto",
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.2),
}));

const Register: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    //     {
    //   "name": "Faisal Farooq",
    //   "email": "faisal1@gmail.com",
    //   "phone": "9622827634",
    //   "kyc_status": "pending",
    //   "account_status": "active",
    //   "password": "Sopore@193201"
    // }
    event.preventDefault();
    const respose = userService.createUser({
      name,
      email,
      phone,
      kyc_status: "pending",
      account_status: "active",
      password,
    });
    console.log(respose);
    // For demo purposes, just redirect to login
    window.location.href = "/login";
  };

  return (
    <Container component="main" maxWidth="xs">
      <RegisterContainer>
        <Logo variant="h4" className="flex">
          <span className="text-2xl pr-1"> Flex</span>
          <span className="text-2xl font-bold text-green-800">Card</span>
          <p className="text-sm p-2">LMS</p>
        </Logo>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <Form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SubmitButton type="submit" fullWidth variant="contained" color="primary" size="large">
            Sign Up
          </SubmitButton>
          <Box mt={2} textAlign="center">
            <MuiLink component={Link} to="/login" variant="body2">
              {"Already have an account? Sign In"}
            </MuiLink>
          </Box>
        </Form>
      </RegisterContainer>
    </Container>
  );
};

export default Register;
