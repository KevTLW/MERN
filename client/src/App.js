import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import AuthState from './state/auth/AuthState';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './resources/styles/App.scss';

const App = () => {
  return (
    <AuthState>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/' component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
