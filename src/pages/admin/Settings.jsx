import React from 'react';
import { Link } from 'react-router-dom';

const AdminSettings = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Settings</h1>
      <p>Adjust settings here.</p>
      <Link to="/admin/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default AdminSettings;