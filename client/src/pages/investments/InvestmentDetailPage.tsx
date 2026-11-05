import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Calendar,
  Percent,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Building2,
  Download,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Tabs } from '../../components/common/Tabs';
import { InvestFlowModal } from './InvestFlowModal';
import { ALL_INVESTMENTS } from './InvestmentsPage';
import { formatINR } from '../../utils/formatters';
import { useAdminStore } from '../../store/adminStore';

export const InvestmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getPrice, getPdf, isItemDeleted } = useAdminStore();

  const investment =
    ALL_INVESTMENTS.find((inv) => inv.id === id) || ALL_INVESTMENTS[0];

  const isDeleted = isItemDeleted(investment.id, investment.title);
  if (isDeleted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Offering Removed</h2>
          <p className="text-xs text-slate-500">
            This investment offering ({investment.title}) has been closed or removed by the platform administrator.
          </p>
          <Button variant="gold" onClick={() => navigate('/investments')} className="w-full">
            Browse Active Investments
          </Button>
        </div>
      </div>
    );
  }

  const isUnlisted = investment.category === 'Unlisted Shares';

  const baseSharePrice = (() => {
    if (investment.yieldRate) {
      const match = investment.yieldRate.match(/[\d,.]+/);
      if (match) {
        const parsed = parseFloat(match[0].replace(/,/g, ''));
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    }
    return investment.minInvestment > 1000 ? Math.round(investment.minInvestment / 100) : 100;
  })();

  const liveSharePrice = (() => {
    const byId = getPrice(investment.id, -1);
    if (byId > 0) return byId;
    const byTitle = getPrice(investment.title, -1);
    if (byTitle > 0) return byTitle;
    return baseSharePrice;
  })();
  const attachedPdf = getPdf(investment.id);

  // Dynamic lot size
  const lotSize = (() => {
    if (investment.rating && investment.rating.includes('Lot:')) {
      const match = investment.rating.match(/[\d,]+/);
      if (match) {
        const parsed = parseInt(match[0].replace(/,/g, ''), 10);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    }
    return 50;
  })();

  const dynamicMinInvestment = isUnlisted ? liveSharePrice * lotSize : investment.minInvestment;
  const formattedPriceText = `₹ ${liveSharePrice.toLocaleString('en-IN')}`;

  const dynamicDescription = isUnlisted
    ? investment.description.replace(/₹\s*[\d,.]+/g, formattedPriceText)
    : investment.description;

  const dynamicHighlights = isUnlisted
    ? investment.highlightPoints.map((pt) =>
        pt.toLowerCase().includes('price') ? `Indicative Price: ${formattedPriceText} / share` : pt
      )
    : investment.highlightPoints;

  const detailTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'issuer', label: 'Issuer Profile' },
    { id: 'documents', label: 'Documents & Filings' },
    { id: 'risks', label: 'Risks & Disclosures' },
  ];

  return (
    <div className="min-h-screen bg-base text-text-primary selection:bg-gold selection:text-base flex flex-col">
      <Navbar />

      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
        {/* Back Link */}
        <button
          onClick={() => navigate('/investments')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Investments</span>
        </button>

        {/* Header Hero Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#07132B] via-[#09183E] to-[#0D2456] border border-border-subtle p-6 sm:p-8 shadow-card-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/95 border border-white/20 p-2 flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden">
              {investment.logoUrl ? (
                <img
                  src={investment.logoUrl}
                  alt={investment.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-monogram')) {
                      const span = document.createElement('span');
                      span.className = 'fallback-monogram text-base font-extrabold text-slate-800 uppercase';
                      span.innerText = investment.issuerLogo;
                      parent.appendChild(span);
                    }
                  }}
                />
              ) : (
                <span className="text-base font-extrabold text-slate-800 uppercase">
                  {investment.issuerLogo}
                </span>
              )}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    investment.category === 'Bonds'
                      ? 'bonds'
                      : investment.category === 'Mutual Funds'
                      ? 'mutualFunds'
                      : 'unlisted'
                  }
                  size="sm"
                >
                  {investment.category}
                </Badge>
                <span className="text-xs text-text-muted">ISIN: {investment.isin || 'INE040A08011'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                {investment.title}
              </h1>
              <p className="text-xs text-text-secondary">
                Issued by {investment.issuer} · {investment.rating}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 self-stretch md:self-auto justify-between border-t md:border-t-0 md:border-l border-border-subtle/50 pt-4 md:pt-0 md:pl-8">
            <div>
              <p className="text-[10px] text-text-muted uppercase font-semibold">
                {isUnlisted ? 'Price / Share' : 'Yield / Return'}
              </p>
              <p className="text-3xl font-extrabold font-heading text-sky-400 tracking-tight mt-0.5">
                {isUnlisted ? `${formattedPriceText} / Share` : investment.yieldRate}
              </p>
            </div>
            <Button
              variant="gold"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="px-8 shadow-gold-glow"
            >
              Invest Now
            </Button>
          </div>
        </div>

        {/* Tabs and Tab Content */}
        <div className="space-y-6">
          <Tabs tabs={detailTabs} activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <Card className="p-6 space-y-4">
                  <h3 className="text-base font-bold font-heading text-white">Investment Thesis</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {dynamicDescription}
                  </p>

                  <div className="pt-4 border-t border-border-subtle/50 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Key Investment Highlights
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                      {dynamicHighlights.map((pt, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>

                {/* Key Metrics Grid */}
                <Card className="p-6">
                  <h3 className="text-base font-bold font-heading text-white mb-4">
                    Security Specifications
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-surface-2">
                      <span className="text-[10px] text-text-muted uppercase">
                        {isUnlisted ? 'Indicative Price' : 'Face Value'}
                      </span>
                      <p className="font-bold text-white text-sm mt-0.5">
                        {isUnlisted ? formattedPriceText : '₹ 1,00,000'}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-2">
                      <span className="text-[10px] text-text-muted uppercase">Tenure</span>
                      <p className="font-bold text-white text-sm mt-0.5">{investment.tenure}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-2">
                      <span className="text-[10px] text-text-muted uppercase">Frequency</span>
                      <p className="font-bold text-white text-sm mt-0.5">
                        {investment.payoutFrequency || 'Quarterly'}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-2">
                      <span className="text-[10px] text-text-muted uppercase">Settlement</span>
                      <p className="font-bold text-emerald-400 text-sm mt-0.5">T+1 via CDSL</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Side Investment Action Card */}
              <div className="lg:col-span-4 space-y-4">
                <Card className="p-6 space-y-5">
                  <h3 className="text-base font-bold font-heading text-white">Ready to Invest?</h3>
                  <div className="space-y-2 text-xs text-text-secondary">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Minimum Ticket:</span>
                      <span className="font-bold text-white font-mono">
                        {formatINR(dynamicMinInvestment)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Depository Charge:</span>
                      <span className="text-emerald-400 font-semibold">Zero Charges</span>
                    </div>
                  </div>

                  <Button
                    variant="gold"
                    size="md"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full shadow-gold-glow"
                  >
                    Start Order
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'issuer' && (
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold font-heading text-white">About the Issuer</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {investment.issuer} is an apex market entity with top tier regulatory standing. All issuances are governed by debenture trustees approved by SEBI.
              </p>
            </Card>
          )}

          {activeTab === 'documents' && (
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold font-heading text-white">Official Documentation</h3>

              {/* Admin Uploaded Scheme PDF */}
              {attachedPdf && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      PDF
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{attachedPdf.title}</p>
                      <p className="text-emerald-300/80 text-[11px]">
                        Official Scheme Document · Size: {attachedPdf.size} · Uploaded: {attachedPdf.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <a
                    href={attachedPdf.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                </div>
              )}

              <div className="space-y-3">
                {['Information Memorandum (IM)', 'Credit Rating Letter (CRISIL / ICRA)', 'Debenture Trust Deed'].map((doc) => (
                  <div key={doc} className="p-3 rounded-xl bg-surface-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-accent-cyan" />
                      <span className="font-semibold text-white">{doc}</span>
                    </div>
                    <Button variant="ghost" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'risks' && (
            <div className="danger-box rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <AlertTriangle className="w-5 h-5" />
                <span>Risk Factors Applicable to this Security</span>
              </div>
              <p className="text-xs sm:text-sm text-red-200/80 leading-relaxed">
                Secondary market liquidity may vary. Yields are subject to tax deduction at source (TDS) as per the provisions of the Income Tax Act, 1961.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Invest Flow Modal */}
      <InvestFlowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        investment={investment}
      />

      <Footer />
    </div>
  );
};
