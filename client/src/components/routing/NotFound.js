import React from 'react';

const NotFound = ({ location }) => (
  <>
    <strong>404 Error</strong>{' '}
    nothing found for {location.pathname}
  </>
);

export default NotFound;