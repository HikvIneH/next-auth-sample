import {Alert, Box, Button, Container, TextField, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {useLogin} from "../hooks/useLogin";
import React, {useState} from 'react'
import {setCookie} from "cookies-next";
import client from "../constants/apollo-client";
import authenticatedVar from "../constants/authenticated";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import Link from "next/link";


interface LoginFormProps { }

const LoginForm: React.FC<LoginFormProps> = ({ }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [login] = useLogin();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const loggedIn = await login({
      variables: {
        loginUserInput: data,
      }
    }
    ).catch((error) => {
      console.log(error)
      setError("An error occurred while logging in.");
    });

    console.log(loggedIn)
    if (loggedIn) {
      client.refetchQueries({include: 'active'});
      authenticatedVar(true)
      router.push("/user");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >

      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth>
            Log In
          </Button>
        </form>

        <br />
        <Typography variant="subtitle2" component="h6" gutterBottom>
          No Account Yet? <Link href="/register" color="secondary"> Register </Link>
        </Typography>


        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default LoginForm;
