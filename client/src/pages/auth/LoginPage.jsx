import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from === '/login' ? '/' : from);
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError(null);
  };

  return (
    <div className="container" style={{ maxWidth: '460px', padding: 'var(--space-12) var(--space-4)' }}>
      <div className="card auth-card" style={{ padding: 'var(--space-8)' }}>
        <h2 style={{ marginBottom: 'var(--space-1)', textAlign: 'center' }}>Welcome Back</h2>
        <p style={{ color: 'var(--color-muted)', textAlign: 'center', marginBottom: 'var(--space-6)', fontSize: '0.9rem' }}>
          Sign in to your Free Book Store account to access your orders
        </p>

        {error && (
          <div className="feedback-alert feedback-error" style={{ marginBottom: 'var(--space-4)' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Demo Fast-Fill Box */}
        <div style={{ backgroundColor: 'var(--color-page)', padding: 'var(--space-3)', borderRadius: 'var(--radius-small)', marginBottom: 'var(--space-6)', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-terracotta)', marginBottom: '6px' }}>
            Quick Demo Login
          </div>
          <div className="auth-demo-btns" style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, fontSize: '0.75rem' }}
              onClick={() => handleDemoFill('admin@pandora.com', 'Admin@123')}
            >
              👤 Fill Admin
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, fontSize: '0.75rem' }}
              onClick={() => handleDemoFill('reader@pandora.com', 'Reader@123')}
            >
              📖 Fill Customer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. reader@freebookstore.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 'var(--space-4)' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--color-signal-coral)', fontWeight: 600 }}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
