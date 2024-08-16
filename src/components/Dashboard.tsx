import React, { useState } from 'react';
import { Home, EllipsisVertical, CircleX, X, CreditCard, DollarSign, Bell, User, Settings, LogOut, ShoppingBag } from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HomeView from './views/HomeView';
import TransactionsView from './views/TransactionsView';
import NotificationsView from './views/NotificationsView';
import ProfileView from './views/ProfileView';
import SettingsView from './views/SettingsView';
import AccountManagement from './AccountManagement';
import StorePurchase from './StorePurchase';

function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const sidebarLinks = [
    { icon: <Home />, label: 'Home', key: 'home' },
    { icon: <CreditCard />, label: 'Accounts', key: 'accounts' },
    { icon: <DollarSign />, label: 'Transactions', key: 'transactions' },
    { icon: <ShoppingBag />, label: 'Store Purchase', key: 'store-purchase' },
    { icon: <Bell />, label: 'Notifications', key: 'notifications' },
    { icon: <User />, label: 'Profile', key: 'profile' },
    { icon: <Settings />, label: 'Settings', key: 'settings' },
  ];
  
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);
  const handleSidebarToggleSmallScreen = () => setShowSidebar(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      {/* Sidebar */}
      <div className={`sm:flex ${showSidebar ? 'flex' : 'hidden'}`}>
        <div className="w-64 bg-white dark:bg-slate-800 shadow-md dark:shadow-dark">
          <div className="p-4 grid grid-cols-3 sm:grid-cols-0">
            <h1 className="text-2xl font-bold text-blue-600 col-span-2">DigiWallet</h1>
            <button onClick={() => handleSidebarToggle()} className={`mr-2 flex item-right sm:hidden ${
                      showSidebar ? 'flex' : 'hidden'} my-auto justify-self-end font-semibold text-gray-500 dark:text-white`}>
              <X size={30}/>
            </button>
          </div>
          <nav className="mt-6">
            {sidebarLinks.map((link) => (
              <button
                key={link.key}
                className={`flex items-center w-full py-2 px-4 ${
                  activeTab === link.key ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900'
                }`}
                onClick={() => {
                  handleTabChange(link.key); 
                  handleSidebarToggleSmallScreen();
                }}
              >
                {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
                {link.label}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-0 w-64 p-4">
            <button className="flex items-center text-gray-600 dark: text-gray-100 hover:text-red-500" onClick={handleLogout}>
              <LogOut className="mr-2" size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className={`bg-white dark:bg-slate-800 shadow-sm dark:shadow-dark ${
                  showSidebar ? 'overflow-hidden' : ''
            }`}>
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 text-2xl font-semibold text-gray-900 dark:text-white">
              <button onClick={() => handleSidebarToggle()} className={`mr-2 sm:hidden w-32 ${
                        showSidebar ? 'hidden' : 'flex'} my-auto justify-self-start relative z-20`}>
                <EllipsisVertical size={30}/>
              </button>
              <h1 className="col-span-11 text-left">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="home" element={<HomeView />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="transactions" element={<TransactionsView />} />
            <Route path="store-purchase" element={<StorePurchase />} />
            <Route path="notifications" element={<NotificationsView />} />
            <Route path="profile" element={<ProfileView />} />
            <Route path="settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;