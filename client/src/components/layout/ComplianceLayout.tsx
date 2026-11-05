import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Fingerprint,
  Lock,
  FileText,
  Scale,
  Download,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Button } from '../common/Button';
import { Breadcrumb } from '../common/Breadcrumb';
import toast from 'react-hot-toast';

interface ComplianceLayoutProps {
  title: React.ReactNode;
  subtitle: string;
  breadcrumbLabel: string;
  heroIcon: 'shield' | 'id' | 'lock' | 'doc' | 'scale';
  children: React.ReactNode;
}

export const ComplianceLayout: React.FC<ComplianceLayoutProps> = ({
  title,
  subtitle,
  breadcrumbLabel,
  heroIcon,
  children,
}) => {
  const location = useLocation();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    toast.success(`Preparing ${breadcrumbLabel} document...`);
    setTimeout(() => {
      const legalNotice = `www.moneyverseai.com (operated by MONEYVERSE consultancy services LLP. and the InvestorZone– Moneyverse partnership) is not a stock exchange or trading platform recognised by SEBI under the Securities Contracts (Regulation) Act, 1956, and does not permit secondary-market trading on the platform. We are not SEBI-registered investment advisers, brokers or portfolio managers. All content — including company data, valuations and indicative prices — is for information and education only and is not investment, financial, legal or tax advice. Indicative prices are not an offer to buy or sell and may differ from any price at which a deal is actually concluded. Investing in unlisted shares carries substantial risk, including total loss of capital, illiquidity, valuation uncertainty and no guarantee of any IPO. Past performance does not indicate future results. Conduct your own due diligence and consult SEBI-registered advisers before any investment. Visiting this site or contacting us creates no advisory, broker or fiduciary relationship.`;

      const file = new Blob([`MoneyVerse - ${breadcrumbLabel}\n\n${subtitle}\n\n${legalNotice}\n\nGenerated on ${new Date().toLocaleDateString('en-IN')}`], { type: 'text/plain' });
      const element = document.createElement('a');
      element.href = URL.createObjectURL(file);
      element.download = `${breadcrumbLabel.toLowerCase().replace(/\s+/g, '-')}-compliance.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 800);
  };

  const sidebarLinks = [
    {
      label: 'Risk Disclosure',
      path: '/compliance/risk-disclosure',
      icon: <ShieldAlert className="w-4 h-4" />,
    },
    {
      label: 'KYC & AML',
      path: '/compliance/kyc-aml',
      icon: <Fingerprint className="w-4 h-4" />,
    },
    {
      label: 'Privacy Policy',
      path: '/compliance/privacy-policy',
      icon: <Lock className="w-4 h-4" />,
    },
    {
      label: 'Terms of Use',
      path: '/compliance/terms',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: 'Regulatory Disclaimers',
      path: '/compliance/regulatory-disclaimers',
      icon: <Scale className="w-4 h-4" />,
    },
  ];

  const renderHeroIcon = () => {
    switch (heroIcon) {
      case 'shield':
        return (
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
            {/* Soft sky-blue glow base */}
            <div className="absolute inset-x-4 bottom-2 h-6 rounded-full bg-sky-200/50 blur-md pointer-events-none" />
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(14,165,233,0.18)]">
              <defs>
                <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="shieldBg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#F0F9FF" />
                  <stop offset="100%" stopColor="#E0F2FE" />
                </linearGradient>
                <linearGradient id="shieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>
              {/* Soft pedestal shadow */}
              <ellipse cx="80" cy="142" rx="48" ry="8" fill="#BAE6FD" opacity="0.6" />
              {/* Main Shield Body */}
              <path
                d="M80 18 L130 40 V82 C130 112 108 132 80 142 C52 132 30 112 30 82 V40 Z"
                fill="url(#shieldBg)"
                stroke="url(#shieldBorder)"
                strokeWidth="3.5"
              />
              {/* Inner Accent Line */}
              <path
                d="M80 30 L118 46 V80 C118 104 102 120 80 128 C58 120 42 104 42 80 V46 Z"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.7"
              />
              {/* Gold Padlock */}
              <rect x="67" y="72" width="26" height="22" rx="5" fill="url(#shieldGold)" stroke="#D97706" strokeWidth="1.5" />
              <path d="M72 72 V63 C72 58.5 75.5 55 80 55 C84.5 55 88 58.5 88 63 V72" fill="none" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="80" cy="81" r="2.5" fill="#FFFFFF" />
              <line x1="80" y1="83" x2="80" y2="87" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );

      case 'id':
        return (
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
            <div className="absolute inset-x-4 bottom-2 h-6 rounded-full bg-sky-200/50 blur-md pointer-events-none" />
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(14,165,233,0.18)]">
              <defs>
                <linearGradient id="idCardBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F0F9FF" />
                </linearGradient>
                <linearGradient id="idBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
                <linearGradient id="idAvatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>
              <ellipse cx="80" cy="140" rx="50" ry="8" fill="#BAE6FD" opacity="0.6" />
              {/* ID Card */}
              <rect x="26" y="34" width="108" height="76" rx="14" fill="url(#idCardBg)" stroke="url(#idBorder)" strokeWidth="3" />
              {/* Photo Area */}
              <rect x="36" y="44" width="34" height="42" rx="8" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1" />
              <circle cx="53" cy="58" r="9" fill="url(#idAvatarGrad)" />
              <path d="M43 78 C43 71 47 68 53 68 C59 68 63 71 63 78 Z" fill="url(#idAvatarGrad)" />
              {/* Info Lines */}
              <rect x="78" y="48" width="46" height="5" rx="2.5" fill="#0284C7" />
              <rect x="78" y="60" width="38" height="4" rx="2" fill="#94A3B8" />
              <rect x="78" y="70" width="42" height="4" rx="2" fill="#94A3B8" />
              {/* Verified Badge */}
              <circle cx="118" cy="94" r="10" fill="#10B981" />
              <path d="M114 94 L117 97 L122 91" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );

      case 'lock':
        return (
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
            <div className="absolute inset-x-4 bottom-2 h-6 rounded-full bg-sky-200/50 blur-md pointer-events-none" />
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(14,165,233,0.18)]">
              <defs>
                <linearGradient id="lockBg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F0F9FF" />
                  <stop offset="100%" stopColor="#E0F2FE" />
                </linearGradient>
                <linearGradient id="shackleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>
              <ellipse cx="80" cy="140" rx="46" ry="8" fill="#BAE6FD" opacity="0.6" />
              {/* Shackle */}
              <path d="M54 62 V42 C54 27 65 18 80 18 C95 18 106 27 106 42 V62" fill="none" stroke="url(#shackleGrad)" strokeWidth="6" strokeLinecap="round" />
              {/* Lock Body */}
              <rect x="40" y="58" width="80" height="64" rx="16" fill="url(#lockBg)" stroke="#0284C7" strokeWidth="3" />
              {/* Keyhole */}
              <circle cx="80" cy="85" r="7" fill="#0284C7" />
              <path d="M78 89 L76 102 H84 L82 89 Z" fill="#0284C7" />
              {/* Sparkle highlight */}
              <circle cx="56" cy="74" r="2.5" fill="#38BDF8" opacity="0.9" />
            </svg>
          </div>
        );

      case 'doc':
        return (
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
            <div className="absolute inset-x-4 bottom-2 h-6 rounded-full bg-sky-200/50 blur-md pointer-events-none" />
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(14,165,233,0.18)]">
              <defs>
                <linearGradient id="docBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F8FAFC" />
                </linearGradient>
                <linearGradient id="docFold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BAE6FD" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>
              <ellipse cx="80" cy="140" rx="46" ry="8" fill="#BAE6FD" opacity="0.6" />
              {/* Sheet */}
              <path d="M44 24 H94 L116 46 V124 H44 Z" fill="url(#docBg)" stroke="#0284C7" strokeWidth="3" strokeLinejoin="round" />
              {/* Folded corner */}
              <path d="M94 24 V46 H116" fill="url(#docFold)" stroke="#0284C7" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Text lines */}
              <line x1="58" y1="62" x2="102" y2="62" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
              <line x1="58" y1="76" x2="98" y2="76" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="58" y1="90" x2="88" y2="90" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
              {/* Seal Badge */}
              <circle cx="98" cy="104" r="13" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
              <path d="M93 104 L97 108 L104 100" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );

      case 'scale':
        return (
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
            <div className="absolute inset-x-4 bottom-2 h-6 rounded-full bg-sky-200/50 blur-md pointer-events-none" />
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_12px_24px_rgba(14,165,233,0.18)]">
              <defs>
                <linearGradient id="scaleGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="plateBg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E0F2FE" />
                </linearGradient>
              </defs>
              <ellipse cx="80" cy="142" rx="48" ry="8" fill="#BAE6FD" opacity="0.6" />
              {/* Stand Base */}
              <ellipse cx="80" cy="132" rx="28" ry="6" fill="#0284C7" />
              <line x1="80" y1="32" x2="80" y2="130" stroke="url(#scaleGold)" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="80" cy="30" r="5" fill="#F59E0B" />
              {/* Crossbeam */}
              <line x1="38" y1="46" x2="122" y2="46" stroke="url(#scaleGold)" strokeWidth="3.5" strokeLinecap="round" />
              {/* Left Scale */}
              <line x1="42" y1="46" x2="30" y2="78" stroke="#0284C7" strokeWidth="1.5" />
              <line x1="42" y1="46" x2="54" y2="78" stroke="#0284C7" strokeWidth="1.5" />
              <path d="M24 78 C30 90, 54 90, 60 78 Z" fill="url(#plateBg)" stroke="#0284C7" strokeWidth="2.5" />
              {/* Right Scale */}
              <line x1="118" y1="46" x2="106" y2="78" stroke="#0284C7" strokeWidth="1.5" />
              <line x1="118" y1="46" x2="130" y2="78" stroke="#0284C7" strokeWidth="1.5" />
              <path d="M100 78 C106 90, 130 90, 136 78 Z" fill="url(#plateBg)" stroke="#0284C7" strokeWidth="2.5" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-500 selection:text-white flex flex-col">
      <Navbar />

      {/* ========================================================================= */}
      {/* COMPLIANCE HERO BANNER (Image 1 & 3) */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white border-b border-slate-200 pt-10 pb-12 overflow-hidden">
        {/* Subtle background wave lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 280" fill="none">
            <path
              d="M-100 180 C 300 80, 700 240, 1540 90"
              stroke="#0284C7"
              strokeWidth="1.5"
            />
            <path
              d="M-50 220 C 350 120, 750 280, 1590 130"
              stroke="#38BDF8"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              {/* Overline */}
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600 block">
                COMPLIANCE CENTER
              </span>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
                {title}
              </h1>

              {/* Breadcrumb */}
              <Breadcrumb
                items={[
                  { label: 'Home', path: '/' },
                  { label: 'Resources', path: '/compliance/risk-disclosure' },
                  { label: 'Compliance Center', path: '/compliance/risk-disclosure' },
                  { label: breadcrumbLabel },
                ]}
                className="justify-center md:justify-start pt-1"
              />

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {subtitle}
              </p>
            </div>

            {/* Glowing 3D Hero Icon */}
            <div className="flex-shrink-0">{renderHeroIcon()}</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2-COLUMN LAYOUT: STICKY SIDEBAR + CONTENT CARD (Image 1 & 3) */}
      {/* ========================================================================= */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Sidebar (5 items) */}
          <aside className="lg:col-span-3 sticky top-28 space-y-2">
            <div className="rounded-2xl bg-white border border-slate-200 p-2 space-y-1 shadow-sm">
              {sidebarLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-sky-50 text-sky-600 border border-sky-300 font-bold shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span className={isActive ? 'text-sky-600' : 'text-slate-400'}>
                      {link.icon}
                    </span>
                    <span className="flex-1">{link.label}</span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-sky-600" />}
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Right Main Content */}
          <section className="lg:col-span-9 space-y-6">
            {/* Top Action Bar with Download PDF and Print */}
            <div className="flex items-center justify-end gap-3 pb-2">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Download className="w-3.5 h-3.5" />}
                onClick={handleDownloadPDF}
                className="text-xs"
              >
                Download PDF
              </Button>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Printer className="w-3.5 h-3.5" />}
                onClick={handlePrint}
                className="text-xs"
              >
                Print
              </Button>
            </div>

            {/* Injected Content for specific Compliance Page */}
            {children}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
