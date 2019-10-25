import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setError } from '../../state/auth/actions';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { authenticated, errors } = useSelector(state => state.auth);

  const [data, setData] = useState({
    password: '',
    username: ''
  });

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!password || !username) {
      dispatch(setError([ 'All fields are required' ]));
    } else {
      dispatch(login(data));
    }
  }

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
    
    // eslint-disable-next-line
  }, [authenticated]);

  const { password, username } = data;

  return (
    <form onSubmit={handleSubmit}>
      {errors && errors.map(err => (
        <p key={err}>{err}</p>
      ))}
      <div>
        <label htmlFor='username'>username: </label>
        <input
          name='username'
          onChange={handleChange}
          type='text'
          value={username}
        />
      </div>
      <div>
        <label htmlFor='password'>password: </label>
        <input
          name='password'
          onChange={handleChange}
          type='password'
          value={password}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default Login;