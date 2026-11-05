import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid,
  List,
  ArrowRight,
  Landmark,
  Coins,
  Layers,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { formatINR } from '../../utils/formatters';
import { InvestmentProduct } from '../../types';
import { UNLISTED_SHARES_CATALOG } from '../../data/unlistedSharesData';
import { CORPORATE_BONDS_CATALOG } from '../../data/bondsData';
import { useAdminStore } from '../../store/adminStore';

export const SAMPLE_INVESTMENTS: InvestmentProduct[] = [
  {
    id: 'inv-hdfc-ncd',
    title: 'HDFC Bank Senior Secured NCD',
    issuer: 'HDFC Bank Ltd',
    issuerLogo: 'HDFC',
    logoUrl: '/logos/hdfc.svg',
    category: 'Bonds',
    yieldRate: '9.25% p.a.',
    tenure: '3 Years',
    rating: 'Rated AAA by CRISIL',
    minInvestment: 100000,
    tag: 'Bonds',
    payoutFrequency: 'Quarterly',
    isin: 'INE040A08011',
    description: 'Triple-A rated secured debentures offering guaranteed quarterly coupon payments.',
    highlightPoints: ['Capital protection priority', 'Direct depository transfer', 'Tradable on NSE Debt Segment'],
  },
  {
    id: 'inv-hdfc-mf',
    title: 'HDFC Balanced Advantage Fund',
    issuer: 'HDFC Asset Management Co',
    issuerLogo: 'HDFC-MF',
    logoUrl: '/logos/hdfc-mf.svg',
    category: 'Mutual Funds',
    yieldRate: '15.40% 3Y CAGR',
    tenure: 'Open Ended (SIP Available)',
    rating: '5-Star Rated by Value Research',
    minInvestment: 500,
    tag: 'Mutual Funds',
    payoutFrequency: 'Growth / Annual Dividend',
    isin: 'INF179K01994',
    description: 'Dynamic asset allocation mutual fund delivering market-beating returns with downside protection.',
    highlightPoints: ['SEBI regulated tier-1 AMC', 'Disciplined asset rebalancing', 'Direct plan zero brokerage'],
  },
  {
    id: 'inv-groww-unlisted',
    title: 'Nextbillion Technology (Groww) Pre-IPO',
    issuer: 'Nextbillion Technology Pvt Ltd · NSDL & CDSL',
    issuerLogo: 'GROWW',
    logoUrl: '/unlisted-logos/groww.png',
    logoBg: 'bg-emerald-900/40 text-emerald-400 border-emerald-500/40',
    category: 'Unlisted Shares',
    yieldRate: '₹ 245 / Share',
    tenure: 'Pre-IPO (Unlisted)',
    rating: 'Lot: 500',
    minInvestment: 122500,
    tag: 'Unlisted Shares',
    payoutFrequency: 'Capital Gain on IPO',
    isin: 'INE098U01014',
    depository: 'NSDL & CDSL',
    description: 'India\'s leading stockbroker and investment platform preparing for domestic mainboard IPO listing.',
    highlightPoints: ['Over 10M active transacting users', 'Profitable unit economics', 'Direct CDSL DIS demat delivery'],
  },
  {
    id: 'inv-reliance-power-ncd',
    title: 'Reliance Power High Yield NCD',
    issuer: 'Reliance Power Ltd',
    issuerLogo: 'R-PWR',
    logoUrl: '/logos/reliance.svg',
    category: 'Bonds',
    yieldRate: '10.50% p.a.',
    tenure: '3 Years',
    rating: 'Rated AA+ by CARE',
    minInvestment: 100000,
    tag: 'Bonds',
    payoutFrequency: 'Semi-Annual',
    isin: 'INE614G07085',
    description: 'Attractive fixed-return secured debentures backed by operating utility solar & thermal assets.',
    highlightPoints: ['Escrow debt servicing mechanism', 'Asset cover ratio 1.5x', 'High monthly/semi-annual cashflow'],
  },
  {
    id: 'inv-sbi-bluechip-mf',
    title: 'SBI Bluechip Large Cap Equity Fund',
    issuer: 'SBI Funds Management Ltd',
    issuerLogo: 'SBI-MF',
    logoUrl: 'https://www.google.com/s2/favicons?domain=sbimf.com&sz=128',
    category: 'Mutual Funds',
    yieldRate: '16.80% 3Y CAGR',
    tenure: 'Open Ended (SIP Available)',
    rating: '5-Star Rated (Top Quartile)',
    minInvestment: 500,
    tag: 'Mutual Funds',
    payoutFrequency: 'Compounded Growth',
    isin: 'INF200K01018',
    description: 'Premier large cap mutual fund investing across India’s top sovereign and conglomerate industry leaders.',
    highlightPoints: ['India\'s largest fund house', 'Consistently outperforms Nifty 50', 'Tax efficient long-term capital gains'],
  },
  {
    id: 'inv-reliance-unlisted',
    title: 'Reliance Retail Ventures Pre-IPO',
    issuer: 'Reliance Industries Group · NSDL & CDSL',
    issuerLogo: 'R-RETAIL',
    logoUrl: '/unlisted-logos/reliance_retail.png',
    logoBg: 'bg-blue-900/40 text-blue-400 border-blue-500/40',
    category: 'Unlisted Shares',
    yieldRate: '₹ 1,450 / Share',
    tenure: 'Pre-IPO (Unlisted)',
    rating: 'Lot: 100',
    minInvestment: 145000,
    tag: 'Unlisted Shares',
    payoutFrequency: 'Capital Gain on Demerger',
    isin: 'INE848E01016',
    depository: 'NSDL & CDSL',
    description: 'The largest omni-channel retail powerhouse in India spanning grocery, consumer electronics and fashion.',
    highlightPoints: ['18,000+ operational stores', 'High marquee global backing (KKR, Silver Lake)', 'Anticipated massive demerger event'],
  },
];

