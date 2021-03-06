import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';
import theme from '../asset/Theme';
import itemsData from '../data/itemsData';
import Indicator from '../common/Indicator';
import { Connect } from '../context/Context';

function Project(props) {
  const [items, setItems] = React.useState(itemsData);
  const [filterItems, setFilterItems] = React.useState([]);
  const [desc, setDesc] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(true)
  const classes = useStyles();

  React.useEffect(() => {
    const fetchItems = async () => {
      return await props.store.fetchProjects();
    }
    fetchItems().then((items) => {
      setItems(items)
      setFilterItems(items);
      setLoading(false)
    })
  }, [])

  React.useEffect(() => {
    if (loading) { return }
    setFilterItems(items);
  }, [items])

  const searchItems = (e) => {
    if (e.type === 'keydown' && e.keyCode !== 13) { return false }

    const filterItems = items.filter((item) => {
      const keys = ['title', 'items', 'about'];
      return keys.some(key => {
        const value = String(item[key]).toUpperCase();
        return value.indexOf(search.toUpperCase()) >= 0;
      })
    });

    if (!desc) {
      filterItems.sort((prevItem, nextItem) => {
        const judge = prevItem['createdAt'] - nextItem['createdAt'];
        return judge
      });
    }

    setFilterItems(filterItems);
  }

  const orderItems = ({desc=false}) => {
    const newItems = Object.assign([], filterItems);
    newItems.sort((prevItem, nextItem) => {
      const judge = prevItem.createdAt - nextItem.createdAt;
      
      return desc ? -judge : judge;
    });
    setFilterItems(newItems);
    setDesc(desc);
  }

  return(
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.header}>募集中のプロジェクト</h2>
        <div className={classes.searchDispacher}>
          <input
            type='text'
            placeholder='キーワードで検索する'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => searchItems(e)}
            className={classes.searchAction}
          />
          <div className={classes.searchBtn} onClick={(e) => searchItems(e)}>
            <Icon className={classes.searchIcon}>search</Icon>
          </div>
        </div>
        <div className={classes.sortDispacher}>
          <button
            type='button'
            onClick={() => orderItems({desc: true})}
            className={classes.sortAction}
            style={{opacity: desc ? 1 : 0.6}}
          >
            新しい順
          </button>
          <button
            type='button'
            onClick={() => orderItems({desc: false})}
            className={classes.sortAction}
            style={{opacity: desc ? 0.6 : 1}}
          >
            古い順
          </button>
        </div>
        {loading ? <Indicator size={30} /> : <ProjectList items={filterItems} />}
      </div>
    </div>
  )
}

function ProjectList({items}) {
  const classes = useStyles();
  const props = useSpring({opacity: 1, transform: 'translateY(0)', from: {opacity: 0, transform: 'translateY(50px)'}});

  return(
    <animated.div className={classes.nav} style={props}>
      <div className={classes.list}>
        {
          items.length > 0 ? (
            items.map((item, index) => ( <ProjectCell item={item} key={index} /> ))
          ) : (
            <div className={classes.noItems}>検索結果が見つかりませんでした。</div>
          )
        }
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
        <img src={item.user.photoURL} width={40} className={classes.avatar} />
        <span className={classes.author}>{item.user.displayName}</span>
        <span>{displayDuration(item.createdAt)}</span>
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
  searchDispacher: {
    margin: '20px 0 0',
    position: 'relative',
  },
  searchAction: {
    display: 'inline-block',
    width: '100%',
    height: 44,
    padding: '0 60px 0 20px',
    border: '1px solid #ddd',
    borderRadius: '22px',
    outline: 'none',
    transition: '0.2s',
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  searchBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    padding: '0 20px',
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  searchIcon: {
    fontSize: 'inherit',
  },
  header: {
    fontSize: '1.8rem',
    fontWeight: 'bolder',
    padding: '0 15px 5px',
    borderBottom: '1px solid #ddd',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  sortDispacher: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 0',
  },
  sortAction: {
    display: 'inline-block',
    margin: '0 10px 0 0',
    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  list: {
    margin: '20px 0 0',
    border: '1px solid #ddd',
    borderRadius: 3,
  },
  noItems: {
    padding: '50px 15px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.75)',
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
  avatar: {
    display: 'inline-block',
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '1px solid #ddd',
  },
  author: {
    display: 'inline-block',
    flexGrow: 1,
    margin: '0 0 0 10px',
    fontWeight: 'bolder',
  },
})

export default Connect(Project);
