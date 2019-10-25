import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../state/auth/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector(state => state.auth);

  return (
    <>
      {!loading && (
        <>
          <h1>Hi {user && user.username}</h1>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      )}
    </>
  );
}

export default Dashboard;