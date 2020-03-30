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

function Password(props) {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const user = {
    password: password,
    newPassword: newPassword,
    newPasswordConfirm: newPasswordConfirm,
  }

  const classes = useStyles();

  return(
    <div className={classes.root}>
      <div className={classes.section}>
        <MuiThemeProvider theme={theme}>
          <TextField
            type='password'
            label='現在のパスワード'
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.label,
            }}
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </MuiThemeProvider>
      </div>
      <div className={classes.section}>
        <MuiThemeProvider theme={theme}>
          <TextField
            type='password'
            label='新しいパスワード'
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.label,
            }}
            defaultValue={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </MuiThemeProvider>
      </div>
      <div className={classes.section}>
        <MuiThemeProvider theme={theme}>
          <TextField
            type='password'
            label='新しいパスワードの確認'
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.label,
            }}
            defaultValue={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
          />
        </MuiThemeProvider>
      </div>
      <div className={classes.submit}>
        <button
          type='button'
          onClick={() => props.store.updatePassword(user)}
          className={classes.updateBtn}
        >
          <span>変更する</span>
        </button>
      </div>
    </div>
  )
}

export default Connect(Password);
