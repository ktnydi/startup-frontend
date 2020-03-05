import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Subscribe } from 'unstated';
import StartupContainer from '../../container/StartupContainer';
import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';
import ForgotPassword from '../auth/ForgotPassword';
import Setting from '../auth/Setting';

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
              <Route path='/login'>
                <SignIn />
              </Route>
              <Route path = '/password/new'>
                <ForgotPassword />
              </Route>
              <Route path = '/setting'>
                <Setting />
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
