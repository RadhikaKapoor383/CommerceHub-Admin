import { useState } from 'react';
import { LockKeyhole, Mail, Moon, ShieldCheck, Sun } from 'lucide-react';

export default function LoginView({ theme, toggleTheme, onLogin, adminName, adminInitials }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const didLogin = onLogin({ email, password });
    if (!didLogin) {
      setError('Only the configured admin account can access this dashboard.');
    }
  };

  return (
    <main className="login-shell">
      <section className="login-panel glass-card fade-in-up">
        <div className="login-panel-header">
          <div className="admin-initials login-initials" aria-hidden="true">
            {adminInitials}
          </div>
          <button
            type="button"
            className="btn btn-link text-muted p-2 rounded-circle hover-bg"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ border: 'none' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge-premium badge-premium-info d-inline-flex align-items-center gap-1">
              <ShieldCheck size={14} />
              Admin access
            </span>
          </div>
          <h1 className="login-title">Welcome back, {adminName}</h1>
          <p className="text-secondary-color mb-0">
            Sign in to manage products, orders, customers, and store analytics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label text-secondary-color small fw-semibold">Admin Email</label>
            <div className="position-relative">
              <Mail size={16} className="login-input-icon text-muted" />
              <input
                type="email"
                className="form-control form-control-custom ps-5"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="radhika@admin.com"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label text-secondary-color small fw-semibold">Password</label>
            <div className="position-relative">
              <LockKeyhole size={16} className="login-input-icon text-muted" />
              <input
                type="password"
                className="form-control form-control-custom ps-5"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger mb-0 py-2 px-3 small" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary fw-semibold d-inline-flex align-items-center justify-content-center gap-2 mt-2"
            style={{ background: 'var(--grad-primary)', border: 'none', minHeight: '44px' }}
          >
            <ShieldCheck size={18} />
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
