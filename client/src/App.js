import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/store';
import { load } from './state/auth/actions'; 
import PrivateRoute from './components/routing/PrivateRoute';
import NotFound from './components/routing/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/auth/Dashboard';
import './resources/styles/App.scss';


const App = () => {
  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      store.dispatch(load());
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;