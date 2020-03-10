import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'unstated';
import Header from './component/screen/common/Header';
import Main from './component/screen/common/Main';
import Footer from './component/screen/common/Footer';

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
