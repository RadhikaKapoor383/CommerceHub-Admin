import { Mail, ShieldCheck, Store, UserRound } from 'lucide-react';

export default function ProfileView({ adminName, adminEmail, adminRole, adminInitials }) {
  const stats = [
    { label: 'Role', value: adminRole, icon: ShieldCheck },
    { label: 'Primary Store', value: 'CommerceHub Premium Shop', icon: Store },
    { label: 'Contact', value: adminEmail, icon: Mail }
  ];

  return (
    <div className="fade-in-up">
      <div className="row mb-4 align-items-center">
        <div className="col-12">
          <h2 className="fw-bold mb-1">My Profile</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            Review your owner profile, store access, and admin contact details.
          </p>
        </div>
      </div>

      <div className="glass-card p-4 mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center gap-4">
          <div className="admin-initials profile-initials" aria-hidden="true">{adminInitials}</div>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-2">
              <UserRound size={18} className="text-primary" />
              <span className="badge-premium badge-premium-info">Owner Profile</span>
            </div>
            <h3 className="fw-bold mb-1">{adminName}</h3>
            <p className="text-secondary-color mb-0">{adminRole} for CommerceHub Premium Shop</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="col-12 col-md-4">
              <div className="glass-card p-4 h-100">
                <div className="kpi-icon-wrapper mb-3" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)' }}>
                  <Icon size={22} />
                </div>
                <span className="text-secondary-color d-block mb-1 small fw-semibold">{item.label}</span>
                <p className="text-primary-color fw-bold mb-0">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
