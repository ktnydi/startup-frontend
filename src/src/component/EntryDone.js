import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../asset/Theme';

const EntryDone = () => {
  const { id } = useParams();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.pageTitle}>プロジェクトの応募が完了しました。</h2>
        <div className={classes.pageContent}>
          <div className={classes.box}>
            <h3 className={classes.subTitle}>プロジェクトURL</h3>
            <Link to={`/projects/${id}`} className={classes.link}>{`/projects/${id}`}</Link>
          </div>
          <div className={classes.box}>
            <p className={classes.text}>※ プロジェクト作成者からの承認を得られると、正式にプロジェクトの参加メンバーとなります。</p>
            <p className={classes.text}>認証状態を確認したい場合はこちら：<Link to='/dashboard' className={classes.link}>ダッシュボード</Link></p>
          </div>
          <div className={classes.box}>
            <button className={classes.goHomeBtn}>
              <Link to='/' className={classes.btnLink}>ホームへ戻る</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  container: {
    width: '100%',
    maxWidth: 500,
    padding: '60px 0',
  },
  pageTitle: {
    fontSize: '2rem',
    fontWeight: 'bolder',
  },
  pageContent: {
    margin: '30px 0 0',
  },
  box: {
    lineHeight: '1.5em',
    '& + &': {
      margin: '15px 0 0',
    }
  },
  subTitle: {
    fontSize: '1.7rem',
  },
  text: {
    margin: '30px 0 0',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      opacity: 0.6,
    }
  },
  goHomeBtn: {
    display: 'inline-block',
    padding: 0,
    border: 'none',
  },
  btnLink: {
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: 8,
    textDecoration: 'none',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      opacity: 0.6,
    }
  }
})

export default EntryDone;
