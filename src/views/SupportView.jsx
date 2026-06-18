import { BookOpen, HelpCircle, LifeBuoy, MessageCircle } from 'lucide-react';

export default function SupportView() {
  const supportOptions = [
    { title: 'Help Center', desc: 'Browse guides for products, inventory, orders, and reports.', icon: BookOpen },
    { title: 'Contact Support', desc: 'Send a store issue to the admin support team.', icon: LifeBuoy },
    { title: 'Live Chat', desc: 'Start a quick conversation for urgent account questions.', icon: MessageCircle }
  ];

  return (
    <div className="fade-in-up">
      <div className="row mb-4 align-items-center">
        <div className="col-12">
          <h2 className="fw-bold mb-1">Help & Support</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            Find dashboard guidance, account help, and store operation support.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {supportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div key={option.title} className="col-12 col-md-4">
              <div className="glass-card p-4 h-100">
                <div className="kpi-icon-wrapper mb-3" style={{ background: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-info)' }}>
                  <Icon size={22} />
                </div>
                <h5 className="fw-bold mb-2">{option.title}</h5>
                <p className="text-secondary-color small mb-0">{option.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <HelpCircle size={18} className="text-primary" />
          <h5 className="fw-bold mb-0">Submit a Support Request</h5>
        </div>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <input className="form-control form-control-custom" placeholder="Subject" />
          </div>
          <div className="col-12 col-md-6">
            <select className="form-select form-control-custom" defaultValue="Account">
              <option>Account</option>
              <option>Orders</option>
              <option>Inventory</option>
              <option>Payments</option>
            </select>
          </div>
          <div className="col-12">
            <textarea className="form-control form-control-custom" rows="5" placeholder="Describe what you need help with..." />
          </div>
          <div className="col-12 text-end">
            <button className="btn btn-primary" style={{ background: 'var(--grad-primary)', border: 'none' }}>
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
