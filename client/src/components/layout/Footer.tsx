import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Youtube, Send, Mail, Phone, Headphones, Clock } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-slate-200 pt-12 pb-8 text-slate-600">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
          {/* Logo with Golden Wealth Tree */}
          <div className="flex-shrink-0">
            <Logo subtitle="bonds" />
          </div>

          {/* Primary Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold">
            <Link to="/" className="text-slate-700 hover:text-sky-600 transition-colors">
              Home
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/investments" className="text-slate-700 hover:text-sky-600 transition-colors">
              Investments
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/drhp-filed" className="text-slate-700 hover:text-sky-600 transition-colors">
              DRHP Filed
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/about" className="text-slate-700 hover:text-sky-600 transition-colors">
              About Us
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/compliance/risk-disclosure" className="text-slate-700 hover:text-sky-600 transition-colors">
              Resources
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link to="/contact" className="text-slate-700 hover:text-sky-600 transition-colors">
              Contact & Support
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 shadow-sm transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 shadow-sm transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 shadow-sm transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OFFICIAL SUPPORT & CONTACT STRIP (User Requested) */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-blue-50/70 border border-sky-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/25 flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heading text-slate-900">
                Official MoneyVerse Customer Support
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>Mon – Sat, 9:00 AM – 7:00 PM IST · Fast Response Guaranteed</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Phone Pill */}
            <a
              href="tel:+918506931757"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-sky-200 hover:border-sky-400 text-slate-800 hover:text-sky-600 font-bold text-xs shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-sky-500" />
              <span>+91-8506931757</span>
            </a>

            {/* Email Pill */}
            <a
              href="mailto:salesmoneyverse@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm shadow-sky-600/20 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>salesmoneyverse@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Global Risk Disclaimer Banner */}
        <div className="py-4 text-center text-[11px] text-slate-500 leading-relaxed border-t border-b border-slate-200">
          <p>
            MoneyVerse is an educational & facilitation technology platform. Investments in
            Bonds, Mutual Funds, and Unlisted Shares are subject to market risks, credit
            risks, and liquidity risks. Please read all offer documents, terms, and regulatory
            disclaimers carefully before investing. Past performance is not an indicator of future returns.
          </p>
        </div>

        {/* Bottom Sub-footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 MoneyVerse. All rights reserved.</div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px]">
            <Link to="/compliance/privacy-policy" className="text-slate-600 hover:text-sky-600 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/compliance/terms" className="text-slate-600 hover:text-sky-600 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/compliance/risk-disclosure" className="text-slate-600 hover:text-sky-600 transition-colors">
              Risk Disclosure
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/compliance/kyc-aml" className="text-slate-600 hover:text-sky-600 transition-colors">
              KYC
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/contact" className="text-slate-600 hover:text-sky-600 transition-colors">
              Contact Us
            </Link>
          </div>

          <div className="text-[11px] font-semibold text-slate-700">
            Invest Today. Build Tomorrow.
          </div>
        </div>
      </div>
    </footer>
  );
};
