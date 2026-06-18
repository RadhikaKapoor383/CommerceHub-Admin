import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  Boxes, 
  BarChart3, 
  Settings as SettingsIcon, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen,
  onLogout
}) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', name: 'Products', icon: ShoppingBag },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'inventory', name: 'Inventory', icon: Boxes },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];

  const handleLinkClick = (tabId) => {
    setActiveTab(tabId);
    // Auto-close sidebar on mobile after clicking
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <a href="#" className="sidebar-logo" onClick={() => handleLinkClick('dashboard')}>
          <TrendingUp size={24} className="text-primary-color" style={{ flexShrink: 0 }} />
          {!isCollapsed && <span style={{ transition: 'opacity 0.2s' }}>CommerceHub</span>}
        </a>
        
        {/* Toggle Collapse Button (Desktop Only) */}
        <button 
          className="btn btn-link text-muted p-0 d-none d-lg-flex" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ textDecoration: 'none' }}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <li key={item.id} className="nav-item">
              <a 
                href={`#${item.id}`} 
                className={`sidebar-item-link ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                title={isCollapsed ? item.name : undefined}
              >
                <IconComponent size={20} style={{ flexShrink: 0 }} />
                {!isCollapsed && <span>{item.name}</span>}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="sidebar-footer">
        <a 
          href="#logout" 
          className="sidebar-item-link"
          onClick={(e) => {
            e.preventDefault();
            if (onLogout) onLogout();
          }}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut size={20} style={{ flexShrink: 0 }} />
          {!isCollapsed && <span>Logout</span>}
        </a>
      </div>
    </div>
  );
}
