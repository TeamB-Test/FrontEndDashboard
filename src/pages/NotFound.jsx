import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/admin/dashboard" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Admin Dashboard
      </Link>
    </div>
  );
};

export default NotFound;