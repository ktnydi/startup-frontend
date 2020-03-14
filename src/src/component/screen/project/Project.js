import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';

const items = [
  {id: '1', title: 'ここにタイトルが入ります。', about: 'ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。', createdAt: new Date().getTime(), pv: 10, author: 'Alice'},
  {id: '2', title: 'ここにタイトルが入ります。', about: 'ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。', createdAt: new Date('2020/03/14/21:00').getTime(), pv: 2, author: 'Lucy'},
  {id: '3', title: 'ここにタイトルが入ります。', about: 'ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。', createdAt: new Date('2020/03/14').getTime(), pv: 23, author: 'Bob'},
  {id: '4', title: 'ここにタイトルが入ります。', about: 'ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。', createdAt: new Date('2020/03/10').getTime(), pv: 0, author: 'Joy'},
  {id: '5', title: 'ここにタイトルが入ります。', about: 'ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。', createdAt: new Date('2020/02/21').getTime(), pv: 12, author: 'Smith'},
  {id: '6', title: 'ここにタイトルが入ります。', about: 'ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。', createdAt: new Date('2017/01/15').getTime(), pv: 31, author: 'Ben'}
]

export default function Project() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.header}>募集中のプロジェクト</h2>
        <ProjectList />
      </div>
    </div>
  )
}

function ProjectList() {
  const classes = useStyles();
  const props = useSpring({opacity: 1, transform: 'translateY(0)', from: {opacity: 0, transform: 'translateY(50px)'}});

  return(
    <animated.div className={classes.nav} style={props}>
      <div className={classes.list}>
        {items.map((item, index) => ( <ProjectCell item={item} key={index} /> ))}
      </div>
    </animated.div>
  )
}

function ProjectCell({item}) {
  const classes = useStyles();

  const displayAbout = (about) => {
    if (about.length < 70) { return about }

    const cutAbout = about.substr(0, 70);
    return cutAbout + '...';
  }

  const displayDuration = (timestamp) => {
    const current = new Date();
    const from = new Date(timestamp);
    const durationTimestamp = current - from;
    const oneMinuteTimestamp = 60000;
    const durationMinute = durationTimestamp / oneMinuteTimestamp;

    // Within 30 second.
    if (durationMinute <= 0.5) { return 'たった今' }
    // Within 1 minitue.
    if (durationMinute <= 1) { return `${Math.floor(durationMinute * 60)}秒前`}
    // Within 1 hour.
    if (durationMinute <= 60) { return `${Math.floor(durationMinute)}分前` }
    // Within 1 day.
    if (durationMinute <= 1440) { return `${Math.floor(durationMinute / 60)}時間前` }
    // Within 1 week.
    if (durationMinute <= 10080) { return `${Math.floor(durationMinute / 1440)}日前` }
    // Within 1 month.
    if (durationMinute <= 43800) { return `${Math.floor(durationMinute / 10080)}週間前`}
    // Within 1 year.
    if (durationMinute <= 525600) { return `${Math.floor(durationMinute / 43800)}ヶ月前`}
    // Other
    return `${Math.floor(durationMinute / 525600)}年前`;
  }

  return(
    <div className={classes.cell}　>
      <h3 className={classes.title}>
        <Link to={`/projects/${item.id}`} className={classes.link}>{item.title}</Link>
      </h3>
      <p className={classes.about}>{displayAbout(item.about)}</p>
      <div className={classes.relative}>
        <span>{displayDuration(item.createdAt)}</span>
        <span className={classes.author}>{item.author}</span>
        <span>{item.pv} Views</span>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
    padding: '50px 15px',
  },
  main: {
    width: '100%',
  },
  header: {
    fontSize: '1.8rem',
    fontWeight: 'bolder',
    padding: '0 15px 5px',
    margin: '0 0 20px',
    borderBottom: '1px solid #ddd',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  list: {
    border: '1px solid #ddd',
    borderRadius: 3,
  },
  cell: {
    width: '100%',
    padding: '20px',
    position: 'relative',
    '& + &::before': {
      display: 'inline-block',
      content: '""',
      width: 'calc(100% - 20px)',
      height: 1,
      backgroundColor: '#ddd',
      position: 'absolute',
      top: 0,
      right: 0,
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bolder',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  about: {
    margin: '20px 0 0',
    fontSize: '1.3rem',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  relative: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 0',
    fontSize: '1.3rem',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  author: {
    display: 'inline-block',
    flexGrow: 1,
    margin: '0 0 0 10px',
    fontWeight: 'bolder',
  },
})
