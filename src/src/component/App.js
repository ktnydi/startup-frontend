import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../common/Header';
import Main from '../common/Main';
import Footer from '../common/Footer';
import Loading from '../common/Loading';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../firebase';
import { Connect } from '../context/Context';

function App(props) {
  const [loading, setLoading] = React.useState(true);

  const classes = useStyles();

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      props.store.userAuthState(user);
      setLoading(false);
    })
  }, [])

  if (loading) {
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        className={classes.container}
      >
        <Loading />
      </Grid>
    );
  }

  return (
    <Router>
      <Header />
      <Main />
      <Footer />
    </Router>
  );
}

const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
})

export default Connect(App);
