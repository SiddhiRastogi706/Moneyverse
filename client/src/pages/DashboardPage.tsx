import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from 'recharts';
import {
  TrendingUp,
  Coins,
  FileText,
  Calendar,
  Landmark,
  Layers,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Timeline } from '../components/common/Timeline';
import { useAuthStore } from '../store/authStore';
import { formatINR } from '../utils/formatters';
import toast from 'react-hot-toast';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, holdings, maturities, transactions, documents, isAuthenticated, openAuthModal } = useAuthStore();
  const [timeRange, setTimeRange] = useState<'6M' | '1Y' | 'ALL'>('6M');

  // If user is not authenticated, prompt the authentication modal immediately
  React.useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal();
    }
  }, [isAuthenticated, openAuthModal]);

  // Donut Chart Data (Bonds 42.8%, Mutual Funds 28.3%, Unlisted 18.7%, Cash 10.2%)
  const portfolioDistribution = [
    { name: 'Bonds', value: 534000, percentage: '42.8%', color: '#0284C7' },
    { name: 'Mutual Funds', value: 353000, percentage: '28.3%', color: '#10B981' },
    { name: 'Unlisted Shares', value: 234500, percentage: '18.7%', color: '#8B5CF6' },
    { name: 'Cash / Others', value: 127250, percentage: '10.2%', color: '#F59E0B' },
  ];

  // Performance Area Chart Data (Nov to Apr trend)
  const performanceData = [
    { month: 'Nov', returnPct: 2.1 },
    { month: 'Dec', returnPct: 4.8 },
    { month: 'Jan', returnPct: 7.2 },
    { month: 'Feb', returnPct: 9.6 },
    { month: 'Mar', returnPct: 11.55 },
    { month: 'Apr', returnPct: 12.97 },
  ];

  const handleDownloadDoc = (title: string) => {
    toast.success(`Downloading ${title}...`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* WELCOME HEADER (Vibrant Electric Sky & Blue Gradient) */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 p-6 sm:p-7 shadow-lg shadow-sky-500/15 text-white relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Subtle light orbs for dynamic depth */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 w-40 h-40 rounded-full bg-cyan-400/20 blur-xl pointer-events-none" />

          <div className="space-y-1.5 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-sky-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PORTFOLIO DASHBOARD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight pt-1">
              Welcome Back, {user?.name || 'Rohit Sharma'}!
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/90 max-w-xl leading-relaxed">
              Track your investments, monitor returns and stay updated — all in one place.
            </p>
          </div>

          {/* Right Portfolio Metric Box with Glowing Cyber Arc */}
          <div className="flex items-center gap-6 z-10 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-6">
            <div>
              <p className="text-[11px] font-bold text-sky-100 uppercase tracking-wider">
                Total Portfolio Value
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
                  ₹ 12,48,750
                </span>
                <span className="text-xs font-bold text-emerald-300 bg-white/15 px-2 py-0.5 rounded-full flex items-center shadow-sm">
                  ↑ +8.62% <span className="text-[10px] text-sky-100 ml-1 font-normal">(Last 30 Days)</span>
                </span>
              </div>
            </div>

            {/* Glowing Wealth Arc Graphic */}
            <div className="hidden sm:flex flex-col items-center">
              <svg viewBox="0 0 100 50" className="w-20 h-10">
                <defs>
                  <linearGradient id="arcWhite" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#FDE047" />
                  </linearGradient>
                </defs>
                <path d="M10 45 A 40 40 0 0 1 90 45" fill="none" stroke="url(#arcWhite)" strokeWidth="3" strokeDasharray="3 2" />
                <circle cx="85" cy="22" r="3" fill="#FFFFFF" />
              </svg>
              <span className="text-[10px] font-extrabold text-amber-200 tracking-widest uppercase -mt-2">
                Your Wealth
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4 STAT CARDS (Crisp White with Dynamic Colorful Badges) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Investment */}
          <Card hoverEffect className="p-4 sm:p-5 flex items-center gap-4 bg-white border border-emerald-200 hover:border-emerald-300 shadow-sm rounded-2xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-sm">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Total Investment</p>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight mt-0.5">
                ₹ 10,50,000
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Principal Amount</p>
            </div>
          </Card>

          {/* Card 2: Total Returns */}
          <Card hoverEffect className="p-4 sm:p-5 flex items-center gap-4 bg-white border border-blue-200 hover:border-blue-300 shadow-sm rounded-2xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Total Returns</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight">
                  ₹ 1,36,240
                </h3>
              </div>
              <p className="text-[11px] font-bold text-emerald-600 mt-0.5">
                12.97% (Overall)
              </p>
            </div>
          </Card>

          {/* Card 3: Active Investments */}
          <Card hoverEffect className="p-4 sm:p-5 flex items-center gap-4 bg-white border border-purple-200 hover:border-purple-300 shadow-sm rounded-2xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-sm">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Active Investments</p>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight mt-0.5">
                5
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Across 3 Asset Classes</p>
            </div>
          </Card>

          {/* Card 4: Upcoming Maturities */}
          <Card hoverEffect className="p-4 sm:p-5 flex items-center gap-4 bg-white border border-amber-200 hover:border-amber-300 shadow-sm rounded-2xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Upcoming Maturities</p>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight mt-0.5">
                2
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Next 6 Months</p>
            </div>
          </Card>
        </div>

        {/* ========================================================================= */}
        {/* MIDDLE SECTION: CHARTS + RIGHT QUICK ACTIONS & MATURITIES */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Charts & Tables */}
          <div className="lg:col-span-8 space-y-6">
            {/* Charts Row: Donut Chart + Returns Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chart 1: Portfolio Overview Donut */}
              <Card className="p-5 flex flex-col justify-between bg-white border border-slate-200 shadow-sm rounded-2xl">
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900">Portfolio Overview</h3>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 my-2">
                  {/* Donut Container with Center Label */}
                  <div className="relative w-44 h-44 flex items-center justify-center flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioDistribution}
                          innerRadius={52}
                          outerRadius={72}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {portfolioDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                      <span className="text-base font-black font-heading text-slate-900">₹ 12.48L</span>
                      <span className="text-[10px] text-slate-500 font-semibold">Total Value</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex-1 w-full space-y-2.5 text-xs">
                    {portfolioDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-slate-700 font-semibold">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 font-mono text-[11px]">{item.percentage}</span>
                          <span className="font-bold text-slate-900 font-mono">
                            {formatINR(item.value)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Chart 2: Returns Performance Area Chart */}
              <Card className="p-5 flex flex-col justify-between bg-white border border-slate-200 shadow-sm rounded-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-heading text-slate-900">Returns Performance</h3>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 shadow-sm">
                    <span className="font-semibold">6M</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center my-2">
                  {/* Left Area Chart */}
                  <div className="sm:col-span-7 h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="returnGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
                        <YAxis
                          stroke="#94A3B8"
                          fontSize={10}
                          tickLine={false}
                          domain={[0, 20]}
                          tickFormatter={(val) => `${val}%`}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: '10px',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                            fontSize: '11px',
                            color: '#0F172A',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="returnPct"
                          stroke="#10B981"
                          strokeWidth={2.5}
                          fill="url(#returnGradientLight)"
                          dot={{ fill: '#10B981', r: 3.5, stroke: '#FFFFFF', strokeWidth: 1.5 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Right Metrics Panel */}
                  <div className="sm:col-span-5 space-y-3 pl-2 sm:border-l border-slate-200 text-xs">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Overall Return</p>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xl font-black text-emerald-600 font-heading">
                          12.97% +
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        +1.42% <span className="text-slate-500 font-normal">(vs. last month)</span>
                      </span>
                    </div>

                    <div className="pt-1 space-y-1">
                      <p className="text-[10px] text-slate-500 font-semibold">Interest / Dividend</p>
                      <p className="text-xs font-bold text-slate-900 font-mono">₹ 1,12,480</p>
                    </div>

                    <div className="pt-1 space-y-1">
                      <p className="text-[10px] text-slate-500 font-semibold">Capital Gain</p>
                      <p className="text-xs font-bold text-slate-900 font-mono">₹ 23,760</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Current Holdings Table */}
            <Card className="p-5 space-y-4 bg-white border border-slate-200 shadow-sm rounded-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-heading text-slate-900">Current Holdings</h3>
                <Link to="/portfolio" className="text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1 font-bold">
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Investment</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Units / Amount</th>
                      <th className="px-4 py-3">Current Value</th>
                      <th className="px-4 py-3 text-right">Returns</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {holdings.map((h) => (
                      <tr key={h.id} className="hover:bg-sky-50/30 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                              {h.logoUrl ? (
                                <img
                                  src={h.logoUrl}
                                  alt={h.name}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <span className="text-[10px] font-bold text-slate-700">{h.logo}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-xs sm:text-sm">{h.name}</p>
                              <span className="text-[10px] text-slate-500 font-medium">{h.category}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-600 font-medium">{h.category}</td>
                        <td className="px-4 py-3.5 text-slate-600 font-mono font-medium">{h.unitsOrAmount}</td>
                        <td className="px-4 py-3.5 text-slate-900 font-bold font-mono">{formatINR(h.currentValue)}</td>
                        <td className="px-4 py-3.5 text-right font-bold text-emerald-600 font-mono">
                          +{h.returnsPercent}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Maturity Tracking Timeline */}
            <Card className="p-5 space-y-4 bg-white border border-slate-200 shadow-sm rounded-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-heading text-slate-900">Maturity Tracking</h3>
                <Link to="/portfolio" className="text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1 font-bold">
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <Timeline
                events={maturities.map((m) => ({
                  id: m.id,
                  title: m.name,
                  dateOrInfo: `${formatINR(m.amount)} · ${m.maturityDate}`,
                  badge: (
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border shadow-sm ${m.badgeColor}`}>
                      {m.daysLeft} Days Left
                    </span>
                  ),
                }))}
              />
            </Card>

            {/* Transaction History */}
            <Card className="p-5 space-y-4 bg-white border border-slate-200 shadow-sm rounded-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-heading text-slate-900">Transaction History</h3>
                <Link to="/transactions" className="text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1 font-bold">
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Instrument</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-sky-50/30 transition-colors">
                        <td className="px-4 py-3 text-slate-500 font-medium">{tx.date}</td>
                        <td className="px-4 py-3">
                          <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 font-semibold shadow-sm">
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-900 font-semibold">{tx.instrument}</td>
                        <td className="px-4 py-3 text-slate-900 font-bold font-mono">{formatINR(tx.amount)}</td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold shadow-sm">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right Column (4 cols): Quick Actions, Upcoming Maturities Cards, Promo Card, Recent Docs */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions (Crisp Colorful Cards) */}
            <Card className="p-5 space-y-3 bg-white border border-slate-200 shadow-sm rounded-2xl">
              <h3 className="text-base font-bold font-heading text-slate-900">Quick Actions</h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => navigate('/investments?category=Bonds')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-sky-50/60 hover:bg-sky-100/70 border border-sky-200 text-left transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center shadow-sm">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Invest in Bonds</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  onClick={() => navigate('/investments?category=Mutual+Funds')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-200 text-left transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                      <Coins className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Explore Mutual Funds</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  onClick={() => navigate('/investments?category=Unlisted+Shares')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-50/60 hover:bg-purple-100/70 border border-purple-200 text-left transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center shadow-sm">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Browse Unlisted Shares</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  onClick={() => navigate('/documents')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200 text-left transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-sm">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">Your Documents</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            </Card>

            {/* Upcoming Maturities Box */}
            <Card className="p-5 space-y-3 bg-white border border-slate-200 shadow-sm rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-600">
                  <Calendar className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-slate-900">Upcoming Maturities</h3>
                </div>
                <Link to="/portfolio" className="text-[11px] text-sky-600 hover:text-sky-700 font-semibold">
                  View All →
                </Link>
              </div>

              <div className="space-y-3 pt-1">
                {/* Item 1: HDFC Bank NCD */}
                <div className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50/40 border border-slate-200 flex items-center justify-between transition-colors shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                      <img src="/logos/hdfc.svg" alt="HDFC Bank" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">HDFC Bank NCD</p>
                      <p className="text-[11px] text-slate-500">₹ 2,00,000 · 15 Jun 2026</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold whitespace-nowrap shadow-sm">
                    30 Days Left
                  </span>
                </div>

                {/* Item 2: Tata Motors Unlisted */}
                <div className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50/40 border border-slate-200 flex items-center justify-between transition-colors shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                      <img src="/logos/tata.svg" alt="Tata Motors" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Tata Motors Unlisted Shares</p>
                      <p className="text-[11px] text-slate-500">₹ 75,000 · 22 Aug 2026</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold whitespace-nowrap shadow-sm">
                    118 Days Left
                  </span>
                </div>

                {/* Item 3: Govt. Bond GOI */}
                <div className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50/40 border border-slate-200 flex items-center justify-between transition-colors shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                      <img src="/logos/goi.svg" alt="Govt of India" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Govt. Bond (GOI)</p>
                      <p className="text-[11px] text-slate-500">₹ 1,50,000 · 10 Nov 2026</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold whitespace-nowrap shadow-sm">
                    189 Days Left
                  </span>
                </div>
              </div>
            </Card>

            {/* Build Your Wealth Step by Step Promo Card (Clean Bluish & White) */}
            <div className="rounded-2xl bg-gradient-to-br from-sky-50 via-white to-blue-50/70 border border-sky-200 p-5 shadow-sm relative overflow-hidden space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/25">
                <Coins className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-base font-bold font-heading text-slate-900">
                  Build Your Wealth Step by Step
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Access high-quality investment opportunities across multiple asset classes, all in one platform.
                </p>
              </div>

              <Button
                variant="gold"
                size="sm"
                onClick={() => navigate('/investments')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="w-full text-xs"
              >
                Explore More
              </Button>
            </div>

            {/* Recent Documents */}
            <Card className="p-5 space-y-3 bg-white border border-slate-200 shadow-sm rounded-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-heading text-slate-900">Recent Documents</h3>
                <Link to="/documents" className="text-[11px] text-sky-600 hover:text-sky-700 font-semibold">
                  View All →
                </Link>
              </div>

              <div className="space-y-2.5">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50/40 border border-slate-200 flex items-center justify-between gap-3 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center text-[10px] font-extrabold flex-shrink-0">
                        PDF
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{doc.title}</p>
                        <p className="text-[10px] text-slate-500">{doc.date} · {doc.size}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadDoc(doc.title)}
                      className="px-3 py-1 rounded-lg bg-white hover:bg-sky-50 text-[11px] font-semibold text-slate-700 hover:text-sky-600 border border-slate-200 hover:border-sky-300 flex-shrink-0 transition-all shadow-sm"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
