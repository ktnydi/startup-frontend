import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Subscribe } from 'unstated';
import StartupContainer from '../../container/StartupContainer';
import SignUp from '../auth/SignUp';

export default function Main() {
  return(
    <main>
      <Subscribe to={[StartupContainer]}>
        {startup => (
          <Router>
            <Switch>
              <Route path='/signup'>
                <SignUp />
              </Route>
              <Route path='/'>
                <div>main</div>
              </Route>
            </Switch>
          </Router>
        )}
      </Subscribe>
    </main>
  )
}