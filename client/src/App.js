import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthState from './state/auth/AuthState';
import PrivateRoute from './components/routing/PrivateRoute';
import NotFound from './components/routing/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/auth/Dashboard';
import './resources/styles/App.scss';

const App = () => {
  return (
    <AuthState>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
