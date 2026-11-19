import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '460px', padding: 'var(--space-12) var(--space-4)' }}>
      <div className="card auth-card" style={{ padding: 'var(--space-8)' }}>
        <h2 style={{ marginBottom: 'var(--space-1)', textAlign: 'center' }}>Create an Account</h2>
        <p style={{ color: 'var(--color-muted)', textAlign: 'center', marginBottom: 'var(--space-6)', fontSize: '0.9rem' }}>
          Join Free Book Store to browse, save favorites, and order books
        </p>

        {error && (
          <div className="feedback-alert feedback-error" style={{ marginBottom: 'var(--space-4)' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name *</label>
            <input
              id="reg-name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Julian Carax"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email Address *</label>
            <input
              id="reg-email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. julian@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password (min 6 characters) *</label>
            <input
              id="reg-password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm">Confirm Password *</label>
            <input
              id="reg-confirm"
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 'var(--space-4)' }}
            disabled={loading}
          >
            {loading ? 'Creating your account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-signal-coral)', fontWeight: 600 }}>
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
