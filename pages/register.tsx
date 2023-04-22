import {Alert, Box, Button, Container, TextField, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {useLogin} from "../hooks/useLogin";
import React, {useState} from 'react'
import {setCookie} from "cookies-next";
import {useCreateUser} from "../hooks/useCreateUser";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import Link from "next/link";


interface RegisterFormProps { }

const RegisterForm: React.FC<RegisterFormProps> = ({ }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");

  const [createUser] = useCreateUser();
  const [login] = useLogin();

  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate email format
  const passwordRegex = /^.{8,}$/; // Regular expression to validate password length (at least 8 characters)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validation checks
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const data = {
      firstName: firstName,
      lastName: firstName,
      email: email,
      password: password,
    };
    const newUser = await createUser({
      variables: {
        input: data,
      },
    }).catch((error) => {
      setError(`${error.message}`);
    });


    const loggedIn = await login({
      variables: {
        loginUserInput: {email: data.email, password: data.password},
      },
    }).catch((error) => {
      console.log(error)
      setError("An error occurred while logging in.");

    });

    if (loggedIn) {
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
          Regisration
        </Typography>


        <form onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            margin="normal"
            fullWidth
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            margin="normal"
            fullWidth
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />

          <TextField
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
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
            Register
          </Button>
        </form>

        <br />
        <Typography variant="subtitle2" component="h6" gutterBottom>
          Already have an account? <Link href="/login" color="secondary"> Login </Link>
        </Typography>

        <ProTip />
        <Copyright />
      </Box>
    </Container >
  )
};

export default RegisterForm;
