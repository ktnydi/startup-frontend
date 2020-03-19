import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function TabPanel(props) {
  const {index, currentIndex, className, children} = props;
  const classes = useStyles();

  if (index !== currentIndex) { return false }

  return(
    <div className={`${classes.tabPanel} ${className}`}>{children}</div>
  );
}

const useStyles = makeStyles({
  tabPanel: {
    width: '100%',
    borderTop: '1px solid #ddd',
  },
})
