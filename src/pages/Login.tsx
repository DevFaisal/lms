import React from "react";
import { Box, Typography, TextField, Button, Paper, Container, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { userService } from "../services/users";

const LoginContainer = styled(Paper)(({ theme }) => ({
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

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //@ts-ignore
    const res = userService.getUserByEmail(email);
    console.log(res);
    window.location.href = "/dashboard";
  };

  return (
    <Container component="main" maxWidth="xs">
      <LoginContainer>
        <Logo variant="h4" className="flex">
          <span className="text-2xl pr-1"> Flex</span>
          <span className="text-2xl font-bold text-green-800">Card</span>
          <p className="text-sm p-2">LMS</p>
        </Logo>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit" fullWidth variant="contained" color="primary" size="large">
            Sign In
          </SubmitButton>
          <Box mt={2} textAlign="center">
            <MuiLink component={Link} to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </MuiLink>
          </Box>
        </Form>
      </LoginContainer>
    </Container>
  );
};

export default Login;
