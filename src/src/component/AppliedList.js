import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../asset/Theme';

export default function AppliedList() {
  const classes = useStyles();

  return(
    <nav className={classes.nav}>
      <div className={classes.cell}>
        <div className={classes.content}>
          <h3 className={classes.title}>ここにタイトルが入ります</h3>
          <div className={classes.relative}>
            <span className={classes.relativeElm}>たった今</span>
            <span className={classes.relativeElm}>Alice</span>
            <span className={classes.relativeElm}>10 Views</span>
          </div>
        </div>
        <div className={classes.success}>承認されました</div>
      </div>
      <div className={classes.cell}>
        <div className={classes.content}>
          <h3 className={classes.title}>ここにタイトルが入ります。</h3>
          <div className={classes.relative}>
            <span className={classes.relativeElm}>たった今</span>
            <span className={classes.relativeElm}>Bob</span>
            <span className={classes.relativeElm}>10 Views</span>
          </div>
        </div>
        <div className={classes.approve}>承認中...</div>
      </div>
      <div className={classes.cell}>
        <div className={classes.content}>
          <h3 className={classes.title}>ここにタイトルが入ります。</h3>
          <div className={classes.relative}>
            <span className={classes.relativeElm}>たった今</span>
            <span className={classes.relativeElm}>Joy</span>
            <span className={classes.relativeElm}>10 Views</span>
          </div>
        </div>
        <div className={classes.approve}>承認中...</div>
      </div>
    </nav>
  )
}

const useStyles = makeStyles({
  nav: {
    width: '100%',
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    position: 'relative',
    '& + &:before': {
      display: 'inline-block',
      content: '" "',
      width: 'calc(100% - 20px)',
      height: 1,
      backgroundColor: '#ddd',
      position: 'absolute',
      top: 0,
      right: 0,
    },
  },
  content: {
    flexGrow: 1,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bolder',
  },
  success: {
    color: theme.palette.success.main,
  },
  approve: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  relative: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0 0',
    fontSize: '1.3rem',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  relativeElm: {
    margin: '0 10px 0 0',
  },
});
