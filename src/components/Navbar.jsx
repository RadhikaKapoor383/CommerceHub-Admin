import { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Mail, 
  Sun, 
  Moon, 
  User, 
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { adminMessages, adminNotifications } from '../data/adminCenterData';

export default function Navbar({ 
  theme, 
  toggleTheme, 
  setIsMobileOpen, 
  isMobileOpen,
  notificationCount = 3,
  messageCount = 2,
  onLogout,
  adminName = 'Radhika Kapoor',
  adminInitials = 'RK',
  adminRole = 'Store Owner',
  setActiveTab
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigateTo = (tabId) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
    setShowNotifications(false);
    setShowMessages(false);
    setShowProfile(false);
  };

  return (
    <nav className="navbar-custom glass-nav">
      {/* Mobile Toggle & Search */}
      <div className="d-flex align-items-center gap-3">
        <button 
          className="btn btn-link text-muted p-0 d-lg-none"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Global Search Bar */}
        <div className="position-relative d-none d-md-block" style={{ width: '280px' }}>
          <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            className="form-control form-control-custom ps-5" 
            placeholder="Search transactions, products..." 
            style={{ fontSize: '0.875rem' }}
          />
        </div>
      </div>

      {/* Action Buttons & Profile */}
      <div className="d-flex align-items-center gap-2 gap-md-3">
        
        {/* Theme Toggler */}
        <button 
          className="btn btn-link text-muted p-2 rounded-circle hover-bg" 
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{ transition: 'background-color 0.2s', border: 'none' }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="position-relative">
          <button 
            className={`btn btn-link text-muted p-2 rounded-circle hover-bg ${showNotifications ? 'active' : ''}`}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
              setShowProfile(false);
            }}
            style={{ border: 'none' }}
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="position-absolute top-1 start-50 translate-middle badge rounded-circle bg-danger" style={{ width: '8px', height: '8px', padding: 0 }}>
                <span className="visually-hidden">unread notifications</span>
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="position-absolute end-0 mt-2 p-2 dropdown-menu show" style={{ width: '320px', right: 0 }}>
              <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
                <span className="fw-semibold text-primary-color">Notifications</span>
                <span className="badge bg-primary-subtle text-primary rounded-pill font-monospace" style={{ fontSize: '0.75rem' }}>{notificationCount} New</span>
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {adminNotifications.map((n) => (
                  <button key={n.id} className="dropdown-item px-3 py-2 border-bottom d-flex flex-column gap-1 text-start" style={{ whiteSpace: 'normal', cursor: 'pointer' }} onClick={() => navigateTo('notifications')}>
                    <div className="d-flex justify-content-between align-items-start">
                      <span className={`fw-medium text-primary-color ${n.unread ? 'fw-bold' : ''}`} style={{ fontSize: '0.85rem' }}>{n.title}</span>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>{n.time}</span>
                    </div>
                    <span className="text-secondary-color text-truncate-2" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>{n.desc}</span>
                  </button>
                ))}
              </div>
              <div className="text-center pt-2 pb-1">
                <a href="#notifications" className="text-primary-color fw-semibold" style={{ fontSize: '0.8rem', textDecoration: 'none' }} onClick={(e) => {e.preventDefault(); navigateTo('notifications');}}>View all notifications</a>
              </div>
            </div>
          )}
        </div>

        {/* Messages Dropdown */}
        <div className="position-relative">
          <button 
            className={`btn btn-link text-muted p-2 rounded-circle hover-bg ${showMessages ? 'active' : ''}`}
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
              setShowProfile(false);
            }}
            style={{ border: 'none' }}
          >
            <Mail size={20} />
            {messageCount > 0 && (
              <span className="position-absolute top-1 start-50 translate-middle badge rounded-circle bg-primary" style={{ width: '8px', height: '8px', padding: 0 }}>
                <span className="visually-hidden">unread messages</span>
              </span>
            )}
          </button>

          {showMessages && (
            <div className="position-absolute end-0 mt-2 p-2 dropdown-menu show" style={{ width: '320px', right: 0 }}>
              <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
                <span className="fw-semibold text-primary-color">Direct Messages</span>
                <span className="badge bg-primary-subtle text-primary rounded-pill font-monospace" style={{ fontSize: '0.75rem' }}>{messageCount} New</span>
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {adminMessages.map((m) => (
                  <button key={m.id} className="dropdown-item px-3 py-2 border-bottom d-flex gap-2 align-items-center text-start" style={{ whiteSpace: 'normal', cursor: 'pointer' }} onClick={() => navigateTo('messages')}>
                    <img src={m.avatar} alt={m.sender} className="rounded-circle" style={{ width: '36px', height: '36px', objectFit: 'cover', flexShrink: 0 }} />
                    <div className="flex-grow-1 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-baseline">
                        <span className="fw-semibold text-primary-color" style={{ fontSize: '0.85rem' }}>{m.sender}</span>
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}>{m.time}</span>
                      </div>
                      <span className="text-secondary-color text-truncate" style={{ fontSize: '0.75rem', maxWidth: '210px' }}>{m.preview}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="text-center pt-2 pb-1">
                <a href="#messages" className="text-primary-color fw-semibold" style={{ fontSize: '0.8rem', textDecoration: 'none' }} onClick={(e) => {e.preventDefault(); navigateTo('messages');}}>See all messages</a>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="vr d-none d-md-block" style={{ height: '24px', opacity: 0.15 }}></div>

        {/* User Profile Dropdown */}
        <div className="position-relative">
          <button 
            className="btn btn-link text-muted p-0 d-flex align-items-center gap-2 dropdown-toggle-custom"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
              setShowMessages(false);
            }}
            style={{ textDecoration: 'none', border: 'none' }}
          >
            <span className="admin-initials" aria-label={`${adminName} profile`}>
              {adminInitials}
            </span>
            <div className="d-none d-md-flex flex-column align-items-start">
              <span className="fw-semibold text-primary-color" style={{ fontSize: '0.85rem', lineHeight: '1.2' }}>{adminName}</span>
              <span className="text-muted" style={{ fontSize: '0.7rem' }}>{adminRole}</span>
            </div>
            <ChevronDown size={14} className="text-muted d-none d-md-block" />
          </button>

          {showProfile && (
            <div className="position-absolute end-0 mt-2 p-1 dropdown-menu show" style={{ width: '200px' }}>
              <div className="px-3 py-2 border-bottom d-md-none">
                <div className="fw-semibold text-primary-color" style={{ fontSize: '0.85rem' }}>{adminName}</div>
                <div className="text-muted" style={{ fontSize: '0.7rem' }}>{adminRole}</div>
              </div>
              <a href="#profile" className="dropdown-item px-3 py-2 d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }} onClick={(e) => {e.preventDefault(); navigateTo('profile');}}>
                <User size={16} /> My Profile
              </a>
              <a href="#settings" className="dropdown-item px-3 py-2 d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }} onClick={(e) => {e.preventDefault(); navigateTo('settings');}}>
                <Settings size={16} /> Account Settings
              </a>
              <a href="#support" className="dropdown-item px-3 py-2 d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }} onClick={(e) => {e.preventDefault(); navigateTo('support');}}>
                <HelpCircle size={16} /> Help & Support
              </a>
              <div className="dropdown-divider"></div>
              <a 
                href="#logout" 
                className="dropdown-item px-3 py-2 text-danger d-flex align-items-center gap-2" 
                style={{ fontSize: '0.85rem' }}
                onClick={(e) => {
                  e.preventDefault(); 
                  setShowProfile(false);
                  if (onLogout) onLogout();
                }}
              >
                <LogOut size={16} /> Log Out
              </a>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
