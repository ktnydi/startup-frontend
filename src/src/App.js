import React from 'react';
import { Provider } from 'unstated';
import Header from './component/screen/common/Header';
import Main from './component/screen/common/Main';
import Footer from './component/screen/common/Footer';

function App() {
  return (
    <Provider>
      <Header />
      <Main />
      <Footer />
    </Provider>
  );
}

export default App;
