import React, { useState } from 'react';
import { TextField, MuiThemeProvider, makeStyles } from '@material-ui/core';
import theme from '../asset/Theme';
import { Connect } from '../context/Context';

const useStyles = makeStyles({
  label: {
    fontSize: '1.5rem',
    color: 'rgba(0, 0, 0, 0.3)',
  },
  input: {
    fontSize: '1.5rem',
    lineHeight: '1.5em',
    color: 'rgba(0, 0, 0, 0.75)',
    '&:before': {
      borderBottom: '1px solid #ddd',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #ddd',
    },
  },
  root: {
    width: '100%',
    maxWidth: 370,
    margin: '0 auto',
  },
  section: {
    '& + &': {
      margin: '25px 0 0',
    },
  },
  submit: {
    margin: '50px 0 0',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 3,
    border: 'none',
    outline: 'none',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
      opacity: 0.6,
    },
  }
});

function Email(props) {
  const [email, setEmail] = useState('');

  const classes = useStyles();

  return(
    <div className={classes.root}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={classes.section}>
          <MuiThemeProvider theme={theme}>
            <TextField
              label='メールアドレス'
              fullWidth
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.label,
              }}
              defaultValue={props.store.user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </MuiThemeProvider>
        </div>
        <div className={classes.submit}>
          <button
            type='button'
            onClick={() => props.store.updateEmail(email)}
            className={classes.updateBtn}
          >
            <span>変更する</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Connect(Email);
