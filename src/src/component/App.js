import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../common/Header';
import Main from '../common/Main';
import Footer from '../common/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Main />
      <Footer />
    </Router>
  );
}

export default App;
