import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../asset/Theme';

export default function Loading() {
  const classes = useStyles();

  return(
    <div className={classes.loading}>
      Loading
      <span className={classes.dotFirst}>.</span>
      <span className={classes.dotSecond}>.</span>
      <span className={classes.dotThird}>.</span>
    </div>
  );
}

const useStyles = makeStyles({
  loading: {
    fontSize: '3rem',
    fontWeight: 'bolder',
    color: theme.palette.primary.main,
  },
  dotFirst: {
    display: 'inline-block',
    animation: `$jump 1s linear 0s infinite`
  },
  dotSecond: {
    display: 'inline-block',
    animation: `$jump 1s linear 0.25s infinite`
  },
  dotThird: {
    display: 'inline-block',
    animation: `$jump 1s linear 0.5s infinite`
  },
  '@keyframes jump': {
    '0%': {
      transform: 'translateY(0)',
    },
    '12.5%': {
      transform: 'translateY(-10px)',
    },
    '25%, 100%': {
      transform: 'translateY(0)',
    }
  },
})
