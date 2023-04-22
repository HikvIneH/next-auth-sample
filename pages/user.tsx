import {Button, Typography} from "@mui/material";
import {Box, Container} from "@mui/system";
import {useRouter} from "next/router";
import useGetMe from "../hooks/useGetMe";
import {useLogout} from "../hooks/useLogout";
import Copyright from "../src/Copyright";
import ProTip from "../src/ProTip";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export default function User() {
  const {handleLogout, error} = useLogout();
  const router = useRouter();

  const {data: user} = useGetMe();

  const logout = () => {
    handleLogout();
    router.push('/');
  };

  return (
    <Container maxWidth="lg">
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
          Welcome, {user.me.firstName}!
        </Typography>
        <Box maxWidth="sm">
          <Button onClick={logout} color="primary">
            Logout
          </Button>
        </Box>
        <ProTip />

        <Typography variant="body2">Email: {user.me.email}</Typography>
        <Copyright />
      </Box>
    </Container>
  );
}