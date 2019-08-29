import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../state/auth/context';

const Login = ({ history }) => {
  const { authenticated, errors, login, setError } = useContext(AuthContext);

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
      setError([ 'All fields are required' ]);
    } else {
      login(data);
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
        <p>{err}</p>
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