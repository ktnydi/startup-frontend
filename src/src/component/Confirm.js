import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../asset/Theme';

const ConfirmModal = () => {
  const classes = useStyles();

  return(
    <>
      <div className={classes.modalBg} />
      <div className={classes.modalBox}>
        <h2 className={classes.title}>プロジェクトに応募しますか？</h2>
        <div className={classes.content}>
          <p className={classes.description}>プロジェクト作成者に承認されると正式に参加できます。</p>
          <div className={classes.buttonList}>
            <button className={classes.cancel}>キャンセル</button>
            <button className={classes.apply}>応募</button>
          </div>
        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles({
  modalBg: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalBox: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 1001,
    transform: 'translate(-50%, -50%)',
    width: 350,
    padding: '30px',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bolder',
  },
  content: {
    margin: '15px 0 0',
  },
  buttonList: {
    display: 'flex',
    alignItems: 'center',
    margin: '15px 0 0',
  },
  cancel: {
    flex: 1,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '50px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
      opacity: 0.6,
    },
  },
  apply: {
    flex: 1,
    margin: '0 0 0 15px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '50px',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
      opacity: 0.6,
    },
  },
})

export default ConfirmModal;
