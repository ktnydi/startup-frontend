import React from 'react';
import { Avatar, Tabs, Tab } from '@material-ui/core';
import TabPanel from '../common/TabPanel';
import { makeStyles } from '@material-ui/core/styles';
import WantedList from './WantedList';
import AppliedList from './AppliedList';
import theme from '../asset/Theme';

export default function Dashboard() {
  const [index, setIndex] = React.useState(0);
  const classes = useStyles();

  const handleChangeTab = (e, newValue) => (
    setIndex(newValue)
  )

  return(
    <div className={classes.root}>
      <div className={classes.signinUser}>
        <Avatar alt='login user image' src='https://source.unsplash.com/random/80x80' className={classes.avatar} />
        <div className={classes.name}>ゲストユーザー</div>
      </div>
      <div className={classes.tabBar}>
        <Tabs
          indicatorColor='primary'
          variant='fullWidth'
          value={index}
          onChange={(e, newValue) => handleChangeTab(e, newValue)}
          TabIndicatorProps={{
            className: classes.indicator,
          }}
        >
          <Tab label='募集' className={classes.tab} disableFocusRipple={true} disableRipple={true} />
          <Tab label='応募' className={classes.tab} disableFocusRipple={true} disableRipple={true} />
        </Tabs>
        <TabPanel index={0} currentIndex={index}>
          <WantedList />
        </TabPanel>
        <TabPanel index={1} currentIndex={index}>
          <AppliedList />
        </TabPanel>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
    padding: '80px 15px 40px',
    color: 'rgba(0, 0, 0, 0.75)',
  },
  signinUser: {
    textAlign: 'center',
  },
  avatar: {
    display: 'inline-block',
    width: 120,
    height: 120,
    border: '1px solid #ddd',
  },
  name: {
    margin: '15px 0 0',
  },
  tabBar: {
    width: '100%',
    margin: '30px 0 0',
    border: '1px solid #ddd',
    borderRadius: 3,
  },
  tab: {
    fontSize: '1.5rem',
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
  },
});
