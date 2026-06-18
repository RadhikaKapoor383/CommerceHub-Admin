import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Views
import DashboardView from './views/DashboardView';
import ProductsView from './views/ProductsView';
import OrdersView from './views/OrdersView';
import CustomersView from './views/CustomersView';
import InventoryView from './views/InventoryView';
import AnalyticsView from './views/AnalyticsView';
import SettingsView from './views/SettingsView';
import LoginView from './views/LoginView';
import ProfileView from './views/ProfileView';
import NotificationsView from './views/NotificationsView';
import MessagesView from './views/MessagesView';
import SupportView from './views/SupportView';

// Mock Data
import { 
  initialProducts, 
  initialOrders, 
  initialCustomers, 
  mockActivities,
  analyticsTimeline,
  productPerformance,
  customerGrowth
} from './data/mockData';
import { adminMessages, adminNotifications } from './data/adminCenterData';

const ADMIN_ACCOUNT = {
  name: 'Radhika Kapoor',
  initials: 'RK',
  role: 'Store Owner',
  email: 'radhika@admin.com',
  password: 'admin123'
};

const PRODUCTS_STORAGE_KEY = 'CommerceHub-admin-products';

const loadStoredProducts = () => {
  try {
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!storedProducts) {
      return initialProducts;
    }

    const parsedProducts = JSON.parse(storedProducts);
    return Array.isArray(parsedProducts) ? parsedProducts : initialProducts;
  } catch {
    return initialProducts;
  }
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('CommerceHub-admin-auth') === 'true';
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Global Mock States to enable cross-panel CRUD interactions!
  const [products, setProducts] = useState(loadStoredProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [customers] = useState(initialCustomers);
  const [activities] = useState(mockActivities);

  // Sync theme changes with DOM documentElement attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogin = ({ email, password }) => {
    const isAdmin =
      email.trim().toLowerCase() === ADMIN_ACCOUNT.email &&
      password === ADMIN_ACCOUNT.password;

    if (!isAdmin) {
      return false;
    }

    localStorage.setItem('CommerceHub-admin-auth', 'true');
    setIsAuthenticated(true);
    setActiveTab('dashboard');
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('CommerceHub-admin-auth');
    setIsAuthenticated(false);
    setIsMobileOpen(false);
    setActiveTab('dashboard');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView 
            products={products}
            orders={orders}
            customers={customers}
            activities={activities}
            analyticsData={analyticsTimeline}
            setActiveTab={setActiveTab}
            adminName={ADMIN_ACCOUNT.name}
          />
        );
      case 'products':
        return (
          <ProductsView 
            products={products}
            setProducts={setProducts}
          />
        );
      case 'orders':
        return (
          <OrdersView 
            orders={orders}
            setOrders={setOrders}
          />
        );
      case 'customers':
        return (
          <CustomersView 
            customers={customers}
          />
        );
      case 'inventory':
        return (
          <InventoryView 
            products={products}
            setProducts={setProducts}
          />
        );
      case 'analytics':
        return (
          <AnalyticsView 
            analyticsData={analyticsTimeline}
            productPerformance={productPerformance}
            customerGrowth={customerGrowth}
          />
        );
      case 'settings':
        return <SettingsView adminName={ADMIN_ACCOUNT.name} adminEmail={ADMIN_ACCOUNT.email} adminRole={ADMIN_ACCOUNT.role} />;
      case 'profile':
        return (
          <ProfileView
            adminName={ADMIN_ACCOUNT.name}
            adminEmail={ADMIN_ACCOUNT.email}
            adminRole={ADMIN_ACCOUNT.role}
            adminInitials={ADMIN_ACCOUNT.initials}
          />
        );
      case 'notifications':
        return <NotificationsView notifications={adminNotifications} />;
      case 'messages':
        return <MessagesView messages={adminMessages} />;
      case 'support':
        return <SupportView />;
      default:
        return (
          <DashboardView 
            products={products}
            orders={orders}
            customers={customers}
            activities={activities}
            analyticsData={analyticsTimeline}
            setActiveTab={setActiveTab}
            adminName={ADMIN_ACCOUNT.name}
          />
        );
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginView
        theme={theme}
        toggleTheme={toggleTheme}
        onLogin={handleLogin}
        adminName={ADMIN_ACCOUNT.name}
        adminInitials={ADMIN_ACCOUNT.initials}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onLogout={handleLogout}
      />

      {/* Main Panel Content Area */}
      <div className={`main-content ${isCollapsed ? 'expanded' : ''}`}>
        
        {/* Top Navbar */}
        <Navbar 
          theme={theme}
          toggleTheme={toggleTheme}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          onLogout={handleLogout}
          adminName={ADMIN_ACCOUNT.name}
          adminInitials={ADMIN_ACCOUNT.initials}
          adminRole={ADMIN_ACCOUNT.role}
          setActiveTab={setActiveTab}
        />

        {/* Content Body */}
        <main className="content-body">
          {renderActiveView()}
        </main>
      </div>

      {/* Backdrop for mobile drawer toggle */}
      {isMobileOpen && (
        <div 
          className="modal-backdrop fade show d-lg-none" 
          onClick={() => setIsMobileOpen(false)}
          style={{ zIndex: 998 }}
        ></div>
      )}
    </div>
  );
}
