import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';
import Markdown from '../common/Markdown';
import { dateTime } from '../../../helper/DateFormatter';
import theme from '../../asset/Theme';
import itemsData from '../data/itemsData';

export default function ProjectDetail() {
  const [item, setItem] = React.useState('');
  const { id } = useParams();
  const classes = useStyles();
  const props = useSpring({opacity: 1, transform: 'translateY(0)', from: {opacity: 0, transform: 'translateY(50px)'}});

  React.useEffect(() => {
    const item = itemsData.find(item => item.id === id);
    setItem(item);
  }, [id])

  return(
    <animated.div className={classes.root} style={props}>
      <div className={classes.container}>
        <div className={classes.articleHeader}>
          <div>{item.author}</div>
          <div>{dateTime(item.createdAt)}・{item.pv} Views</div>
        </div>
        <div className={classes.articleContent}>
          <h2  className={classes.articleTitle}>{item.title}</h2>
          <Markdown source={item.about} />
        </div>
        <div className={classes.authorInfo}>
          <h2 className={classes.authorInfoHeader}>ファウンダー情報</h2>
          <div className={classes.authorInfoContent}>
            <Avatar alt='author image' src='https://source.unsplash.com/random/80x80' className={classes.bigAvatar} />
            <div className={classes.introduce}>
              <div className={classes.name}>{item.author}</div>
              <div>
                ここに自己紹介文が入ります。ここに自己紹介文が入ります。ここに自己紹介文が入ります。ここに自己紹介文が入ります。ここに自己紹介文が入ります。ここに自己紹介文が入ります。ここに自己紹介文が入ります。ここに自己紹介文が入ります。ここに自己紹介文が入ります。
              </div>
            </div>
          </div>
        </div>
        <div className={classes.submit}>
          <button type='button' className={classes.post}>
            <span>プロジェクトに応募する</span>
          </button>
        </div>
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
  articleHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  articleContent: {
    margin: '15px 0 0',
  },
  articleTitle: {
    margin: '0 0 30px',
    fontSize: '2.5rem',
    fontWeight: 'bolder',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  authorInfo: {
    margin: '50px 0 0',
    padding: '40px 0',
    lineHeight: '1.7em',
    borderTop: '1px solid #ddd',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  authorInfoHeader: {
    fontSize: '1.8rem',
    fontWeight: 'bolder',
    textAlign: 'center',
    margin: '0 0 40px',
    padding: '0 0 15px',
    position: 'relative',
    '&::before': {
      display: 'inline-block',
      content: '""',
      width: 50,
      height: 3,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
  authorInfoContent: {
    display: 'flex',
  },
  bigAvatar: {
    width: 100,
    height: 100,
    display: 'inline-block',
    border: '1px solid #ddd',
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: 'bolder',
  },
  introduce: {
    margin: '0 0 0 15px',
  },
  submit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 0',
    borderTop: '1px solid #ddd',
  },
  post: {
    display: 'inline-block',
    width: 300,
    padding: '15px',
    border: 'none',
    borderRadius: 3,
    outline: 'none',
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 5px 3px -3px rgba(0, 0, 0, 0.2)',
    color: '#fff',
    cursor: 'pointer',
    transition: '0.1s',
    '&:hover': {
      opacity: 0.6,
    },
  },
});