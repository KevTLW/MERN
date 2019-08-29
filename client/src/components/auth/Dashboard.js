import React, { useContext, useEffect } from 'react';
import AuthContext from '../../state/auth/context';

const Dashboard = ({ history }) => {
  const { authenticated, loading, logout, user } = useContext(AuthContext);

  useEffect(() => {
    if (!authenticated) {
      history.push('/login')
    }
    
    // eslint-disable-next-line
  }, [authenticated, user]);

  return (
    <>
      {!loading && (
        <>
          <h1>Hi {user && user.username}</h1>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </>
  );
}

export default Dashboard
