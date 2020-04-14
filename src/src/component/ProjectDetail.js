import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';
import Markdown from '../common/Markdown';
import { dateTime } from '../helper/DateFormatter';
import theme from '../asset/Theme';
import { Connect } from '../context/Context';
import Indicator from '../common/Indicator';
import Confirm from '../component/Confirm';

function ProjectDetail({store}) {
  const [item, setItem] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [confirm, setConfirm] = React.useState(false);
  const { id } = useParams();
  const classes = useStyles();
  const props = useSpring({opacity: 1, transform: 'translateY(0)', from: {opacity: 0, transform: 'translateY(50px)'}});

  React.useEffect(() => {
    const fetchItem = async () => {
      const item = await store.fetchProject(id);
      setItem(item);
      setLoading(false);
    }
    fetchItem();
  }, [])

  if (loading) { return <div className={classes.loading}><Indicator size={40} /></div> }

  return(
    <>
      <Confirm confirm={confirm} setConfirm={setConfirm} />
      <animated.div className={classes.root} style={props}>
        <div className={classes.container}>
          <div className={classes.articleHeader}>
            <img src={item.user.photoURL} width={40} className={classes.headerAvatar} />
            <span className={classes.headerdisplayName}>{item.user.displayName}</span>
            <div>{dateTime(item.createdAt)}</div>
          </div>
          <div className={classes.articleContent}>
            <h2  className={classes.articleTitle}>{item.title}</h2>
            <nav>
              <ul className={classes.tagList}>
                {item.items.map((tag, index) => (
                  <li key={index} className={classes.tag}># {tag}</li>
                ))}
              </ul>
            </nav>
            <Markdown source={item.about} />
          </div>
          <div className={classes.userInfo}>
            <div className={classes.userInfoContent}>
              <img src={item.user.photoURL} width={100} className={classes.userAvatar} />
              <div className={classes.userIntroduce}>
                <div className={classes.displayName}>{item.user.displayName}</div>
                <div className={classes.introduce}>{item.user.introduce || '自己紹介文はありません。'}</div>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
      <div className={classes.submit}>
        <img src={item.user.photoURL} width={50} className={classes.submitAvatar} />
        <h3 className={classes.submitTitle}>{item.title}</h3>
        <button type='button' className={classes.post} onClick={() => setConfirm(true)}>
          <span>応募する</span>
        </button>
      </div>
    </>
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
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  articleHeader: {
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    border: '1px solid #ddd',
    borderRadius: '50%',
  },
  headerdisplayName: {
    flex: 1,
    margin: '0 0 0 10px',
  },
  tagList: {
    display: 'flex',
    listStyle: 'none',
  },
  tag: {
    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRadius: 3,
    color: 'rgba(0, 0, 0, 0.75)',
    '& + &': {
      margin: '0 0 0 10px',
    },
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
  userInfo: {
    margin: '50px 0',
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 3,
    color: 'rgba(0, 0, 0, 0.75)',
  },
  userInfoHeader: {
    fontWeight: 'bolder',
  },
  userInfoContent: {
    textAlign: 'center',
  },
  userAvatar: {
    flex: 'none',
    display: 'block-block',
    width: 100,
    height: 100,
    border: '1px solid #ddd',
    borderRadius: '50%',
  },
  userIntroduce: {
    margin: '10px 0 0 0',
    wordBreak: 'break-all',
    lineHeight: '1.5em',
  },
  displayName: {
    fontSize: '1.5rem',
    fontWeight: 'bolder',
  },
  introduce: {
    margin: '10px 0 0',
  },
  submit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 760,
    height: 70,
    padding: '0 10px',
    border: '1px solid #ddd',
    borderRadius: '50px',
    position: 'fixed',
    bottom: 20,
    left: '50%',
    zIndex: 10,
    transform: 'translate(-50%, 0)',
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  submitAvatar: {
    flex: 'none',
    width: 50,
    height: 50,
    border: '1px solid #ddd',
    borderRadius: '50%',
  },
  submitTitle: {
    flexGrow: 1,
    margin: '0 0 0 10px',
    fontWeight: 'bolder',
  },
  post: {
    display: 'inline-block',
    padding: '0 20px',
    height: 50,
    margin: '0 0 0 10px',
    flex: 'none',
    border: 'none',
    borderRadius: '50px',
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

export default Connect(ProjectDetail);
