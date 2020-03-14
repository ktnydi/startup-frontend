import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function Project() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <div className={classes.container}>
        Project.js
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
    padding: '50px 15px',
  },
})
