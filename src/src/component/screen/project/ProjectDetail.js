import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';

export default function ProjectDetail() {
  const { id } = useParams();
  const classes = useStyles();
  const props = useSpring({opacity: 1, transform: 'translateY(0)', from: {opacity: 0, transform: 'translateY(50px)'}});

  return(
    <animated.div className={classes.root} style={props}>
      <div className={classes.container}>
        {`ProjectDetails, id:${id}`}
      </div>
    </animated.div>
  )
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    width: '100%',
    maxWidth: '760px',
    margin: '0 auto',
    padding: '50px 15px',
  },
});
