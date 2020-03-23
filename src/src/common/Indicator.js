import React from 'react';
import { makeStyles } from '@material-ui/core';

export default function Indicator(props) {
  const {size} = props
  const classes = useStyles();

  return(
    <div
      className={classes.indicator}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
      }}
    >
      {
        [...Array(8)].map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              display: 'inline-block',
              width: size / 2,
              height: size / 7,
              transformOrigin: 'left',
              transform: `translate(0, -50%) rotate(${index * 45}deg)`,
            }}
          >
            <div
              style={{
                width: size / 7,
                height: size / 7,
                borderRadius: '50%',
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'steelblue',
                opacity: (index + 1) / 8,
              }}
            />
          </div>
        ))
      }
    </div>
  )
}

const useStyles = makeStyles({
  indicator: {
    animation: '$roll 2s linear 0s infinite',
  },
  '@keyframes roll': {
    from: {
      transform: 'rotate(0)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
})
