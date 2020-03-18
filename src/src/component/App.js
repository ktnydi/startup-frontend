import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'unstated';
import Header from '../common/Header';
import Main from '../common/Main';
import Footer from '../common/Footer';

function App() {
  return (
    <Provider>
      <Router>
        <Header />
        <Main />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
