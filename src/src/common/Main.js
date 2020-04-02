import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import SignUp from '../component/SignUp';
import SignIn from '../component/SignIn';
import ForgotPassword from '../component/ForgotPassword';
import Setting from '../component/Setting';
import Dashboard from '../component/Dashboard';
import EditPassword from '../component/EditPassword';
import Project from '../component/Project';
import ProjectDetail from '../component/ProjectDetail';
import ProjectCreate from '../component/ProjectCreate';
import { Success, Failure } from '../common/Notice';
import { Connect } from '../context/Context';

function Main(props) {
  return(
    <main>
      <Success message={props.store.notice.success.message} />
      <Failure message={props.store.notice.failure.message} />
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
        <Route path='/dashboard'>
          <Dashboard />
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
    </main>
  )
}

export default Connect(Main)
