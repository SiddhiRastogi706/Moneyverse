import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Landmark,
  Coins,
  Layers,
  ArrowLeftRight,
  FileText,
  UserCheck,
  FileBarChart,
  HelpCircle,
  Search,
  Bell,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  LogOut,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { IconButton } from '../common/IconButton';
import { Dropdown } from '../common/Dropdown';
import { Drawer } from '../common/Drawer';
import { useAuthStore } from '../../store/authStore';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, unreadNotifications, logout } = useAuthStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'My Portfolio', path: '/portfolio', icon: <TrendingUp className="w-4 h-4" />, hasSubmenu: true },
    { label: 'Bonds', path: '/investments?category=Bonds', icon: <Landmark className="w-4 h-4" /> },
    { label: 'Mutual Funds', path: '/investments?category=Mutual+Funds', icon: <Coins className="w-4 h-4" /> },
    { label: 'Unlisted Shares', path: '/investments?category=Unlisted+Shares', icon: <Layers className="w-4 h-4" /> },
    { label: 'Transactions', path: '/transactions', icon: <ArrowLeftRight className="w-4 h-4" /> },
    { label: 'Documents', path: '/documents', icon: <FileText className="w-4 h-4" /> },
    { label: 'KYC & Profile', path: '/kyc-verification', icon: <UserCheck className="w-4 h-4" /> },
    { label: 'Reports', path: '/reports', icon: <FileBarChart className="w-4 h-4" /> },
    { label: 'Help & Support', path: '/contact', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-3.5 space-y-4">
      {/* 10 Navigation Links */}
      <div className="space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-sky-50 text-sky-600 border border-sky-300 shadow-sm shadow-sky-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-sky-600' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.hasSubmenu ? (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              ) : isActive ? (
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_6px_#38BDF8]" />
              ) : null}
            </Link>
          );
        })}
      </div>

      {/* Promo Card at bottom of sidebar (Clean Sky & White) */}
      <div className="rounded-2xl bg-gradient-to-br from-sky-50 via-white to-blue-50/70 border border-sky-200 p-4 relative overflow-hidden shadow-sm space-y-3">
        {/* Glow & 3D graphic */}
        <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/25">
          <Sparkles className="w-5 h-5" />
        </div>

        <div>
          <h4 className="text-sm font-bold font-heading text-slate-900 leading-snug">
            Smarter Investments. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
              Greater Future.
            </span>
          </h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Discover curated opportunities across Bonds, Mutual Funds and Unlisted Shares.
          </p>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => navigate('/investments')}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="w-full text-xs justify-between"
        >
          Explore Investments
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-sky-500 selection:text-white flex flex-col">
      {/* ========================================================================= */}
      {/* TOP BAR (Clean White & Bluish Theme) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full glass-nav px-4 sm:px-6 h-18 py-3.5 border-b border-slate-200">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Logo subtitle="invest" />
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="w-full relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search bonds, mutual funds, unlisted shares..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    navigate(`/investments?search=${encodeURIComponent(searchQuery)}`);
                  }
                }}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-sky-500 rounded-full py-2 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Right: Notifications & Profile Pill */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Notification Bell */}
            <button
              onClick={() => {}}
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-sky-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(239,68,68,0.8)]">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <Dropdown
              trigger={
                <button className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-sky-300 shadow-sm transition-all text-left">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {user?.avatar || 'RS'}
                  </div>
                  <div className="hidden sm:flex flex-col leading-none">
                    <span className="text-xs font-bold text-slate-900">{user?.name || 'Rohit Sharma'}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      Investor ID: {user?.investorId || 'MV10023'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline ml-0.5" />
                </button>
              }
              items={[
                {
                  id: 'profile',
                  label: 'KYC & Profile Settings',
                  icon: <UserCheck className="w-4 h-4 text-sky-600" />,
                  onClick: () => navigate('/kyc-verification'),
                },
                {
                  id: 'docs',
                  label: 'My Documents',
                  icon: <FileText className="w-4 h-4 text-blue-600" />,
                  onClick: () => navigate('/documents'),
                },
                {
                  id: 'signout',
                  label: 'Sign Out',
                  icon: <LogOut className="w-4 h-4" />,
                  danger: true,
                  onClick: () => logout(),
                },
              ]}
            />
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2-COLUMN MAIN: LEFT SIDEBAR + CONTENT */}
      {/* ========================================================================= */}
      <div className="flex-1 flex max-w-[1720px] mx-auto w-full">
        {/* Desktop Left Sidebar (10 Items) - Clean White & Bluish Theme */}
        <aside className="hidden lg:block w-64 border-r border-slate-200 bg-white flex-shrink-0 shadow-sm">
          <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            {renderSidebarContent()}
          </div>
        </aside>

        {/* Mobile Left Drawer */}
        <Drawer
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          title="Navigation"
        >
          {renderSidebarContent()}
        </Drawer>

        {/* Right Dashboard Content Workspace */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-7 space-y-6 overflow-x-hidden">
          {children}

          {/* Sub-Footer in Dashboard */}
          <footer className="pt-10 pb-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Logo subtitle="invest" variant="compact" />
              <span>© 2026 MoneyVerse. All rights reserved.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px]">
              <a href="mailto:salesmoneyverse@gmail.com" className="text-slate-600 hover:text-sky-600 font-semibold transition-colors">
                Support: salesmoneyverse@gmail.com
              </a>
              <span>|</span>
              <a href="tel:+918506931757" className="text-slate-600 hover:text-sky-600 font-semibold transition-colors">
                +91-8506931757
              </a>
              <span>|</span>
              <Link to="/compliance/privacy-policy" className="text-slate-600 hover:text-sky-600 transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link to="/compliance/terms" className="text-slate-600 hover:text-sky-600 transition-colors">
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link to="/compliance/risk-disclosure" className="text-slate-600 hover:text-sky-600 transition-colors">
                Risk Disclosure
              </Link>
              <span>|</span>
              <Link to="/contact" className="text-slate-600 hover:text-sky-600 transition-colors">
                Help & Support
              </Link>
            </div>

            <div className="text-[11px] font-semibold text-slate-700">
              Invest Today. Build Tomorrow.
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
