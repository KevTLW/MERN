import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, setError } from '../../state/auth/actions';

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const { authenticated, errors } = useSelector(state => state.auth);

  const [data, setData] = useState({
    confirmPassword: '',
    email: '',
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

    if (!confirmPassword || !email || !password || !username) {
      dispatch(setError([ 'All fields are required' ]));
    } else if (password !== confirmPassword) {
      dispatch(setError([ 'Passwords do not match' ]));
    } else {
      dispatch(register(data));
    }
  }

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }

    // eslint-disable-next-line
  }, [authenticated]);

  const { confirmPassword, email, password, username } = data;

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
        <label htmlFor='email'>email: </label>
        <input
          name='email'
          onChange={handleChange}
          type='email'
          value={email}
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
      <div>
        <label htmlFor='confirmPassword'>confirm password: </label>
        <input
          name='confirmPassword'
          onChange={handleChange}
          type='password'
          value={confirmPassword}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default Register;