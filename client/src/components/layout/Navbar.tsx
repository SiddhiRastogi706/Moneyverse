import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  ShieldAlert,
  FileText,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { IconButton } from '../common/IconButton';
import { Dropdown } from '../common/Dropdown';
import { useAuthStore } from '../../store/authStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, unreadNotifications, logout, openAuthModal } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    {
      label: 'Investments',
      path: '/investments',
      hasDropdown: true,
      items: [
        { label: 'All Investments', path: '/investments' },
        { label: 'Bonds (Govt & Corporate)', path: '/investments?category=Bonds' },
        { label: 'Mutual Funds (Equity & Debt)', path: '/investments?category=Mutual+Funds' },
        { label: 'Unlisted Shares (Pre-IPO)', path: '/investments?category=Unlisted+Shares' },
      ],
    },
    { label: 'DRHP Filed', path: '/drhp-filed' },
    { label: 'About Us', path: '/about' },
    {
      label: 'Resources',
      path: '/compliance/risk-disclosure',
      hasDropdown: true,
      items: [
        { label: 'Risk Disclosure', path: '/compliance/risk-disclosure' },
        { label: 'KYC & AML Norms', path: '/compliance/kyc-aml' },
        { label: 'Privacy Policy', path: '/compliance/privacy-policy' },
        { label: 'Terms of Use', path: '/compliance/terms' },
        { label: 'Regulatory Disclaimers', path: '/compliance/regulatory-disclaimers' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Logo subtitle="bonds" />

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = isActive(link.path);

            if (link.hasDropdown) {
              return (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 relative ${
                      active ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-slate-400" />
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-60 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="bg-white border border-slate-200 rounded-xl p-1.5 shadow-xl backdrop-blur-xl">
                      {link.items?.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          className="flex items-center px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                to={link.path}
                className={`relative text-sm font-semibold transition-colors py-2 ${
                  active ? 'text-sky-600' : 'text-slate-700 hover:text-sky-600'
                }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons / Auth Controls */}
        <div className="hidden sm:flex items-center gap-3.5">
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 w-52 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search bonds, shares..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      navigate(`/investments?search=${encodeURIComponent(searchQuery)}`);
                      setSearchOpen(false);
                    }
                  }}
                  autoFocus
                  className="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none w-full"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Search investments"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <Link
                to="/dashboard"
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(239,68,68,0.7)]">
                    {unreadNotifications}
                  </span>
                )}
              </Link>

              {/* User Profile Pill */}
              <Dropdown
                trigger={
                  <button className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-slate-100 border border-slate-200 hover:border-sky-400 transition-all text-left">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                      {user.avatar || 'RS'}
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-xs font-bold text-slate-900">{user.name}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        Investor ID: {user.investorId}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                  </button>
                }
                items={[
                  {
                    id: 'dash',
                    label: 'Investor Dashboard',
                    icon: <LayoutDashboard className="w-4 h-4 text-sky-600" />,
                    onClick: () => openAuthModal(),
                  },
                  {
                    id: 'portfolio',
                    label: 'My Portfolio',
                    icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
                    onClick: () => navigate('/portfolio'),
                  },
                  {
                    id: 'docs',
                    label: 'Documents & KYC',
                    icon: <FileText className="w-4 h-4 text-gold" />,
                    onClick: () => navigate('/documents'),
                  },
                  {
                    id: 'reauth',
                    label: 'Switch Account / Re-auth',
                    icon: <User className="w-4 h-4 text-sky-600" />,
                    onClick: () => openAuthModal(),
                  },
                  {
                    id: 'logout',
                    label: 'Sign Out',
                    icon: <LogOut className="w-4 h-4" />,
                    danger: true,
                    onClick: () => logout(),
                  },
                ]}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Button
                variant="primary"
                size="sm"
                onClick={openAuthModal}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs shadow-md shadow-sky-500/25 active:scale-[0.98] transition-all"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <IconButton
            label="Toggle Menu"
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </IconButton>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              to="/investments"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
            >
              Investments (Bonds, Mutual Funds, Unlisted)
            </Link>
            <Link
              to="/drhp-filed"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-sky-600 hover:bg-sky-50 rounded-lg flex items-center justify-between transition-colors"
            >
              <span>DRHP Filed</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-100 text-sky-700 rounded-full">New</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAuthenticated) {
                  navigate('/dashboard');
                } else {
                  openAuthModal();
                }
              }}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors text-left flex items-center justify-between"
            >
              <span>Investor Dashboard</span>
              {!isAuthenticated && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-700">
                  Auth Required
                </span>
              )}
            </button>
            <Link
              to="/compliance/risk-disclosure"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
            >
              Compliance Center
            </Link>
            <Link
              to="/ai-assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
            >
              MoneyVerse AI Assistant
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">{user?.name}</p>
                    <p className="text-slate-500 font-mono">{user?.investorId}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => logout()} className="text-slate-600 hover:text-slate-900 hover:bg-slate-200">
                    Sign Out
                  </Button>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white"
                >
                  Go to Dashboard
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  openAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold shadow-md shadow-sky-500/25 text-sm"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
