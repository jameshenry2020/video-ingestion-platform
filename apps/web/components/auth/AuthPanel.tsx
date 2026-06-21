'use client';

import { useState } from 'react';
import { api } from '../../lib/api';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';

interface AuthPanelProps {
  onAuthSuccess: () => void;
}

export function AuthPanel({ onAuthSuccess }: AuthPanelProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const res = await api.post(endpoint, { email, password });
      
      const { accessToken } = res.data;
      localStorage.setItem('access_token', accessToken);
      onAuthSuccess();
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Authentication failed. Please verify credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel auth-container" style={{ minWidth: '360px' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800 }}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
          {isLogin ? 'Access the media publishing studio' : 'Sign up to upload and process videos'}
        </p>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--error)',
            color: 'var(--error)',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-input"
            placeholder="name@company.com"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-input"
            placeholder="••••••••"
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }} disabled={loading}>
          {loading ? (
            <Loader2 size={18} className="spin" />
          ) : isLogin ? (
            <>
              <LogIn size={18} /> Sign In
            </>
          ) : (
            <>
              <UserPlus size={18} /> Register
            </>
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}