export const ALL_INVESTMENTS: InvestmentProduct[] = [
  ...SAMPLE_INVESTMENTS,
  ...CORPORATE_BONDS_CATALOG,
  ...UNLISTED_SHARES_CATALOG,
];

export const InvestmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const { getPrice, customPrices, isItemDeleted, deletedProductIds } = useAdminStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'yield' | 'min' | 'tenure'>('yield');
  const [visibleCount, setVisibleCount] = useState(24);

  // Helper to resolve live price for unlisted shares (honors Admin overrides by ID or Title)
  const getLivePriceForInvestment = (inv: InvestmentProduct): number => {
    let basePrice = 100;
    if (inv.yieldRate) {
      const match = inv.yieldRate.match(/[\d,.]+/);
      if (match) {
        const parsed = parseFloat(match[0].replace(/,/g, ''));
        if (!isNaN(parsed) && parsed > 0) basePrice = parsed;
      }
    } else if (inv.minInvestment > 1000) {
      basePrice = Math.round(inv.minInvestment / 100);
    }

    // Check custom overrides by ID first, then by Title/Company Name
    const priceById = getPrice(inv.id, -1);
    if (priceById > 0) return priceById;

    const priceByTitle = getPrice(inv.title, -1);
    if (priceByTitle > 0) return priceByTitle;

    return basePrice;
  };

  const getDisplayYieldOrPrice = (inv: InvestmentProduct): string => {
    if (inv.category === 'Unlisted Shares') {
      const livePrice = getLivePriceForInvestment(inv);
      return `₹ ${livePrice.toLocaleString('en-IN')} / Share`;
    }
    return inv.yieldRate;
  };

  const getCalculatedMinInvestment = (inv: InvestmentProduct): number => {
    if (inv.category === 'Unlisted Shares') {
      const livePrice = getLivePriceForInvestment(inv);
      let lotSize = 50;
      if (inv.rating && inv.rating.includes('Lot:')) {
        const match = inv.rating.match(/[\d,]+/);
        if (match) {
          const parsed = parseInt(match[0].replace(/,/g, ''), 10);
          if (!isNaN(parsed) && parsed > 0) lotSize = parsed;
        }
      }
      return livePrice * lotSize;
    }
    return inv.minInvestment;
  };

  // Sync state if URL query changes
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
    const cat = searchParams.get('category');
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredInvestments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_INVESTMENTS.filter((inv) => {
      // Hide live deleted products
      if (isItemDeleted(inv.id, inv.title)) return false;

      const matchCat =
        selectedCategory === 'All' || inv.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchSearch =
        !q ||
        inv.title.toLowerCase().includes(q) ||
        inv.issuer.toLowerCase().includes(q) ||
        inv.issuerLogo.toLowerCase().includes(q) ||
        inv.tag.toLowerCase().includes(q) ||
        (inv.isin && inv.isin.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery, isItemDeleted, deletedProductIds]);

  // Display subset unless searching
  const displayedInvestments = useMemo(() => {
    if (searchQuery.trim()) {
      return filteredInvestments;
    }
    return filteredInvestments.slice(0, visibleCount);
  }, [filteredInvestments, searchQuery, visibleCount]);

  const popularChips = useMemo(() => {
    if (selectedCategory === 'Bonds') {
      return [
        { label: 'Hella Infra (16.2%)', query: 'Hella Infra' },
        { label: 'Akara Capital (14.3%)', query: 'Akara Capital' },
        { label: 'Himatsingka (13.5%)', query: 'Himatsingka' },
        { label: 'Neogrowth (13.7%)', query: 'Neogrowth' },
        { label: 'Muthoot (10.0%)', query: 'Muthoot' },
        { label: 'Vivriti (11.0%)', query: 'Vivriti' },
        { label: 'Navi (10.4%)', query: 'Navi' },
        { label: 'InCred (10.25%)', query: 'InCred' },
        { label: 'Capri Global (10.0%)', query: 'Capri Global' },
        { label: 'IIFL Finance (9.75%)', query: 'IIFL' },
      ];
    }
    if (selectedCategory === 'Unlisted Shares') {
      return [
        { label: 'Boat', query: 'Boat' },
        { label: 'Zepto', query: 'Zepto' },
        { label: 'CSK', query: 'CSK' },
        { label: 'Bira 91', query: 'Bira' },
        { label: 'Oyo', query: 'Oyo' },
        { label: 'Care Health', query: 'Care Health' },
        { label: 'HDFC Sec', query: 'HDFC Securities' },
        { label: 'PharmEasy', query: 'PharmEasy' },
        { label: 'Lava', query: 'Lava' },
        { label: 'Groww', query: 'Groww' },
      ];
    }
    return [
      { label: 'Hella Infra Bond (16.2%)', query: 'Hella Infra' },
      { label: 'Boat (Pre-IPO)', query: 'Boat' },
      { label: 'Akara Capital Bond (14.3%)', query: 'Akara Capital' },
      { label: 'Zepto (Pre-IPO)', query: 'Zepto' },
      { label: 'CSK', query: 'CSK' },
      { label: 'Muthoot NCD', query: 'Muthoot' },
      { label: 'Himatsingka Bond', query: 'Himatsingka' },
      { label: 'Bira 91', query: 'Bira' },
      { label: 'Vivriti NCD', query: 'Vivriti' },
    ];
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-500 selection:text-white flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1360px] mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600">
            CURATED INDIAN ASSETS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Explore Investment Opportunities
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Diversify across institutional-grade corporate bonds, high-yield mutual funds, and pre-IPO unlisted shares.
          </p>
        </div>
      </section>

      {/* Controls & Filter Bar */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {['All', 'Bonds', 'Mutual Funds', 'Unlisted Shares'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-md shadow-sky-500/25'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Layout Toggles */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search bond, company, or ISIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-8 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="flex items-center gap-1 text-sky-600 font-bold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Popular:
          </span>
          {popularChips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => {
                setSearchQuery(chip.query);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-sky-400 text-[11px] text-slate-700 hover:text-sky-600 transition-all shadow-sm"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Results Counter & Active Filter Badge */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredInvestments.length}</strong> {selectedCategory === 'All' ? 'investments' : selectedCategory}
            {searchQuery && <> matching "<span className="text-sky-600 font-semibold">{searchQuery}</span>"</>}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-sky-600 hover:underline font-semibold"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Investment Cards Grid / List */}
        {filteredInvestments.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl border border-dashed border-border-subtle">
            <p className="text-text-muted text-sm">No investment opportunities found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-sky-400 hover:underline font-semibold"
            >
              Reset Filters & Show All
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedInvestments.map((inv) => (
              <Card key={inv.id} hoverEffect className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/95 border border-white/20 p-1.5 flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden">
                        {inv.logoUrl ? (
                          <img
                            src={inv.logoUrl}
                            alt={inv.title}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent && !parent.querySelector('.fallback-monogram')) {
                                const span = document.createElement('span');
                                span.className = 'fallback-monogram font-extrabold text-[11px] text-slate-800 tracking-wider uppercase';
                                span.innerText = inv.issuerLogo;
                                parent.appendChild(span);
                              }
                            }}
                          />
                        ) : (
                          <span className="font-extrabold text-[11px] text-slate-800 tracking-wider uppercase">
                            {inv.issuerLogo}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-slate-900 leading-tight truncate" title={inv.title}>
                          {inv.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5" title={inv.issuer}>
                          {inv.issuer}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        inv.category === 'Bonds'
                          ? 'bonds'
                          : inv.category === 'Mutual Funds' || inv.category === 'Money Market'
                          ? 'mutualFunds'
                          : 'unlisted'
                      }
                      size="xs"
                    >
                      {inv.category}
                    </Badge>
                    <span className="text-[11px] text-slate-500">· {inv.rating}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">
                        {inv.category === 'Unlisted Shares' ? 'Price / Share' : 'Expected Yield'}
                      </p>
                      <p className="text-xl font-extrabold font-heading text-sky-600 tracking-tight mt-0.5">
                        {getDisplayYieldOrPrice(inv)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">
                        {inv.category === 'Unlisted Shares' ? 'Depository' : 'Tenure'}
                      </p>
                      <p className="text-xs font-bold text-slate-900 mt-1">
                        {inv.category === 'Unlisted Shares' ? (inv.depository || 'NSDL & CDSL') : inv.tenure}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600">
                    Min. Investment: <span className="font-bold text-slate-900">{formatINR(getCalculatedMinInvestment(inv))}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => navigate(`/investments/${inv.id}`)}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="flex-1 shadow-md shadow-sky-500/25"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* List Mode */
          <div className="space-y-3">
            {displayedInvestments.map((inv) => (
              <Card
                key={inv.id}
                hoverEffect
                className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-[280px]">
                  <div className="w-11 h-11 rounded-xl bg-white/95 border border-white/20 p-1.5 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                    {inv.logoUrl ? (
                      <img
                        src={inv.logoUrl}
                        alt={inv.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback-monogram')) {
                            const span = document.createElement('span');
                            span.className = 'fallback-monogram font-extrabold text-[10px] text-slate-800 tracking-wider uppercase';
                            span.innerText = inv.issuerLogo;
                            parent.appendChild(span);
                          }
                        }}
                      />
                    ) : (
                      <span className="font-extrabold text-[10px] text-slate-800 tracking-wider uppercase">
                        {inv.issuerLogo}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{inv.title}</h4>
                    <p className="text-xs text-slate-500">{inv.category} · {inv.rating}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-xs flex-1">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">
                      {inv.category === 'Unlisted Shares' ? 'Price' : 'Yield'}
                    </span>
                    <p className="font-bold text-sky-600 text-sm">{getDisplayYieldOrPrice(inv)}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">
                      {inv.category === 'Unlisted Shares' ? 'Depository' : 'Tenure'}
                    </span>
                    <p className="font-bold text-slate-900 text-sm">
                      {inv.category === 'Unlisted Shares' ? (inv.depository || 'NSDL & CDSL') : inv.tenure}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase">Min Investment</span>
                    <p className="font-bold text-slate-900 text-sm">{formatINR(getCalculatedMinInvestment(inv))}</p>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => navigate(`/investments/${inv.id}`)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="w-full md:w-auto shadow-md shadow-sky-500/25"
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button if there are remaining items and not actively searching */}
        {!searchQuery && filteredInvestments.length > visibleCount && (
          <div className="text-center pt-6">
            <Button
              variant="secondary"
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-8 py-3 text-xs font-semibold bg-surface-2 hover:bg-surface-3 border-border-subtle"
            >
              Load More ({filteredInvestments.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
