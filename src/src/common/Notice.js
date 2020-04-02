import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../asset/Theme';
import { Connect } from '../context/Context';

const Success = Connect((props) => {
  const {message, store} = props;
  const classes = useStyles();
  const spring = useSpring({
    transform: store.notice.success.active ? 'translateX(0)' : 'translateX(400px)',
  });

  return(
    <animated.div
      style={{...spring}}
      className={classes.success}
    >
      <span className={classes.text}>
        <Icon className={classes.icon}>check</Icon>
        {message}
      </span>
    </animated.div>
  );
});

const Failure = Connect((props) => {
  const {message, store} = props;
  const classes = useStyles();
  const spring = useSpring({
    transform: store.notice.failure.active ? 'translateX(0)' : 'translateX(400px)',
  });

  return(
    <animated.div
      onClick={() => store.fadeInOrOutFailureNotice({type: 'fadeOut'})}
      style={{...spring}}
      className={classes.failure}
    >
      <span className={classes.text}>
        <Icon className={classes.icon}>priority_high</Icon>
        {message}
      </span>
    </animated.div>
  );
});

const useStyles = makeStyles({
  success: {
    position: 'fixed',
    bottom: 50,
    right: 50,
    zIndex: 100,
    display: 'inline-block',
    maxWidth: 300,
    padding: '30px',
    borderRadius: 3,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '1.3rem',
  },
  failure: {
    position: 'fixed',
    bottom: 50,
    right: 50,
    zIndex: 100,
    display: 'inline-block',
    maxWidth: 300,
    padding: '30px',
    borderRadius: 3,
    backgroundColor: theme.palette.warning.main,
    color: 'white',
    fontSize: '1.3rem',
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bolder',
    lineHeight: '1.5em',
  },
  icon: {
    fontWeight: 'bolder',
    margin: '0 10px 0 0',
  },
});

export { Success, Failure };
