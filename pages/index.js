import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  let router = useRouter();
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const fetchPUrl = async (val) => {

    const query = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json'
      },
      body: JSON.stringify({ type: '2', UID: val })
    }
    const response = (await fetch('/api/serverBackendImage', query));
    const user = await response.json();
    return user[0].URL;
  }

  const fetchName = async (val) => {
    const UID = JSON.parse(val);
    const query = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json'
      },
      body: JSON.stringify({ type: 'second', UID: UID })
    }
    const response = (await fetch('/api/serverBackend', query));
    const user = await response.json();
    return user.data;
  }
  const func = async () => {
    var val;
    if (typeof window !== "undefined") {
      val = window.localStorage.getItem('uid');
    }
    await fetchName(val)
      .then((res) => {
        const Name = capitalizeFirstLetter(res[0].name);
        const email = res[0].email;
        console.log('Name:', Name, 'Email:', email);
        localStorage.setItem('userName', Name);
        localStorage.setItem('email', email);
      })
      .catch((error) => {
        console.error('fetchName Error:', error);
      });

    await fetchPUrl(val)
      .then((res) => {
        console.log('Profile Pic URL:', res);
        localStorage.setItem('profilePicURL', res);
      })
      .catch((err) => {
        console.error('fetchPUrl Error:', err);
      });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
    const response = await fetch("/api/loginapi", req);
    const datax = await response.json();
    if (response.status === 200) {
      const uid = JSON.stringify(datax.obj.uid);
      localStorage.setItem("uid", uid);
      localStorage.setItem("email", email);
      await func()
      router.push('/mainpage');
    } else {
      console.log("error")
    }
  };
  return (
    <div>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // This will make the content cover the entire viewport height
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to Chatify!
          </Typography>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sighnup" variant="body2">
                  Do not have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  </div>
  )
}
