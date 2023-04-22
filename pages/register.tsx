import {Alert, Button, Container, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {useLogin} from "../hooks/useLogin";
import React, {useState} from 'react'
import {setCookie} from "cookies-next";
import {useCreateUser} from "../hooks/useCreateUser";


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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        />
        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          margin="normal"
          fullWidth
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

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
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
