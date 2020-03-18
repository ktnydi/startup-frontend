import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Subscribe } from 'unstated';
import StartupContainer from '../container/StartupContainer';
import SignUp from '../component/SignUp';
import SignIn from '../component/SignIn';
import ForgotPassword from '../component/ForgotPassword';
import Setting from '../component/Setting';
import EditPassword from '../component/EditPassword';
import Project from '../component/Project';
import ProjectDetail from '../component/ProjectDetail';
import ProjectCreate from '../component/ProjectCreate';

export default function Main() {
  return(
    <main>
      <Subscribe to={[StartupContainer]}>
        {startup => (
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
            <Route path = '/password/edit'>
              <EditPassword />
            </Route>
            <Route path = '/setting'>
              <Setting />
            </Route>
            <Route path = '/projects/create'>
              <ProjectCreate />
            </Route>
            <Route path='/projects/:id'>
              <ProjectDetail />
            </Route>
            <Route path='/'>
              <Project />
            </Route>
          </Switch>
        )}
      </Subscribe>
    </main>
  )
}
