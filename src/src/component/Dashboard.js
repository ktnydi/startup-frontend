import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Dashboard() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <div className={classes.signinUser}>
        <Avatar alt='login user image' src='https://source.unsplash.com/random/80x80' className={classes.avatar} />
        <div className={classes.name}>ゲストユーザー</div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
    padding: '80px 15px 40px',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  signinUser: {
    textAlign: 'center',
  },
  avatar: {
    display: 'inline-block',
    width: 120,
    height: 120,
    border: '1px solid #ddd',
  },
  name: {
    margin: '15px 0 0',
  },
});
