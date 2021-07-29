import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { BASE_URL } from '../App'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    top: 0
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  form: {
    textAlign: "right",
    width: "150px"
  },
  signInButton: {
    height: '20px',
    marginTop: '5px'
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { loggedIn, setLoggedIn } = props
  const [userName, setUserName] = useState("")

  const handleSignIn = () => {
    let config = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({user: {username: userName}})
  }
    fetch(BASE_URL+"users", config)
    .then(res => res.json())
    .then(res => {
      if (res.token) {
        sessionStorage.setItem("jwt", res.token)
        setLoggedIn(true)
      }
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dueling Nobles
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
          {loggedIn ? <Typography variant="h6" className={classes.title}>Logged In: {userName}</Typography> :
            <>
            <input
                value={ userName }
                onChange={ (e) => { setUserName(e.target.value)} }
                type='text'
                placeholder='Enter Your Username'
                className='username-input'
                id='username-input'
                />
            <Button className={classes.signInButton} onClick={handleSignIn} variant="outlined" size="small" color="inherit">Sign-In</Button>
            </>
            }
            </form>
        </Toolbar>
      </AppBar>
    </div>
  );
}