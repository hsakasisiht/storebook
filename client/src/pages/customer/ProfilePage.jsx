import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', maxWidth: '600px' }}>
      <h1 style={{ marginBottom: 'var(--space-6)' }}>Customer Profile</h1>
      <div className="card" style={{ padding: 'var(--space-8)' }}>
        <p><strong>Name:</strong> {user?.name || 'Reader'}</p>
        <p style={{ marginTop: 'var(--space-2)' }}><strong>Email:</strong> {user?.email || 'reader@example.com'}</p>
        <p style={{ marginTop: 'var(--space-2)' }}><strong>Role:</strong> {user?.role || 'customer'}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
