import { Bell, CheckCircle2 } from 'lucide-react';

export default function NotificationsView({ notifications }) {
  return (
    <div className="fade-in-up">
      <div className="row mb-4 align-items-center">
        <div className="col-12">
          <h2 className="fw-bold mb-1">Notification Center</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            Track store alerts, payout events, inventory warnings, and system updates.
          </p>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="d-flex flex-column gap-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-row">
              <div className="kpi-icon-wrapper" style={{ background: notification.unread ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)', color: notification.unread ? 'var(--accent-danger)' : 'var(--accent-success)' }}>
                {notification.unread ? <Bell size={20} /> : <CheckCircle2 size={20} />}
              </div>
              <div className="flex-grow-1">
                <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                  <span className="fw-bold text-primary-color">{notification.title}</span>
                  <span className={`badge-premium ${notification.unread ? 'badge-premium-danger' : 'badge-premium-success'}`}>
                    {notification.unread ? 'New' : 'Read'}
                  </span>
                  <span className="badge bg-secondary-subtle text-secondary">{notification.type}</span>
                </div>
                <p className="text-secondary-color mb-1 small">{notification.desc}</p>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
