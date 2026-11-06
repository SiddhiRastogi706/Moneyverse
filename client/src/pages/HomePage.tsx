import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ShieldCheck,
  Coins,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Users,
  BarChart3,
  Star,
  Send,
  Lightbulb,
  Building2,
  Landmark,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { formatINR } from '../utils/formatters';
import { UNLISTED_SHARES_CATALOG } from '../data/unlistedSharesData';
import { InvestmentProduct } from '../types';
import heroTeamImg from '../assets/hero-team.jpg';

const FEATURED_UNLISTED_IDS = [
  'unlisted-metropolitan-stock-exchange-msei',
  'unlisted-oravel-stays-limited-oyo',
  'unlisted-national-commodity-derivatives-ncdex',
];

const featuredUnlistedInvestments: InvestmentProduct[] = FEATURED_UNLISTED_IDS.map((id) => {
  const investment = UNLISTED_SHARES_CATALOG.find((product) => product.id === id);
  if (!investment) {
    throw new Error(`Featured investment not found: ${id}`);
  }
  return investment;
});

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const heroAssetCards = [
    {
      title: 'Bonds',
      desc: 'Stable Income / Long Term',
      icon: Landmark,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/35',
      hoverBorder: 'hover:border-blue-400/70',
      path: '/investments?category=Bonds',
    },
    {
      title: 'Mutual Funds',
      desc: 'SIP & Wealth Creation',
      icon: Coins,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/35',
      hoverBorder: 'hover:border-emerald-400/70',
      path: '/investments?category=Mutual+Funds',
    },
    {
      title: 'Unlisted Shares',
      desc: 'Early Access / High Upside',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/35',
      hoverBorder: 'hover:border-purple-400/70',
      path: '/investments?category=Unlisted+Shares',
    },
    {
      title: 'Sovereign Gold',
      desc: '2.5% p.a. + Gold Returns',
      icon: Sparkles,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/35',
      hoverBorder: 'hover:border-amber-400/70',
      path: '/investments?category=Bonds',
    },
    {
      title: 'T-Bills & CPs',
      desc: 'Zero Default / Sovereign',
      icon: Building2,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500/35',
      hoverBorder: 'hover:border-cyan-400/70',
      path: '/investments?category=Money+Market',
    },
  ];

  const handleAskAI = (promptText: string) => {
    setChatQuery(promptText);
    setIsTyping(true);
    setChatResponse(null);

    setTimeout(() => {
      setIsTyping(false);
      if (promptText.toLowerCase().includes('bond')) {
        setChatResponse(
          'For a 2-year horizon, AAA-rated PSU and Corporate Bonds like HDFC Bank NCD (9.25% p.a.) or PFC Bonds (8.75% p.a.) provide sovereign-grade stability with capital protection and predictable quarterly interest payouts.'
        );
      } else if (promptText.toLowerCase().includes('mutual fund')) {
        setChatResponse(
          'Top Mutual Funds (Equity, Debt, and Hybrid) allow disciplined wealth creation via SIP or lump sum, delivering market-beating returns (12%-18% CAGR) with SEBI-regulated AMC fund managers.'
        );
      } else {
        setChatResponse(
          'Top curated Pre-IPO shares include high-growth tech leaders like Groww, Tata Technologies and Reliance Retail with expected upsides of 22%-28% over a 2-3 year listing window.'
        );
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-500 selection:text-white relative overflow-hidden">
      <Navbar />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Full Background Image with Left White Gradient & Crisp Text) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center py-16 md:py-24 overflow-hidden border-b border-slate-100 bg-white">
        {/* Full-bleed Background Team Image */}
        <div
          className="absolute inset-0 bg-cover bg-center lg:bg-[center_right] bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url(${heroTeamImg})` }}
        />

        {/* Left-Side Soft White Gradient Effect: subtle and light, letting the team image show naturally */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.68) 32%, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 0) 90%)',
          }}
        />

        {/* Soft bottom edge blend to smoothly meet the next section */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, transparent 65%, rgba(255, 255, 255, 0.35) 85%, #FFFFFF 100%)',
          }}
        />

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content: Directly over the gradient for maximum contrast */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 max-w-2xl"
            >
              {/* Overline Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-sky-600">
                  BUILD WEALTH. EXPLORE OPPORTUNITIES.
                </span>
              </div>

              {/* H1 Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black font-heading text-slate-900 tracking-tight leading-[1.12]">
                Smarter Investments <br />
                for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">Brighter Tomorrow</span>
              </h1>

              {/* Subtitle - Crisp Slate Text */}
              <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed">
                Discover opportunities in Bonds, Mutual Funds and Unlisted Shares — all in one place.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => navigate('/investments')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="shadow-blue-glow text-base px-8 py-3.5 font-bold"
                >
                  Explore Investments
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/contact')}
                  leftIcon={<Headphones className="w-4 h-4 text-sky-500" />}
                  className="text-base px-6 py-3.5 font-semibold bg-white/90 border-slate-300 backdrop-blur-sm hover:bg-white text-slate-800 shadow-sm"
                >
                  Talk to an Expert
                </Button>
              </div>

              {/* Horizontal Infinite Scroller (Bonds, Mutual Funds, Unlisted Shares) - Appinventiv style */}
              <div className="pt-4 space-y-2.5">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                  <span>Curated High-Yield Asset Classes</span>
                </div>

                {/* Scroller Track: Stays in the left half, smooth fade mask on left and right edges */}
                <div
                  className="relative overflow-hidden w-full max-w-[620px] py-1"
                  style={{
                    maskImage:
                      'linear-gradient(to right, transparent 0%, black 7%, black 90%, transparent 100%)',
                    WebkitMaskImage:
                      'linear-gradient(to right, transparent 0%, black 7%, black 90%, transparent 100%)',
                  }}
                >
                  <div className="animate-marquee-slow flex items-center gap-3">
                    {[...heroAssetCards, ...heroAssetCards].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => navigate(item.path)}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/95 border border-slate-200 ${item.hoverBorder} backdrop-blur-md transition-all shadow-sm cursor-pointer min-w-[210px] flex-shrink-0 group hover:bg-slate-50`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg ${item.bgColor} border ${item.borderColor} flex items-center justify-center ${item.color} flex-shrink-0 group-hover:scale-105 transition-transform`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-slate-500 leading-tight mt-0.5 whitespace-nowrap">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ASSET CLASSES SECTION (Image 4 - Pure White Background) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-sky-600 mb-2 block">
              EXPLORE INVESTMENT CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Opportunities Across Asset Classes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Choose from a curated range of investment options built for growth, stability and long-term wealth creation.
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => navigate('/investments')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-end bg-white border-slate-200 text-slate-800 hover:border-sky-500 hover:text-sky-600 shadow-sm"
          >
            View All Investments
          </Button>
        </div>

        {/* 3 Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Bonds */}
          <Card hoverEffect className="group flex flex-col justify-between bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300 rounded-2xl overflow-hidden transition-all">
            {/* Image Header with RBI/Parliament architecture aesthetic */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <div className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge variant="bonds" dot>
                  Fixed Income
                </Badge>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6 bg-white">
              <div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">Bonds</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Corporate | Government | NCDs</p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                    <span>Fixed Returns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                    <span>Rated & Reliable</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                    <span>Multiple Maturities</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/investments?category=Bonds')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full justify-between bg-slate-50 hover:bg-sky-50 text-slate-800 hover:text-sky-600 border border-slate-200 hover:border-sky-300 font-semibold"
              >
                Explore Bonds
              </Button>
            </div>
          </Card>

          {/* Card 2: Mutual Funds */}
          <Card hoverEffect className="group flex flex-col justify-between bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 rounded-2xl overflow-hidden transition-all">
            {/* Image Header with stacked coins & sprouting plant */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <div className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge variant="mutualFunds" dot>
                  SIP & Lump Sum
                </Badge>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6 bg-white">
              <div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">Mutual Funds</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Equity | Debt | Hybrid</p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>High Growth Potential</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Expert Fund Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Flexible SIP Options</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/investments?category=Mutual+Funds')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full justify-between bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-600 border border-slate-200 hover:border-emerald-300 font-semibold"
              >
                Explore Mutual Funds
              </Button>
            </div>
          </Card>

          {/* Card 3: Unlisted Shares */}
          <Card hoverEffect className="group flex flex-col justify-between bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 rounded-2xl overflow-hidden transition-all">
            {/* Image Header with cyber city financial trend graph */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <div className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge variant="unlisted" dot>
                  High Upside
                </Badge>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6 bg-white">
              <div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">Unlisted Shares</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Pre-IPO | Growth Stage | Private</p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span>High Growth Potential</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span>Early Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span>Diversified Sectors</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/investments?category=Unlisted+Shares')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full justify-between bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-purple-600 border border-slate-200 hover:border-purple-300 font-semibold"
              >
                Explore Unlisted Shares
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. STATS STRIP (Image 4) */}
      {/* ========================================================================= */}
      <section className="py-8 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat 1 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">50,000+</h3>
              <p className="text-xs text-slate-500 mt-0.5">Registered Investors</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">₹2,500 Cr+</h3>
              <p className="text-xs text-slate-500 mt-0.5">Total Transaction Value</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">99.8%</h3>
              <p className="text-xs text-slate-500 mt-0.5">Platform Uptime</p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 flex-shrink-0">
              <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">4.8/5</h3>
              <p className="text-xs text-slate-500 mt-0.5">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. AI ASSISTANT SECTION (Image 4) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-sky-50/90 via-white to-blue-50/80 border border-sky-200 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          {/* Subtle backglow */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

          {/* Left Robot Illustration */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Concentric glow circles */}
              <div className="absolute inset-0 rounded-full border border-sky-300 animate-pulse-glow" />
              <div className="absolute inset-4 rounded-full border border-sky-200" />
              <div className="absolute inset-8 rounded-full bg-sky-100 blur-xl" />

              {/* 3D Cyber Robot Avatar SVG */}
              <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-[0_4px_20px_rgba(56,189,248,0.35)]">
                <defs>
                  <linearGradient id="botHead" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                  <linearGradient id="botVisor" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                </defs>
                {/* Robot Ears / Antennas */}
                <circle cx="48" cy="88" r="9" fill="#0284C7" />
                <circle cx="152" cy="88" r="9" fill="#0284C7" />
                {/* Robot Head */}
                <rect x="52" y="50" width="96" height="78" rx="38" fill="url(#botHead)" stroke="#38BDF8" strokeWidth="2" />
                {/* Robot Visor / Screen */}
                <rect x="62" y="62" width="76" height="52" rx="24" fill="url(#botVisor)" />
                {/* Friendly Glowing Blue Eyes */}
                <ellipse cx="84" cy="86" rx="8" ry="11" fill="#38BDF8" />
                <ellipse cx="116" cy="86" rx="8" ry="11" fill="#38BDF8" />
                <circle cx="86" cy="83" r="3" fill="#FFFFFF" />
                <circle cx="118" cy="83" r="3" fill="#FFFFFF" />
                {/* Robot Body / Collar */}
                <path d="M72 135 L128 135 L144 185 L56 185 Z" fill="#E2E8F0" stroke="#38BDF8" strokeWidth="1.5" />
                {/* Core chest light */}
                <circle cx="100" cy="158" r="10" fill="#38BDF8" />
                <circle cx="100" cy="158" r="5" fill="#FFFFFF" />
              </svg>
            </div>
          </div>

          {/* Center Chat Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-sky-600">
                YOUR AI INVESTMENT ASSISTANT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight mt-1">
                Ask. Explore. Invest.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Get personalized investment suggestions, compare options and make informed decisions — all with the power of smart technology.
              </p>
            </div>

            {/* Chat Input Bar */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Ask me anything about investments..."
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && chatQuery.trim() && handleAskAI(chatQuery)}
                className="w-full bg-white border border-slate-300 rounded-full py-3.5 pl-5 pr-14 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 shadow-sm"
              />
              <button
                onClick={() => chatQuery.trim() && handleAskAI(chatQuery)}
                className="absolute right-2 w-9 h-9 rounded-full bg-sky-600 hover:bg-sky-700 flex items-center justify-center text-white transition-transform active:scale-95 shadow-md shadow-sky-500/30"
                aria-label="Send query"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Best bonds for 2 years',
                'Compare mutual funds vs bonds',
                'Which unlisted shares are good?',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleAskAI(chip)}
                  className="text-[11px] px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-400 transition-colors shadow-sm"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* AI Response Display */}
            {(isTyping || chatResponse) && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-white border border-sky-200 text-xs text-slate-700 leading-relaxed shadow-sm"
              >
                {isTyping ? (
                  <div className="flex items-center gap-2 text-sky-600 font-medium">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing Indian debt & unlisted markets...</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-1.5 text-sky-600 font-semibold mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>MoneyVerse AI Insight:</span>
                    </div>
                    <p>{chatResponse}</p>
                    <div className="mt-2 text-[10px] text-slate-400 border-t border-slate-100 pt-1">
                      Educational purpose only. Not personal financial advice.
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Right Insights Card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Get Smart Insights</h4>
                </div>
                <button
                  onClick={() => navigate('/ai-assistant')}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                  aria-label="Full AI assistant"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  <span>Compare returns & risk</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  <span>Understand tax benefits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  <span>Plan your portfolio</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  <span>Get market updates</span>
                </li>
              </ul>

              {/* Mini glowing line chart SVG */}
              <div className="h-16 w-full pt-2">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="miniChartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 45 C 30 50, 60 20, 90 35 C 120 48, 150 15, 180 25 C 210 32, 230 10, 240 8 L 240 60 L 0 60 Z"
                    fill="url(#miniChartGrad)"
                  />
                  <path
                    d="M0 45 C 30 50, 60 20, 90 35 C 120 48, 150 15, 180 25 C 210 32, 230 10, 240 8"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2.5"
                  />
                  <circle cx="240" cy="8" r="4" fill="#FFEAA0" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TOP INVESTMENT PICKS (Image 4 - Clean White Background) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-sky-600 mb-2 block">
              FEATURED OPPORTUNITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Top Investment Picks
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Handpicked opportunities with attractive yields, strong credit ratings and clear terms.
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => navigate('/investments')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-end bg-white border-slate-200 text-slate-800 hover:border-sky-500 hover:text-sky-600 shadow-sm"
          >
            View All Opportunities
          </Button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pick 1: HDFC Bank NCD */}
          <Card hoverEffect className="p-5 flex flex-col justify-between space-y-4 bg-white border border-slate-200 shadow-sm hover:shadow-xl rounded-2xl transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                  <img
                    src="/logos/hdfc.svg"
                    alt="HDFC Bank"
                    className="w-full h-full object-contain"
                  />
                </div>
                <Badge variant="bonds" size="xs">
                  Bonds
                </Badge>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">HDFC Bank NCD</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">3 Years | Rated AAA</p>
              </div>

              <div className="pt-2">
                <p className="text-2xl font-extrabold font-heading text-sky-600 tracking-tight">
                  9.25% <span className="text-sm font-semibold">p.a.</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Min. Investment <span className="text-slate-900 font-medium">₹ 1,00,000</span>
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/investments/inv-hdfc-ncd')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full text-xs justify-between bg-slate-50 hover:bg-sky-50 text-slate-800 hover:text-sky-600 border border-slate-200 hover:border-sky-300 font-semibold"
            >
              View Details
            </Button>
          </Card>

          {featuredUnlistedInvestments.map((investment) => (
            <Card
              key={investment.id}
              hoverEffect
              className="p-5 flex flex-col justify-between space-y-4 bg-white border border-slate-200 shadow-sm hover:shadow-xl rounded-2xl transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                    <img
                      src={investment.logoUrl}
                      alt={investment.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Badge variant="unlisted" size="xs">
                    Unlisted Shares
                  </Badge>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900">{investment.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {investment.tenure} | {investment.rating}
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-2xl font-extrabold font-heading text-sky-600 tracking-tight">
                    {investment.yieldRate} <span className="text-sm font-semibold">/ Share</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Min. Investment{' '}
                    <span className="text-slate-900 font-medium">{formatINR(investment.minInvestment)}</span>
                  </p>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/investments/${investment.id}`)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="w-full text-xs justify-between bg-slate-50 hover:bg-sky-50 text-slate-800 hover:text-sky-600 border border-slate-200 hover:border-sky-300 font-semibold"
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CTA BANNER (With Unsplash Analytics Dashboard Background) */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Background Image: User Requested Analytics Dashboard */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D')`,
            }}
          />

          {/* Deep Contrast Overlay so the Analytics Image is clearly visible while text is 100% crisp */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(10, 20, 45, 0.92) 0%, rgba(12, 28, 64, 0.84) 45%, rgba(15, 23, 42, 0.68) 100%)',
            }}
          />

          {/* Top subtle cyan accent line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500" />

          {/* Banner Content */}
          <div className="relative z-10 px-6 sm:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-extrabold text-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
                <span className="text-white tracking-wider">YOUR WEALTH. OUR PRIORITY.</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-white tracking-tight">
                Start Your Investment Journey Today
              </h2>
              <p className="text-sm sm:text-base text-white font-medium leading-relaxed max-w-xl drop-shadow-sm">
                Access curated opportunities, expert insights and smart tools — all in one platform.
              </p>
            </div>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/auth/register')}
              rightIcon={<ArrowRight className="w-5 h-5 text-sky-600" />}
              className="bg-white hover:bg-sky-50 text-slate-900 hover:text-sky-600 font-extrabold text-base px-8 py-4 whitespace-nowrap shadow-2xl border-none transition-all hover:scale-105"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
