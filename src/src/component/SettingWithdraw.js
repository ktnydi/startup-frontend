import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Subscribe } from 'unstated';
import AppContainer from '../container/AppContainer';
import theme from '../asset/Theme';

const useStyles = makeStyles({
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
  header: {
    fontSize: '1.5rem',
    fontWeight: 'bolder',
    color: theme.palette.error.dark,
  },
  caution: {
    margin: '10px 0 0',
    fontSize: '1.5rem',
    lineHeight: 1.3,
    color: 'rgba(0, 0, 0, 0.75)',
  },
  submit: {
    margin: '50px 0 0',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 3,
    border: '1px solid',
    borderColor: theme.palette.error.dark,
    outline: 'none',
    backgroundColor: '#fff',
    color: theme.palette.error.dark,
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
      opacity: 0.6,
    },
  }
});

export default function Withdraw() {

  const classes = useStyles();

  return(
    <div className={classes.root}>
      <div className={classes.section}>
        <h2 className={classes.header}>ご確認ください</h2>
        <p className={classes.caution}>
          アカウントを削除されると、関連するデータは全て削除されます。
        </p>
      </div>
      <div className={classes.submit}>
        <Subscribe to={[AppContainer]}>
        {app => (
          <button
            type='button'
            onClick={() => app.withdraw()}
            className={classes.deleteBtn}
          >
            <span>退会する</span>
          </button>
        )}
        </Subscribe>
      </div>
    </div>
  )
}
