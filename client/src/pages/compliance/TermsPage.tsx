import React from 'react';
import { ComplianceLayout } from '../../components/layout/ComplianceLayout';
import { Card } from '../../components/common/Card';
import {
  FileText,
  ShieldAlert,
  Building2,
  BookOpen,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <ComplianceLayout
      title={
        <>
          Terms of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
            Use
          </span>
        </>
      }
      subtitle="Clear terms. A safer experience. By accessing or using MoneyVerse, you agree to the following terms and conditions. Please read them carefully before you continue."
      breadcrumbLabel="Terms of Use"
      heroIcon="doc"
    >
      <div className="space-y-6">
        {/* Main Card with Bluish & White Combination */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-white via-sky-50/20 to-blue-50/10 border border-sky-200/90 shadow-sm rounded-2xl space-y-6">
          {/* Card Header with Bluish Headline */}
          <div className="space-y-3 pb-2 border-b border-sky-100">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-600 shadow-sm">
              <FileText className="w-3.5 h-3.5 text-sky-500" />
              <span>PLATFORM TERMS & REGULATORY DISCLOSURE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              Terms of Use &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
                Regulatory Framework
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Important operational parameters, statutory boundaries and investor disclaimers for MoneyVerse.
            </p>
          </div>

          {/* Full Text Block with Clear Blue & Dark Typography */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-sky-100/90 shadow-sm leading-relaxed text-slate-700 text-sm sm:text-base space-y-4">
            <p>
              <a
                href="https://www.moneyverseai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-sky-600 hover:text-sky-700 hover:underline inline-flex items-center gap-1 mr-1"
              >
                www.moneyverseai.com
                <ExternalLink className="w-3 h-3 text-sky-500" />
              </a>{' '}
              (operated by <strong className="text-slate-900">MONEYVERSE consultancy services LLP.</strong> and the{' '}
              <strong className="text-slate-900">InvestorZone– Moneyverse partnership</strong>) is not a stock exchange or trading
              platform recognised by SEBI under the Securities Contracts (Regulation) Act, 1956, and does not permit
              secondary-market trading on the platform.
            </p>
            <p>
              We are not SEBI-registered investment advisers, brokers or portfolio managers. All content — including company
              data, valuations and indicative prices — is for information and education only and is not investment,
              financial, legal or tax advice. Indicative prices are not an offer to buy or sell and may differ from any
              price at which a deal is actually concluded.
            </p>
            <p>
              Investing in unlisted shares carries substantial risk, including total loss of capital, illiquidity,
              valuation uncertainty and no guarantee of any IPO. Past performance does not indicate future results. Conduct
              your own due diligence and consult SEBI-registered advisers before any investment. Visiting this site or
              contacting us creates no advisory, broker or fiduciary relationship.
            </p>
          </div>

          {/* 4 Pillars in Bluish & White Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-sky-300 transition-all shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 flex-shrink-0 shadow-sm">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">No Secondary Market Exchange</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Not recognised by SEBI under SCRA 1956. We do not permit secondary-market trading.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Non-Advisory Status</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                  We are not SEBI-registered investment advisers, brokers or portfolio managers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-cyan-300 transition-all shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 flex-shrink-0 shadow-sm">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Information & Education Only</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                  All company data and indicative valuations are for informational purposes only.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-300 transition-all shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-sm">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Substantial Risk Warning</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Unlisted shares carry capital loss and illiquidity risks with no guarantee of an IPO.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Due Diligence Callout in Sky & White */}
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-gradient-to-r from-sky-50 via-white to-blue-50/60 border border-sky-200 text-xs sm:text-sm text-slate-700 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="leading-relaxed">
              Visiting this platform or contacting our team creates no advisory, broker or fiduciary relationship. Please conduct independent due diligence before making any investment.
            </p>
          </div>
        </Card>
      </div>
    </ComplianceLayout>
  );
};
