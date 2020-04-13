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

function ProjectDetail({store}) {
  const [item, setItem] = React.useState('');
  const [loading, setLoading] = React.useState(true);
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
    <animated.div className={classes.root} style={props}>
      <div className={classes.container}>
        <div className={classes.articleHeader}>
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
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  articleHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'rgba(0, 0, 0, 0.5)',
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

export default Connect(ProjectDetail);
