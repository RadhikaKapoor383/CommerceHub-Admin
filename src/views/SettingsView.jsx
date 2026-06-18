import { useState } from 'react';
import { 
  Store, 
  ShieldAlert, 
  BellRing, 
  CreditCard, 
  Truck,
  Save,
  Check,
  Plus,
  Trash2,
  Lock
} from 'lucide-react';

export default function SettingsView({ adminName = 'Radhika Kapoor', adminEmail = 'radhika@admin.com', adminRole = 'Store Owner' }) {
  const [activeSubTab, setActiveSubTab] = useState('store');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock State for Settings
  const [storeInfo, setStoreInfo] = useState({
    name: 'CommerceHub Premium Shop',
    email: 'contact@commerchub.com',
    currency: 'USD',
    language: 'English'
  });

  const [notificationRules, setNotificationRules] = useState({
    orderEmail: true,
    lowStockAlert: true,
    payoutSummary: false,
    newSignup: true
  });

  const [paymentKeys, setPaymentKeys] = useState({
    stripeKey: 'pk_live_51Mzk...',
    stripeSecret: 'sk_live_51Mzk...',
    paypalClient: 'AQC1h...'
  });

  const [users, setUsers] = useState([
    { id: 1, name: adminName, email: adminEmail, role: adminRole, status: 'Active' },
    { id: 2, name: 'Alex Rivera', email: 'alex.r@example.com', role: 'Administrator', status: 'Active' },
    { id: 3, name: 'Emma Watson', email: 'emma@example.com', role: 'Support Agent', status: 'Inactive' }
  ]);

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Administrator');

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert('Please fill in both name and email.');
      return;
    }
    const newUser = {
      id: Math.floor(100 + Math.random() * 900),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active'
    };
    setUsers(prev => [...prev, newUser]);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleDeleteUser = (id) => {
    if (id === 1) {
      alert('Cannot delete the primary Store Owner.');
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="fade-in-up">
      {/* Title */}
      <div className="row mb-4 align-items-center">
        <div className="col-12">
          <h2 className="fw-bold mb-1">Store Settings</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            Configure store metadata, shipping modules, and payouts.
          </p>
        </div>
      </div>

      {/* Save Toast Banner */}
      {saveSuccess && (
        <div className="alert alert-success border border-success-subtle glass-card p-3 mb-4 d-flex align-items-center gap-2.5 text-success-emphasis" style={{ background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px' }}>
          <Check size={20} className="text-success" />
          <span className="fw-semibold small">Settings saved successfully! Changes have been committed to local preferences.</span>
        </div>
      )}

      {/* Grid: Nav list on left, Tab panel on right */}
      <div className="row g-4">
        {/* Left Side: Settings Submenus */}
        <div className="col-12 col-md-4 col-lg-3">
          <div className="glass-card p-2 d-flex flex-column gap-1">
            <button 
              className={`btn border-0 text-start px-3 py-2.5 rounded-3 d-flex align-items-center gap-2.5 ${activeSubTab === 'store' ? 'btn-primary' : 'text-secondary-color hover-bg'}`}
              onClick={() => setActiveSubTab('store')}
              style={activeSubTab === 'store' ? { background: 'var(--grad-primary)' } : {}}
            >
              <Store size={18} />
              <span className="small fw-semibold">Store Info</span>
            </button>
            <button 
              className={`btn border-0 text-start px-3 py-2.5 rounded-3 d-flex align-items-center gap-2.5 ${activeSubTab === 'users' ? 'btn-primary' : 'text-secondary-color hover-bg'}`}
              onClick={() => setActiveSubTab('users')}
              style={activeSubTab === 'users' ? { background: 'var(--grad-primary)' } : {}}
            >
              <ShieldAlert size={18} />
              <span className="small fw-semibold">User Roles</span>
            </button>
            <button 
              className={`btn border-0 text-start px-3 py-2.5 rounded-3 d-flex align-items-center gap-2.5 ${activeSubTab === 'notifications' ? 'btn-primary' : 'text-secondary-color hover-bg'}`}
              onClick={() => setActiveSubTab('notifications')}
              style={activeSubTab === 'notifications' ? { background: 'var(--grad-primary)' } : {}}
            >
              <BellRing size={18} />
              <span className="small fw-semibold">Notifications</span>
            </button>
            <button 
              className={`btn border-0 text-start px-3 py-2.5 rounded-3 d-flex align-items-center gap-2.5 ${activeSubTab === 'payments' ? 'btn-primary' : 'text-secondary-color hover-bg'}`}
              onClick={() => setActiveSubTab('payments')}
              style={activeSubTab === 'payments' ? { background: 'var(--grad-primary)' } : {}}
            >
              <CreditCard size={18} />
              <span className="small fw-semibold">Payment Gateways</span>
            </button>
            <button 
              className={`btn border-0 text-start px-3 py-2.5 rounded-3 d-flex align-items-center gap-2.5 ${activeSubTab === 'shipping' ? 'btn-primary' : 'text-secondary-color hover-bg'}`}
              onClick={() => setActiveSubTab('shipping')}
              style={activeSubTab === 'shipping' ? { background: 'var(--grad-primary)' } : {}}
            >
              <Truck size={18} />
              <span className="small fw-semibold">Shipping Profiles</span>
            </button>
          </div>
        </div>

        {/* Right Side: Detailed Tab Panel */}
        <div className="col-12 col-md-8 col-lg-9">
          <div className="glass-card p-4">
            
            {/* Store Information Form */}
            {activeSubTab === 'store' && (
              <form onSubmit={handleSave}>
                <h5 className="fw-bold mb-1 text-primary-color">Store Information</h5>
                <p className="text-secondary-color small mb-4">Basic branding details and currency preferences.</p>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary-color small fw-semibold">Store Brand Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-custom" 
                      value={storeInfo.name} 
                      onChange={(e) => setStoreInfo({...storeInfo, name: e.target.value})}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary-color small fw-semibold">Support Email</label>
                    <input 
                      type="email" 
                      className="form-control form-control-custom" 
                      value={storeInfo.email} 
                      onChange={(e) => setStoreInfo({...storeInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary-color small fw-semibold">Default Currency</label>
                    <select 
                      className="form-select form-control-custom"
                      value={storeInfo.currency}
                      onChange={(e) => setStoreInfo({...storeInfo, currency: e.target.value})}
                    >
                      <option value="USD">USD ($) United States Dollar</option>
                      <option value="EUR">EUR (€) Euro</option>
                      <option value="GBP">GBP (£) British Pound</option>
                      <option value="AUD">AUD ($) Australian Dollar</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary-color small fw-semibold">Language Profile</label>
                    <select 
                      className="form-select form-control-custom"
                      value={storeInfo.language}
                      onChange={(e) => setStoreInfo({...storeInfo, language: e.target.value})}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish (Español)</option>
                      <option value="French">French (Français)</option>
                      <option value="German">German (Deutsch)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-top d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary d-inline-flex align-items-center gap-2" style={{ background: 'var(--grad-primary)', border: 'none' }}>
                    <Save size={16} /> Save Information
                  </button>
                </div>
              </form>
            )}

            {/* User Roles Management */}
            {activeSubTab === 'users' && (
              <div>
                <h5 className="fw-bold mb-1 text-primary-color">User Access Roles</h5>
                <p className="text-secondary-color small mb-4">Grant permissions to team administrators and managers.</p>
                
                {/* Users list */}
                <div className="table-responsive mb-4">
                  <table className="table table-premium mb-0 small">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Access Role</th>
                        <th>Status</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="fw-bold text-primary-color">{u.name}</span>
                              <span className="text-muted text-xs">{u.email}</span>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-secondary-subtle text-secondary">{u.role}</span>
                          </td>
                          <td>
                            <span className={`badge-premium ${u.status === 'Active' ? 'badge-premium-success' : 'badge-premium-muted'}`} style={{ fontSize: '0.65rem' }}>
                              {u.status}
                            </span>
                          </td>
                          <td className="text-end">
                            <button 
                              className="btn btn-link text-danger p-1 rounded hover-bg"
                              onClick={() => handleDeleteUser(u.id)}
                              disabled={u.id === 1}
                              style={{ border: 'none' }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add new user form */}
                <form onSubmit={handleAddUser} className="p-3 border rounded bg-black-10">
                  <h6 className="fw-bold mb-3 small text-primary-color">Add New Team Member</h6>
                  <div className="row g-2.5">
                    <div className="col-12 col-md-4">
                      <input 
                        type="text" 
                        className="form-control form-control-custom form-control-sm" 
                        placeholder="Full Name" 
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <input 
                        type="email" 
                        className="form-control form-control-custom form-control-sm" 
                        placeholder="email@example.com" 
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-md-3">
                      <select 
                        className="form-select form-control-custom form-control-sm"
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value)}
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Editor">Editor</option>
                        <option value="Support Agent">Support Agent</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-1">
                      <button type="submit" className="btn btn-sm btn-primary w-100 d-flex align-items-center justify-content-center h-100" style={{ background: 'var(--grad-primary)', border: 'none' }}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Notification Rules Switchers */}
            {activeSubTab === 'notifications' && (
              <form onSubmit={handleSave}>
                <h5 className="fw-bold mb-1 text-primary-color">Notification Prefs</h5>
                <p className="text-secondary-color small mb-4">Choose which events trigger instant mail/system logs.</p>
                <div className="d-flex flex-column gap-3.5">
                  <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0 pb-3 border-bottom">
                    <div>
                      <label className="form-check-label fw-semibold text-primary-color small d-block">Order Receipt Emails</label>
                      <span className="text-muted text-xs">Send emails to {adminName} for each checkout order received.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      className="form-check-input ms-0" 
                      style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                      checked={notificationRules.orderEmail}
                      onChange={(e) => setNotificationRules({...notificationRules, orderEmail: e.target.checked})}
                    />
                  </div>

                  <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0 pb-3 border-bottom">
                    <div>
                      <label className="form-check-label fw-semibold text-primary-color small d-block">Low Stock Warnings</label>
                      <span className="text-muted text-xs">Trigger notifications when item quantity falls below 10.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      className="form-check-input ms-0" 
                      style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                      checked={notificationRules.lowStockAlert}
                      onChange={(e) => setNotificationRules({...notificationRules, lowStockAlert: e.target.checked})}
                    />
                  </div>

                  <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0 pb-3 border-bottom">
                    <div>
                      <label className="form-check-label fw-semibold text-primary-color small d-block">Payout Summaries</label>
                      <span className="text-muted text-xs">Receive weekly transaction and Stripe profit summaries.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      className="form-check-input ms-0" 
                      style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                      checked={notificationRules.payoutSummary}
                      onChange={(e) => setNotificationRules({...notificationRules, payoutSummary: e.target.checked})}
                    />
                  </div>

                  <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                    <div>
                      <label className="form-check-label fw-semibold text-primary-color small d-block">New Consumer Registrations</label>
                      <span className="text-muted text-xs">Send instant notification when a customer registers.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      className="form-check-input ms-0" 
                      style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                      checked={notificationRules.newSignup}
                      onChange={(e) => setNotificationRules({...notificationRules, newSignup: e.target.checked})}
                    />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-top d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary d-inline-flex align-items-center gap-2" style={{ background: 'var(--grad-primary)', border: 'none' }}>
                    <Save size={16} /> Save Notifications
                  </button>
                </div>
              </form>
            )}

            {/* Payment Gateway keys config */}
            {activeSubTab === 'payments' && (
              <form onSubmit={handleSave}>
                <h5 className="fw-bold mb-1 text-primary-color">Payment Gateways</h5>
                <p className="text-secondary-color small mb-4">Connect Stripe, PayPal, and credit card gateways.</p>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-primary px-2.5 py-1">Stripe Connected</span>
                    </div>
                    <div className="row g-2">
                      <div className="col-12 col-md-6">
                        <label className="form-label text-secondary-color text-xs fw-semibold">Publishable Key</label>
                        <div className="position-relative">
                          <input 
                            type="text" 
                            className="form-control form-control-custom ps-4.5" 
                            value={paymentKeys.stripeKey}
                            onChange={(e) => setPaymentKeys({...paymentKeys, stripeKey: e.target.value})}
                          />
                          <Lock size={12} className="position-absolute top-50 start-0 translate-middle-y ms-2.5 text-muted" />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label text-secondary-color text-xs fw-semibold">Secret Key</label>
                        <div className="position-relative">
                          <input 
                            type="password" 
                            className="form-control form-control-custom ps-4.5" 
                            value={paymentKeys.stripeSecret}
                            onChange={(e) => setPaymentKeys({...paymentKeys, stripeSecret: e.target.value})}
                          />
                          <Lock size={12} className="position-absolute top-50 start-0 translate-middle-y ms-2.5 text-muted" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 pt-3 border-top">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-warning text-dark px-2.5 py-1">PayPal Sandbox</span>
                    </div>
                    <div>
                      <label className="form-label text-secondary-color text-xs fw-semibold">Client ID</label>
                      <input 
                        type="text" 
                        className="form-control form-control-custom" 
                        value={paymentKeys.paypalClient}
                        onChange={(e) => setPaymentKeys({...paymentKeys, paypalClient: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-top d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary d-inline-flex align-items-center gap-2" style={{ background: 'var(--grad-primary)', border: 'none' }}>
                    <Save size={16} /> Save Gateways
                  </button>
                </div>
              </form>
            )}

            {/* Shipping Profiles and regions */}
            {activeSubTab === 'shipping' && (
              <form onSubmit={handleSave}>
                <h5 className="fw-bold mb-1 text-primary-color">Shipping Configurations</h5>
                <p className="text-secondary-color small mb-4">Set up flat-rate zones and carrier profiles.</p>
                <div className="d-flex flex-column gap-3.5">
                  
                  {/* DHL Check */}
                  <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
                    <div>
                      <span className="fw-semibold text-primary-color small d-block">DHL Express Cargo</span>
                      <span className="text-muted text-xs">Realtime weight calculations at checkout.</span>
                    </div>
                    <div className="form-check form-switch ps-0">
                      <input 
                        type="checkbox" 
                        className="form-check-input ms-0" 
                        style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                        defaultChecked
                      />
                    </div>
                  </div>

                  {/* FedEx Check */}
                  <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
                    <div>
                      <span className="fw-semibold text-primary-color small d-block">FedEx Standard International</span>
                      <span className="text-muted text-xs">Flat rate shipping of $15 globally.</span>
                    </div>
                    <div className="form-check form-switch ps-0">
                      <input 
                        type="checkbox" 
                        className="form-check-input ms-0" 
                        style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                        defaultChecked
                      />
                    </div>
                  </div>

                  {/* USPS check */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="fw-semibold text-primary-color small d-block">USPS Ground Advantage</span>
                      <span className="text-muted text-xs">Domestic flat-rates of $4.99 under 1lb.</span>
                    </div>
                    <div className="form-check form-switch ps-0">
                      <input 
                        type="checkbox" 
                        className="form-check-input ms-0" 
                        style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                      />
                    </div>
                  </div>

                </div>
                <div className="mt-4 pt-3 border-top d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary d-inline-flex align-items-center gap-2" style={{ background: 'var(--grad-primary)', border: 'none' }}>
                    <Save size={16} /> Save Shipping Profiles
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
