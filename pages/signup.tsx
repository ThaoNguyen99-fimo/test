import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    '@global': {
        body: {
          backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

export default function SignOut() {
  const classes = useStyles();
  const [state, setstate] = React.useState({
    name: '',
    username:'',
    email: '',
    password: ''
  })

  const handleOnNameChange = (event: any) => {
    console.log(state)
    let new_name = event.target.value
    setstate(state => {
        return {...state, name: new_name}
    });
  }
  const handleOnUsernameChange = (event: any) => {
    console.log(state)
    let new_username = event.target.value
    setstate(state => {
        return {...state, username: new_username}
    });
  }
  const handleOnEmailChange = (event: any) => {
    console.log(state)
    let new_email = event.target.value
    setstate(state => {
        return {...state, email: new_email}
    });
  } 
  const handleOnPassChange = (event: any) => {
    console.log(state)
    let new_pass = event.target.value
    setstate(state => {
        return {...state, password: new_pass}
    });
  }
  const handleCreateUser = () => {
    Axios({
        method: 'post',
        url: 'api/createUser',
        data: {
          name: state.name,
          username: state.username,
          email: state.email,
          password: state.password
        }
    }).then((res) => {
        console.log(res)
    });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            onChange = {handleOnNameChange}
          />         
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoFocus
            onChange = {handleOnUsernameChange}
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
            autoFocus
            onChange = {handleOnEmailChange}
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
            onChange = {handleOnPassChange}
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password-confirm"
            label="Password confirm"
            type="password"
            id="password-confirm"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleCreateUser}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}



