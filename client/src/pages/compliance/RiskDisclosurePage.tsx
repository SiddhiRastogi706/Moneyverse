import React from 'react';
import {
  AlertTriangle,
  BookOpen,
  LineChart,
  Coins,
  Droplets,
  Percent,
  Layers,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { ComplianceLayout } from '../../components/layout/ComplianceLayout';
import { Card } from '../../components/common/Card';

export const RiskDisclosurePage: React.FC = () => {
  return (
    <ComplianceLayout
      title={
        <>
          Risk{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
            Disclosure
          </span>
        </>
      }
      subtitle="Understand the risks involved in investing. Read this important information before making any investment decisions."
      breadcrumbLabel="Risk Disclosure"
      heroIcon="shield"
    >
      <div className="space-y-8">
        {/* ========================================================================= */}
        {/* AMBER / DYNAMIC WARNING BANNER (Image 1 - Clean Light Theme) */}
        {/* ========================================================================= */}
        <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50/90 border border-amber-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left Warning Triangle & Body */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold font-heading text-amber-950">
                  All Investments Carry Risk. Returns Are Not Guaranteed.
                </h3>
                <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed max-w-2xl font-normal">
                  Investing in bonds, money market instruments, unlisted shares and other financial
                  products involves inherent risks, including the possible loss of principal. Past
                  performance is not indicative of future results. All information on this website
                  is for educational and informational purposes only and should not be considered
                  as financial advice.
                </p>
              </div>
            </div>

            {/* Right Divider & Invest Wisely Box */}
            <div className="hidden md:flex flex-col items-start pl-6 border-l border-amber-200 min-w-[210px] space-y-1">
              <div className="flex items-center gap-2 text-amber-700">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-bold">Invest Wisely</span>
              </div>
              <p className="text-xs text-amber-800/80 leading-normal">
                Understand the risks. Make informed decisions.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KEY RISK FACTORS (5 Colorful Dynamic Cards - Image 1) */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold font-heading text-slate-900">Key Risk Factors</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Before investing, it is important to understand the key risks associated with each type of investment:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-2">
            {/* 1. Market Risk */}
            <Card hoverEffect className="p-4 flex flex-col justify-between space-y-3 bg-white border border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md rounded-2xl transition-all">
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                <LineChart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Market Risk</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  The value of your investment may fluctuate due to changes in market conditions,
                  interest rates and economic factors.
                </p>
              </div>
            </Card>

            {/* 2. Credit Risk */}
            <Card hoverEffect className="p-4 flex flex-col justify-between space-y-3 bg-white border border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-md rounded-2xl transition-all">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Credit Risk</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  There is a risk that the issuer may not be able to meet its financial obligations,
                  which could result in a loss of principal or interest.
                </p>
              </div>
            </Card>

            {/* 3. Liquidity Risk */}
            <Card hoverEffect className="p-4 flex flex-col justify-between space-y-3 bg-white border border-purple-200 hover:border-purple-400 shadow-sm hover:shadow-md rounded-2xl transition-all">
              <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Liquidity Risk</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Some investments, especially unlisted shares, may have limited liquidity and may
                  be difficult to buy or sell before maturity.
                </p>
              </div>
            </Card>

            {/* 4. Interest Rate Risk */}
            <Card hoverEffect className="p-4 flex flex-col justify-between space-y-3 bg-white border border-amber-200 hover:border-amber-400 shadow-sm hover:shadow-md rounded-2xl transition-all">
              <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Interest Rate Risk</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Changes in interest rates can affect the value of fixed-income instruments and may
                  impact your returns.
                </p>
              </div>
            </Card>

            {/* 5. Unlisted Share Risk */}
            <Card hoverEffect className="p-4 flex flex-col justify-between space-y-3 bg-white border border-sky-200 hover:border-sky-400 shadow-sm hover:shadow-md rounded-2xl transition-all">
              <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Unlisted Share Risk</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Unlisted shares are subject to higher volatility, lower liquidity and may have
                  limited information compared to listed securities.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* IMPORTANT NOTES + YOUR FINANCIAL WELL-BEING MATTERS (Image 1) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
          {/* Left: Important Notes */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-heading text-slate-900">Important Notes</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>Past performance is not a reliable indicator of future results.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>The value of investments can go down as well as up.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>You may not get back the amount you invested.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>
                  Tax benefits, if any, are subject to change and depend on your individual circumstances and applicable laws.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <span>
                  You should read all offering documents, risk factors and other relevant information carefully before making any investment decision.
                </span>
              </li>
            </ul>
          </div>

          {/* Right: Your Financial Well-being Matters */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-blue-50/70 border border-sky-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/25">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold font-heading text-slate-900">
                Your Financial Well-being Matters
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We encourage all investors to assess their risk tolerance, financial goals and investment horizon before making a decision. Never invest funds required for short-term liquidity emergencies into illiquid unlisted shares.
              </p>
            </div>

            <div className="w-16 h-1 bg-sky-500 rounded-full" />
          </div>
        </div>
      </div>
    </ComplianceLayout>
  );
};
