import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Building2,
  FileText,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Phone,
  Sparkles,
  Check,
  X,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { formatINR } from '../../utils/formatters';
import toast from 'react-hot-toast';
import { useAdminStore } from '../../store/adminStore';

export interface DrhpCompany {
  id: string;
  slug: string;
  name: string;
  sector: string;
  categoryFilter: string;
  price: number;
  priceDisplay: string;
  statusDate: string;
  lotSize: number;
  logoUrl?: string;
  logoInitials: string;
  description: string;
  highlights: string[];
}

export const DRHP_COMPANIES_DATA: DrhpCompany[] = [
  {
    id: 'inox-air-products-limited',
    slug: 'inox-air-products-limited',
    name: 'Inox Air Products Limited',
    sector: 'Manufacturing & Engineering',
    categoryFilter: 'Manufacturing & Metals',
    price: 0,
    priceDisplay: '₹ 0',
    statusDate: 'DRHP · 30 Sep 2026',
    lotSize: 1000,
    logoUrl: undefined,
    logoInitials: 'IA',
    description: "India's largest manufacturer of industrial and medical gases, serving critical sectors including healthcare, steel, pharmaceuticals, and manufacturing.",
    highlights: [
      'Largest industrial & medical gases manufacturer in India',
      'SEBI DRHP submitted for proposed mainboard listing',
      'Indicative pre-IPO share price: ₹ 0',
      'Direct Demat credit via NSDL & CDSL'
    ]
  },
  {
    id: 'soleos-energy-share-price-buy-sell-online',
    slug: 'soleos-energy-share-price-buy-sell-online',
    name: 'Soleos Energy Private Limited',
    sector: 'Renewable Energy',
    categoryFilter: 'Energy & Renewables',
    price: 0,
    priceDisplay: '₹ 0',
    statusDate: 'DRHP · 30 Sep 2026',
    lotSize: 1000,
    logoUrl: '/drhp-logos/soleos-energy-share-price-buy-sell-online.webp',
    logoInitials: 'SE',
    description: 'Rapidly expanding solar engineering, procurement, and construction (EPC) solutions provider executing commercial and utility solar power installations.',
    highlights: [
      'Comprehensive EPC portfolio across rooftop & ground solar',
      'Filed Draft Red Herring Prospectus (DRHP) with SEBI',
      'Indicative pre-IPO share price: ₹ 0',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'inox-clean-energy-limited',
    slug: 'inox-clean-energy-limited',
    name: 'Inox Clean Energy Limited',
    sector: 'Renewable Energy',
    categoryFilter: 'Energy & Renewables',
    price: 775,
    priceDisplay: '₹ 775',
    statusDate: 'DRHP · 29 Sep 2026',
    lotSize: 100,
    logoUrl: '/drhp-logos/inox-clean-energy-limited.webp',
    logoInitials: 'IC',
    description: 'Clean energy venture of the Inox Group focusing on wind and solar power generation, hybrid energy parks, and green power evacuation infrastructure.',
    highlights: [
      'High-growth renewable arm of prestigious Inox Conglomerate',
      'Indicative pre-IPO share price: ₹ 775 / Share',
      'DRHP filed with SEBI for upcoming mainboard IPO',
      'Minimum trading lot: 100 shares'
    ]
  },
  {
    id: 'india-exposition-mart-ltd-unlisted-share',
    slug: 'india-exposition-mart-ltd-unlisted-share',
    name: 'India Exposition Mart Ltd Unlisted Share',
    sector: 'Real Estate',
    categoryFilter: 'Infrastructure & Realty',
    price: 138,
    priceDisplay: '₹ 138',
    statusDate: 'DRHP · 17 Aug 2026',
    lotSize: 500,
    logoUrl: '/drhp-logos/india-exposition-mart-ltd-unlisted-share.webp',
    logoInitials: 'IE',
    description: "One of India's largest integrated exhibitions and conventions venues located in Greater Noida, hosting premier global trade summits, auto expos, and fairs.",
    highlights: [
      'Monopoly integrated MICE (Meetings, Incentives, Conferences, Exhibitions) venue',
      'Indicative pre-IPO share price: ₹ 138 / Share',
      'Consistent operating profitability and high dividend yields',
      'Minimum lot size: 500 shares'
    ]
  },
  {
    id: 'muthoot-fincorp-limited',
    slug: 'muthoot-fincorp-limited',
    name: 'Muthoot Fincorp Limited',
    sector: 'Financial Services',
    categoryFilter: 'Finance & FinTech',
    price: 238,
    priceDisplay: '₹ 238',
    statusDate: 'DRHP · 12 Aug 2026',
    lotSize: 250,
    logoUrl: undefined,
    logoInitials: 'MF',
    description: 'Flagship company of the Muthoot Pappachan Group (Blue Muthoot), providing gold loans, MSME finance, housing loans, and retail financial products across 3,600+ branches.',
    highlights: [
      'Flagship NBFC of Muthoot Pappachan Group with 3,600+ branches',
      'Indicative pre-IPO share price: ₹ 238 / Share',
      'AUM exceeding ₹ 30,000 Crores with high RoA/RoE',
      'CRISIL / ICRA AA credit rated institution'
    ]
  },
  {
    id: 'yogiji-digi-limited',
    slug: 'yogiji-digi-limited',
    name: 'YOGIJI DIGI LIMITED',
    sector: 'Manufacturing & Engineering',
    categoryFilter: 'Manufacturing & Metals',
    price: 288,
    priceDisplay: '₹ 288',
    statusDate: 'DRHP · 20 Jul 2026',
    lotSize: 1000,
    logoUrl: undefined,
    logoInitials: 'YD',
    description: 'Manufacturer of customized equipment and processing lines for metal, tube, and steel processing industries with advanced precision engineering facilities.',
    highlights: [
      'High-tech custom metal engineering and automation lines',
      'Indicative pre-IPO share price: ₹ 288 / Share',
      'DRHP submitted for public equity listing',
      'Minimum trading lot: 1000 shares'
    ]
  },
  {
    id: 'indian-gas-exchange-share-price-buy-sell-online',
    slug: 'indian-gas-exchange-share-price-buy-sell-online',
    name: 'Indian Gas Exchange Limited',
    sector: 'Capital Markets',
    categoryFilter: 'Finance & FinTech',
    price: 475,
    priceDisplay: '₹ 475',
    statusDate: 'DRHP · 14 Jul 2026',
    lotSize: 250,
    logoUrl: '/drhp-logos/indian-gas-exchange-share-price-buy-sell-online.webp',
    logoInitials: 'IG',
    description: "India's first automated national-level gas exchange authorized by the Petroleum and Natural Gas Regulatory Board (PNGRB), backed by IEX, GAIL, and ONGC.",
    highlights: [
      'Monopoly spot gas exchange platform in India',
      'Backed by blue-chip energy giants: IEX, GAIL, ONGC, IOCL',
      'Indicative pre-IPO share price: ₹ 475 / Share',
      'Asset-light technology exchange model with 70%+ EBITDA margins'
    ]
  },
  {
    id: 'renfra-energy-india-share-price-buy-sell-online',
    slug: 'renfra-energy-india-share-price-buy-sell-online',
    name: 'Renfra Energy India Limited',
    sector: 'Renewable Energy',
    categoryFilter: 'Energy & Renewables',
    price: 122,
    priceDisplay: '₹ 122',
    statusDate: 'DRHP · 30 Jun 2026',
    lotSize: 1000,
    logoUrl: '/drhp-logos/renfra-energy-india-share-price-buy-sell-online.webp',
    logoInitials: 'RE',
    description: 'Green power infrastructure development company focusing on distributed solar generation, battery energy storage systems (BESS), and green microgrids.',
    highlights: [
      'Expanding portfolio of clean power and microgrid contracts',
      'Indicative pre-IPO share price: ₹ 122 / Share',
      'SEBI DRHP document filed for IPO approval',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'oravel-stays-limited-oyo-unlisted-shares',
    slug: 'oravel-stays-limited-oyo-unlisted-shares',
    name: 'ORAVEL STAYS LIMITED (Oyo Unlisted Shares)',
    sector: 'Hospitality & Tourism',
    categoryFilter: 'Tech & Consumer',
    price: 22.5,
    priceDisplay: '₹ 22.5',
    statusDate: 'DRHP · 29 Jun 2026',
    lotSize: 1000,
    logoUrl: '/drhp-logos/oravel-stays-limited-oyo-unlisted-shares.webp',
    logoInitials: 'OY',
    description: 'Global travel technology platform and budget hospitality chain operating thousands of hotels and storefronts across India, Southeast Asia, US, and Europe.',
    highlights: [
      'Turned PAT profitable with consecutive positive earnings',
      'Indicative pre-IPO share price: ₹ 22.5 / Share',
      'Backed by SoftBank Vision Fund, Lightspeed, Peak XV',
      'Refiled updated DRHP with audited financial growth'
    ]
  },
  {
    id: 'zepto-share-price-buy-sell-unlisted-shares',
    slug: 'zepto-share-price-buy-sell-unlisted-shares',
    name: 'Zepto Unlisted Shares (Equity)',
    sector: 'E-Commerce & Internet',
    categoryFilter: 'Tech & Consumer',
    price: 29,
    priceDisplay: '₹ 29',
    statusDate: 'DRHP · 08 Jun 2026',
    lotSize: 1000,
    logoUrl: '/drhp-logos/zepto-share-price-buy-sell-unlisted-shares.webp',
    logoInitials: 'ZP',
    description: "India's fastest-growing quick-commerce unicorn delivering grocery, fresh produce, and consumer electronics within 10 minutes via network of 450+ dark stores.",
    highlights: [
      'Valuation surging past $5 Billion with top global institutional funds',
      'Indicative pre-IPO share price: ₹ 29 / Share',
      'Over 75% of dark stores generating positive store EBITDA',
      'Reverse-flipped corporate headquarters to India'
    ]
  },
  {
    id: 'arohan-financial-services-unlisted-shares',
    slug: 'arohan-financial-services-unlisted-shares',
    name: 'Arohan Financial Services Unlisted Shares',
    sector: 'NBFC',
    categoryFilter: 'Finance & FinTech',
    price: 228,
    priceDisplay: '₹ 228',
    statusDate: 'DRHP · 15 May 2026',
    lotSize: 250,
    logoUrl: '/drhp-logos/arohan-financial-services-unlisted-shares.webp',
    logoInitials: 'AF',
    description: 'Leading NBFC-MFI part of the Aavishkaar Group, empowering low-income households and micro-enterprises with credit access across underserved Indian states.',
    highlights: [
      'Part of Aavishkaar-Intellecap Group with solid impact pedigree',
      'Indicative pre-IPO share price: ₹ 228 / Share',
      'AUM crossing ₹ 6,000+ Crores across 17 states',
      'Credit ratings backed by CRISIL & CARE'
    ]
  },
  {
    id: 'incred-holdings-limited-unlisted-shares',
    slug: 'incred-holdings-limited-unlisted-shares',
    name: 'Incred Holdings Limited Unlisted Shares',
    sector: 'NBFC',
    categoryFilter: 'Finance & FinTech',
    price: 148,
    priceDisplay: '₹ 148',
    statusDate: 'DRHP · 06 May 2026',
    lotSize: 500,
    logoUrl: '/drhp-logos/incred-holdings-limited-unlisted-shares.webp',
    logoInitials: 'IH',
    description: 'Diversified tech-led financial services conglomerate operating InCred Finance (retail & MSME lending), InCred Capital (wealth & investment banking), and InCred AMC.',
    highlights: [
      'Unicorn financial institution backed by marquee family offices',
      'Indicative pre-IPO share price: ₹ 148 / Share',
      'Exceptional asset quality with GNPA below 1.5%',
      'Full spectrum of wealth management and institutional advisory'
    ]
  },
  {
    id: 'sadbhav-futuretech-limited',
    slug: 'sadbhav-futuretech-limited',
    name: 'Sadbhav Futuretech Limited',
    sector: 'Energy & Power',
    categoryFilter: 'Energy & Renewables',
    price: 108,
    priceDisplay: '₹ 108',
    statusDate: 'DRHP · 31 Mar 2026',
    lotSize: 1000,
    logoUrl: undefined,
    logoInitials: 'SF',
    description: 'Specialized energy infrastructure developer executing substation engineering, high-voltage transmission lines, and green energy grid integration projects.',
    highlights: [
      'Dedicated power infrastructure and transmission developer',
      'Indicative pre-IPO share price: ₹ 108 / Share',
      'DRHP filed with SEBI for equity capital raising',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'absolute-projects-india-limited',
    slug: 'absolute-projects-india-limited',
    name: 'Absolute Projects (India) Limited',
    sector: 'Energy & Power',
    categoryFilter: 'Energy & Renewables',
    price: 80,
    priceDisplay: '₹ 80',
    statusDate: 'DRHP · 30 Mar 2026',
    lotSize: 1000,
    logoUrl: '/drhp-logos/absolute-projects-india-limited.webp',
    logoInitials: 'AP',
    description: 'Engineering and power solutions company engaged in turnkey electrical installations, transformer distribution, and industrial solar integration.',
    highlights: [
      'Turnkey electrical EPC and industrial engineering contracts',
      'Indicative pre-IPO share price: ₹ 80 / Share',
      'Draft Red Herring Prospectus submitted to SEBI',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'cosmic-pv-power-limited',
    slug: 'cosmic-pv-power-limited',
    name: 'Cosmic PV Power Limited',
    sector: 'Energy & Power',
    categoryFilter: 'Energy & Renewables',
    price: 188,
    priceDisplay: '₹ 188',
    statusDate: 'DRHP · 30 Mar 2026',
    lotSize: 1000,
    logoUrl: undefined,
    logoInitials: 'CP',
    description: 'Solar PV module manufacturing firm deploying high-efficiency mono-crystalline and bifacial modules certified under ALMM guidelines for Indian utility projects.',
    highlights: [
      'ALMM certified solar module manufacturer',
      'Indicative pre-IPO share price: ₹ 188 / Share',
      'High order visibility under government solar expansion schemes',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'rkb-global-limited',
    slug: 'rkb-global-limited',
    name: 'RKB Global Limited',
    sector: 'Metals & Mining',
    categoryFilter: 'Manufacturing & Metals',
    price: 125,
    priceDisplay: '₹ 125',
    statusDate: 'DRHP · 20 Mar 2026',
    lotSize: 500,
    logoUrl: '/drhp-logos/rkb-global-limited.webp',
    logoInitials: 'RK',
    description: 'Processor and distributor of specialty metal alloys, non-ferrous raw materials, and precision industrial engineering inputs for automotive and defense sectors.',
    highlights: [
      'Specialty alloy processing and global metals distribution',
      'Indicative pre-IPO share price: ₹ 125 / Share',
      'SEBI DRHP document submitted for mainboard issue',
      'Minimum lot size: 500 shares'
    ]
  },
  {
    id: 'shreni-shares-limited',
    slug: 'shreni-shares-limited',
    name: 'Shreni Shares Limited',
    sector: 'Financial Services',
    categoryFilter: 'Finance & FinTech',
    price: 138,
    priceDisplay: '₹ 138',
    statusDate: 'DRHP · 04 Mar 2026',
    lotSize: 1000,
    logoUrl: undefined,
    logoInitials: 'SS',
    description: 'SEBI-registered merchant banker and stockbroker with strong expertise in SME IPO underwriting, retail equity brokerage, and financial advisory services.',
    highlights: [
      'Top-tier lead manager in Indian SME & Mainboard IPOs',
      'Indicative pre-IPO share price: ₹ 138 / Share',
      'Consistent fee income and growing underwriting pipeline',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'madhur-iron-and-steel-shares-price-buy-sell-online',
    slug: 'madhur-iron-and-steel-shares-price-buy-sell-online',
    name: 'Madhur Iron and Steel (India)',
    sector: 'Metals & Mining',
    categoryFilter: 'Manufacturing & Metals',
    price: 146,
    priceDisplay: '₹ 146',
    statusDate: 'DRHP · 23 Jan 2026',
    lotSize: 1000,
    logoUrl: '/drhp-logos/madhur-iron-and-steel-shares-price-buy-sell-online.webp',
    logoInitials: 'MI',
    description: 'Integrated steel manufacturing plant producing sponge iron, billets, and TMT re-bars for residential, industrial, and infrastructure construction.',
    highlights: [
      'Integrated secondary steel manufacturing capacity',
      'Indicative pre-IPO share price: ₹ 146 / Share',
      'Benefiting from domestic infrastructure and housing demand',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'phonepe-limited-share-price-buy-sell-online',
    slug: 'phonepe-limited-share-price-buy-sell-online',
    name: 'PhonePe Limited',
    sector: 'Fintech',
    categoryFilter: 'Finance & FinTech',
    price: 0,
    priceDisplay: '₹ 0',
    statusDate: 'DRHP · 21 Jan 2026',
    lotSize: 0,
    logoUrl: '/drhp-logos/phonepe-limited-share-price-buy-sell-online.webp',
    logoInitials: 'PP',
    description: "India's #1 digital payments company commanding over 48% UPI transaction market share, expanding into insurance broking, mutual funds, and POS devices.",
    highlights: [
      '#1 Market leader with 48%+ share in Indian UPI payments',
      'Over 550+ Million registered users nationwide',
      'Indicative pre-IPO share price: ₹ 0 (Private allotment)',
      'Backed by Walmart, General Atlantic, Tiger Global'
    ]
  },
  {
    id: 'hero-fincorp-limited-share-price-buy-sell-unlisted-shares-of-hero-fincorp',
    slug: 'hero-fincorp-limited-share-price-buy-sell-unlisted-shares-of-hero-fincorp',
    name: 'Hero Fincorp Limited Unlisted Shares',
    sector: 'NBFC',
    categoryFilter: 'Finance & FinTech',
    price: 925,
    priceDisplay: '₹ 925',
    statusDate: 'DRHP · 28 Nov 2025',
    lotSize: 50,
    logoUrl: '/drhp-logos/hero-fincorp-limited-share-price-buy-sell-unlisted-shares-of-hero-fincorp.webp',
    logoInitials: 'HF',
    description: 'Diversified NBFC arm of Hero MotoCorp group, financing two-wheelers, SME working capital, and retail loan products with AUM exceeding ₹ 51,000 Crores.',
    highlights: [
      'AUM exceeding ₹ 51,000 Crores with strong RoA/RoE',
      'Hero MotoCorp holds ~40% parent backing',
      'Indicative pre-IPO share price: ₹ 925 / Share',
      'CRISIL / ICRA AA+ credit rated'
    ]
  },
  {
    id: 'boat-unlisted-share-imagine-marketing',
    slug: 'boat-unlisted-share-imagine-marketing',
    name: 'Boat Unlisted Share (Imagine Marketing)',
    sector: 'Consumer Goods & Services',
    categoryFilter: 'Tech & Consumer',
    price: 785,
    priceDisplay: '₹ 785',
    statusDate: 'DRHP · 28 Oct 2025',
    lotSize: 100,
    logoUrl: '/drhp-logos/boat-unlisted-share-imagine-marketing.webp',
    logoInitials: 'BT',
    description: "India's leading consumer audio and smart wearable brand commanding over 35% domestic market share in TWS ear-buds and wireless smart accessories.",
    highlights: [
      '#1 Personal audio and wearable electronics brand in India',
      'Indicative pre-IPO share price: ₹ 785 / Share',
      'Backed by Warburg Pincus, Qualcomm Ventures, Malabar Inv',
      'Over 75% manufacturing localized in India'
    ]
  },
  {
    id: 'bvg-india-limited-unlisted-share',
    slug: 'bvg-india-limited-unlisted-share',
    name: 'BVG India Limited Unlisted Share',
    sector: 'Diversified',
    categoryFilter: 'Other Sectors',
    price: 475,
    priceDisplay: '₹ 475',
    statusDate: 'DRHP · 30 Sep 2025',
    lotSize: 100,
    logoUrl: '/drhp-logos/bvg-india-limited-unlisted-share.webp',
    logoInitials: 'BV',
    description: "India's largest integrated facilities management company managing maintenance for Rashtrapati Bhavan, Parliament House, Indian Railways, and Fortune 500 plants.",
    highlights: [
      'Trusted facilities management for premier Indian institutions',
      'Indicative pre-IPO share price: ₹ 475 / Share',
      'Workforce exceeding 75,000+ professionals nationwide',
      'Minimum lot size: 100 shares'
    ]
  },
  {
    id: 'segmental-infrastructure-development-share-price-buy-sell-online',
    slug: 'segmental-infrastructure-development-share-price-buy-sell-online',
    name: 'Segmental Infrastructure Development Limited',
    sector: 'Construction & Infrastructure',
    categoryFilter: 'Infrastructure & Realty',
    price: 168,
    priceDisplay: '₹ 168',
    statusDate: 'DRHP · 29 Sep 2025',
    lotSize: 500,
    logoUrl: '/drhp-logos/segmental-infrastructure-development-share-price-buy-sell-online.webp',
    logoInitials: 'SI',
    description: 'EPC contractor specializing in precast segmental bridge construction, metro rail viaducts, and high-speed expressway structures.',
    highlights: [
      'Specialized engineering in precast bridge and viaduct systems',
      'Indicative pre-IPO share price: ₹ 168 / Share',
      'Healthy order book from NHAI and Metro Rail corporations',
      'Minimum lot size: 500 shares'
    ]
  },
  {
    id: 'shivchem-agro-share-price-buy-sell-online',
    slug: 'shivchem-agro-share-price-buy-sell-online',
    name: 'Shivchem Agro Limited',
    sector: 'Agriculture & Agro-Chemicals',
    categoryFilter: 'Other Sectors',
    price: 62,
    priceDisplay: '₹ 62',
    statusDate: 'DRHP · 29 Sep 2025',
    lotSize: 1600,
    logoUrl: '/drhp-logos/shivchem-agro-share-price-buy-sell-online.webp',
    logoInitials: 'SA',
    description: 'Manufacturer of crop protection chemicals, organic fertilizers, and agrochemical formulations catering to farming communities across Western & Central India.',
    highlights: [
      'Formulations catering to crop protection and yield improvement',
      'Indicative pre-IPO share price: ₹ 62 / Share',
      'Affordable ticket price for retail and HNI investors',
      'Minimum lot size: 1600 shares'
    ]
  },
  {
    id: 'sterlite-electric-limited-formerly-sterlite-power-unlisted-shares',
    slug: 'sterlite-electric-limited-formerly-sterlite-power-unlisted-shares',
    name: 'Sterlite Electric Limited Unlisted Shares',
    sector: 'Energy & Power',
    categoryFilter: 'Energy & Renewables',
    price: 515,
    priceDisplay: '₹ 515',
    statusDate: 'DRHP · 29 Sep 2025',
    lotSize: 100,
    logoUrl: '/drhp-logos/sterlite-electric-limited-formerly-sterlite-power-unlisted-shares.webp',
    logoInitials: 'SE',
    description: 'Leading global developer of power transmission infrastructure and high-performance power conductors, formerly known as Sterlite Power Transmission Limited.',
    highlights: [
      'Global power grid developer with projects across India and Brazil',
      'Indicative pre-IPO share price: ₹ 515 / Share',
      'High-performance OPGW and power conductor innovator',
      'Minimum lot size: 100 shares'
    ]
  },
  {
    id: 'jainam-broking-share-price-buy-sell-online',
    slug: 'jainam-broking-share-price-buy-sell-online',
    name: 'Jainam Broking Limited',
    sector: 'Capital Markets',
    categoryFilter: 'Finance & FinTech',
    price: 208,
    priceDisplay: '₹ 208',
    statusDate: 'DRHP · 27 Sep 2025',
    lotSize: 1000,
    logoUrl: '/drhp-logos/jainam-broking-share-price-buy-sell-online.webp',
    logoInitials: 'JB',
    description: 'Fast-growing retail and institutional brokerage house offering equity trading, commodities, algorithmic trading tools, and depository services.',
    highlights: [
      'Over 2.5 Lakh active retail and algorithmic trading clients',
      'Indicative pre-IPO share price: ₹ 208 / Share',
      'High operating margins and debt-free balance sheet',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'transline-technologies-share-price-buy-sell-online',
    slug: 'transline-technologies-share-price-buy-sell-online',
    name: 'Transline Technologies Limited',
    sector: 'Technology',
    categoryFilter: 'Tech & Consumer',
    price: 165,
    priceDisplay: '₹ 165',
    statusDate: 'DRHP · 07 Aug 2025',
    lotSize: 1000,
    logoUrl: '/drhp-logos/transline-technologies-share-price-buy-sell-online.webp',
    logoInitials: 'TT',
    description: 'System integrator and IT infrastructure company executing smart city solutions, automated toll collection systems, and government digital surveillance networks.',
    highlights: [
      'Pioneer in Intelligent Traffic Management and FASTag systems',
      'Indicative pre-IPO share price: ₹ 165 / Share',
      'DRHP submitted for capital expansion in automated AI systems',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'rite-water-solutions-india-limited',
    slug: 'rite-water-solutions-india-limited',
    name: 'Rite Water Solutions (India) Limited',
    sector: 'Construction & Infrastructure',
    categoryFilter: 'Infrastructure & Realty',
    price: 465,
    priceDisplay: '₹ 465',
    statusDate: 'DRHP · 13 Feb 2025',
    lotSize: 1000,
    logoUrl: undefined,
    logoInitials: 'RW',
    description: 'Water purification and community water treatment technology provider delivering clean drinking water installations under the Jal Jeevan Mission.',
    highlights: [
      'Key technology partner for Jal Jeevan Mission projects',
      'Indicative pre-IPO share price: ₹ 465 / Share',
      'Proprietary solar-powered water purification plants',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'veeda-clinical-research-unlisted-shares-buy-sell-online',
    slug: 'veeda-clinical-research-unlisted-shares-buy-sell-online',
    name: 'Veeda Clinical Research Limited',
    sector: 'Healthcare & Pharmaceuticals',
    categoryFilter: 'Other Sectors',
    price: 428,
    priceDisplay: '₹ 428',
    statusDate: 'DRHP · 31 Jan 2025',
    lotSize: 100,
    logoUrl: '/drhp-logos/veeda-clinical-research-unlisted-shares-buy-sell-online.webp',
    logoInitials: 'VC',
    description: 'Leading independent full-service clinical research organization (CRO) conducting bio-availability/bio-equivalence studies for global pharmaceutical giants.',
    highlights: [
      'USFDA, DCGI, and WHO audited clinical trial facilities',
      'Indicative pre-IPO share price: ₹ 428 / Share',
      'Client base covering top generic pharmaceutical innovators globally',
      'Minimum lot size: 100 shares'
    ]
  },
  {
    id: 'vyara-tiles-limited',
    slug: 'vyara-tiles-limited',
    name: 'Vyara Tiles Limited',
    sector: 'Construction & Infrastructure',
    categoryFilter: 'Infrastructure & Realty',
    price: 0,
    priceDisplay: '₹ 0',
    statusDate: 'DRHP · 31 Dec 2024',
    lotSize: 1000,
    logoUrl: '/drhp-logos/vyara-tiles-limited.webp',
    logoInitials: 'VT',
    description: 'Manufacturer of high-performance precast concrete paving blocks, terrazzo tiles, and heavy-duty industrial exterior surfacing solutions.',
    highlights: [
      'Leader in heavy-duty paver blocks and urban streetscapes',
      'Indicative pre-IPO share price: ₹ 0 (Private placement)',
      'Supplying major airports, port terminals, and smart cities',
      'Minimum lot size: 1000 shares'
    ]
  },
  {
    id: 'garuda-aerospace-share-price-buy-sell-online',
    slug: 'garuda-aerospace-share-price-buy-sell-online',
    name: 'Garuda Aerospace Limited',
    sector: 'Defence',
    categoryFilter: 'Other Sectors',
    price: 428,
    priceDisplay: '₹ 428',
    statusDate: 'DRHP · 24 May 2024',
    lotSize: 100,
    logoUrl: '/drhp-logos/garuda-aerospace-share-price-buy-sell-online.webp',
    logoInitials: 'GA',
    description: "India's premier drone manufacturer backed by MS Dhoni, designing agricultural spraying drones, defense reconnaissance UAVs, and industrial surveillance systems.",
    highlights: [
      "India's leading drone technology OEM brand ambassador MS Dhoni",
      'DGCA approved dual certification for agricultural and defense drones',
      'Indicative pre-IPO share price: ₹ 428 / Share',
      'Minimum lot size: 100 shares'
    ]
  },
  {
    id: 'razorpay-software-share-price-buy-sell-online',
    slug: 'razorpay-software-share-price-buy-sell-online',
    name: 'Razorpay Software Limited',
    sector: 'Fintech',
    categoryFilter: 'Finance & FinTech',
    price: 0,
    priceDisplay: '₹ 0',
    statusDate: 'DRHP · In Review',
    lotSize: 50,
    logoUrl: '/drhp-logos/razorpay-software-share-price-buy-sell-online.webp',
    logoInitials: 'RZ',
    description: 'Full-stack financial services and payments gateway powerhouse powering payments for millions of businesses, e-commerce stores, and unicorns across India.',
    highlights: [
      'Market leader in payment gateway infrastructure with $150B+ TPV',
      'Indicative pre-IPO share price: ₹ 0 (Pre-IPO allocation stage)',
      'Backed by GIC, Tiger Global, Sequoia Capital, Lone Pine',
      'Reverse flipping to India for benchmark domestic listing'
    ]
  }
];

export const DrhpFiledPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const { getPrice, getPdf, customProducts, isItemDeleted, deletedProductIds } = useAdminStore();

  // Modals state
  const [selectedCompanyForDetails, setSelectedCompanyForDetails] = useState<DrhpCompany | null>(null);
  const [selectedCompanyForInquiry, setSelectedCompanyForInquiry] = useState<DrhpCompany | null>(null);

  // Inquiry Form state
  const [investorName, setInvestorName] = useState('');
  const [investorMobile, setInvestorMobile] = useState('');
  const [investorPan, setInvestorPan] = useState('');
  const [desiredShares, setDesiredShares] = useState(100);
  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);

  // Combine default DRHP companies with any custom DRHP items created by Admin
  // and dynamically apply custom admin prices (and filter out deleted items)
  const allDrhpItems = useMemo(() => {
    const list: DrhpCompany[] = DRHP_COMPANIES_DATA.filter((c) => !isItemDeleted(c.id, c.name)).map((c) => {
      const livePrice = getPrice(c.id, c.price);
      return {
        ...c,
        price: livePrice > 0 ? livePrice : c.price,
        priceDisplay: livePrice > 0 ? `₹ ${livePrice.toLocaleString('en-IN')}` : c.priceDisplay,
      };
    });

    customProducts
      .filter((cp) => cp.category === 'DRHP-Filed' && !isItemDeleted(cp.id, cp.title))
      .forEach((cp) => {
        const livePrice = getPrice(cp.id, cp.price);
        list.unshift({
          id: cp.id,
          slug: cp.id,
          name: cp.title,
          sector: cp.sector || 'Emerging Growth',
          categoryFilter: 'All',
          price: livePrice > 0 ? livePrice : cp.price,
          priceDisplay: livePrice > 0 ? `₹ ${livePrice.toLocaleString('en-IN')}` : `₹ ${cp.price}`,
          statusDate: 'DRHP · Live Offering',
          lotSize: cp.lotSize,
          logoInitials: cp.title.slice(0, 2).toUpperCase(),
          description: cp.description || 'Pre-IPO shares with verified depository credit.',
          highlights: ['SEBI Draft Red Herring Prospectus filed', 'Direct CDSL/NSDL Demat allocation', 'Institutional quality financials'],
        });
      });
    return list;
  }, [customProducts, getPrice, isItemDeleted, deletedProductIds]);

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return allDrhpItems.filter((item) => {
      // Category Filter
      if (selectedCategory !== 'All' && item.categoryFilter !== selectedCategory) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSector = item.sector.toLowerCase().includes(query);
        const matchesDate = item.statusDate.toLowerCase().includes(query);
        if (!matchesName && !matchesSector && !matchesDate) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = getPrice(a.id, a.price);
      const priceB = getPrice(b.id, b.price);
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      return 0;
    });
  }, [allDrhpItems, selectedCategory, searchQuery, sortBy, getPrice]);

  const categories = [
    'All',
    'Energy & Renewables',
    'Finance & FinTech',
    'Tech & Consumer',
    'Manufacturing & Metals',
    'Infrastructure & Realty',
    'Other Sectors'
  ];

  const handleOpenInquiry = (company: DrhpCompany) => {
    setSelectedCompanyForInquiry(company);
    setDesiredShares(company.lotSize || 100);
    setIsInquirySubmitted(false);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInquirySubmitted(true);
    toast.success(`Inquiry sent for ${selectedCompanyForInquiry?.name}! Our private placement desk will contact you.`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar />

      <main className="flex-1 pb-20">
        {/* ========================================================================= */}
        {/* HERO SECTION: DRHP-FILED COMPANIES (Bluish and White Theme) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-8 pb-10 bg-gradient-to-b from-sky-50/70 via-white to-[#F8FAFC] border-b border-slate-200">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Overline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>PRE-IPO & UNLISTED</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
              DRHP-filed{' '}
              <span className="font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700">
                companies
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Companies that have filed their Draft Red Herring Prospectus (DRHP) with SEBI for upcoming IPOs.
              Track indicative prices and verified pre-IPO shares with direct Demat credit.
            </p>

            {/* Quick Stat Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <Building2 className="w-4 h-4 text-sky-600" />
                <span><strong className="text-slate-900">{DRHP_COMPANIES_DATA.length}</strong> DRHP Companies</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span><strong className="text-slate-900">100%</strong> SEBI Public Filings</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span><strong className="text-slate-900">Live</strong> Indicative Quotes</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span><strong className="text-slate-900">100%</strong> Demat Credit (NSDL & CDSL)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE FILTERS & SEARCH CONTROLS */}
        {/* ========================================================================= */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          {/* Search Bar + Sort Dropdown */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by company or sector (e.g. Inox, Zepto, Muthoot, Energy)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-sky-500 transition-all cursor-pointer"
              >
                <option value="default">Default DRHP Sequence</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-sky-50 text-sky-700 border border-sky-300 shadow-xs font-bold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-200 hover:text-sky-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              <b>{filteredCompanies.length}</b> {filteredCompanies.length === 1 ? 'company has' : 'companies have'} filed a DRHP
            </span>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-sky-600 font-semibold hover:underline"
              >
                Reset search
              </button>
            )}
          </div>

          {/* ========================================================================= */}
          {/* EXACT 32 COMPANY CARDS GRID (3 Columns, Bluish & White Theme) */}
          {/* ========================================================================= */}
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {filteredCompanies.map((company) => {
                return (
                  <div
                    key={company.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top Accent Hover Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Card Content Top */}
                    <div className="space-y-4">
                      {/* Logo + Name + Sector Row */}
                      <div className="flex items-start gap-3.5">
                        {company.logoUrl ? (
                          <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white p-1 flex items-center justify-center flex-shrink-0 shadow-2xs overflow-hidden">
                            <img
                              src={company.logoUrl}
                              alt={company.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                // fallback to initials if image fails
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border border-sky-200 bg-gradient-to-tr from-sky-50 to-blue-100/80 text-sky-800 shadow-2xs flex-shrink-0">
                            {company.logoInitials}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                            {company.name}
                          </h3>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{company.sector}</p>
                        </div>
                      </div>

                      {/* Indicative Price & Status Badge */}
                      {(() => {
                        const livePrice = getPrice(company.id, company.price);
                        const displayPrice = livePrice > 0 ? `₹ ${livePrice.toLocaleString('en-IN')}` : company.priceDisplay;
                        const attachedPdf = getPdf(company.id);

                        return (
                          <>
                            <div className="flex items-center justify-between pt-3 pb-1 border-t border-slate-100">
                              <div>
                                <div className="flex items-baseline gap-1">
                                  <span className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900">
                                    {displayPrice}
                                  </span>
                                </div>
                                <span className="text-[11px] text-slate-400 font-medium block">
                                  Indicative Quote
                                </span>
                              </div>

                              {/* Status Badge & PDF Badge */}
                              <div className="text-right space-y-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                                  {company.statusDate}
                                </span>
                                {attachedPdf && (
                                  <div>
                                    <a
                                      href={attachedPdf.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                                    >
                                      <FileText className="w-3 h-3 text-emerald-600" />
                                      <span>Official PDF ({attachedPdf.size})</span>
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Card Actions Bottom (Enquire + Details) */}
                    <div className="flex items-center gap-2.5 pt-4 mt-3 border-t border-slate-100">
                      <button
                        onClick={() => handleOpenInquiry(company)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
                      >
                        <span>Enquire</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedCompanyForDetails(company)}
                        className="py-2.5 px-4 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-700 hover:text-sky-600 font-semibold text-xs transition-all flex items-center justify-center"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No DRHP companies matched “{searchQuery}”</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try a shorter search, or clear the search to view all 32 DRHP filed companies.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 text-xs font-bold text-sky-600 hover:underline"
              >
                Clear the search
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SEBI REGULATORY DISCLAIMER */}
          {/* ========================================================================= */}
          <div className="mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-[11px] leading-relaxed text-center">
            <p>
              <strong>Regulatory Notice:</strong> Investments in unlisted shares and pre-IPO instruments carry credit,
              market, and liquidity risks. DRHP filings are public disclosures submitted by companies to SEBI and stock
              exchanges for regulatory review. Indicative share prices displayed are for educational and informational purposes
              only. MoneyVerse facilitates compliant off-market Demat transfers through licensed depository participants (CDSL & NSDL).
            </p>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: DETAILS MODAL */}
      {/* ========================================================================= */}
      {selectedCompanyForDetails && (
        <Modal
          isOpen={!!selectedCompanyForDetails}
          onClose={() => setSelectedCompanyForDetails(null)}
          title={
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <FileText className="w-5 h-5 text-sky-600" />
              <span>DRHP Details & Particulars</span>
            </div>
          }
          maxWidth="lg"
        >
          <div className="space-y-5 text-slate-800">
            {/* Header info */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                {selectedCompanyForDetails.logoUrl ? (
                  <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white p-1 flex items-center justify-center flex-shrink-0 shadow-2xs overflow-hidden">
                    <img
                      src={selectedCompanyForDetails.logoUrl}
                      alt={selectedCompanyForDetails.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border border-sky-200 bg-gradient-to-tr from-sky-50 to-blue-100 text-sky-800 shadow-2xs flex-shrink-0">
                    {selectedCompanyForDetails.logoInitials}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{selectedCompanyForDetails.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{selectedCompanyForDetails.sector}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-medium block">Indicative Price</span>
                <span className="text-xl font-extrabold text-slate-900">
                  {selectedCompanyForDetails.priceDisplay}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Business Profile</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedCompanyForDetails.description}
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Filing & Trading Specs</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Filing Stage</span>
                  <span className="text-xs font-bold text-sky-600">{selectedCompanyForDetails.statusDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Indicative Price</span>
                  <span className="text-xs font-bold text-slate-900">{selectedCompanyForDetails.priceDisplay}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Min. Lot Size</span>
                  <span className="text-xs font-bold text-slate-900">{selectedCompanyForDetails.lotSize} Shares</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Depository Transfer</span>
                  <span className="text-xs font-bold text-emerald-600">CDSL / NSDL Demat</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Settlement Cycle</span>
                  <span className="text-xs font-bold text-slate-900">T+1 Off-Market</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Verification</span>
                  <span className="text-xs font-bold text-blue-600">SEBI Regulated DP</span>
                </div>
              </div>
            </div>

            {/* Key Investment Highlights */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Highlights</h4>
              <div className="space-y-1.5">
                {selectedCompanyForDetails.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attached Scheme / DRHP PDF Button */}
            {selectedCompanyForDetails && getPdf(selectedCompanyForDetails.id) && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">
                      {getPdf(selectedCompanyForDetails.id)?.title}
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      Official Document Verified · Size: {getPdf(selectedCompanyForDetails.id)?.size}
                    </p>
                  </div>
                </div>
                <a
                  href={getPdf(selectedCompanyForDetails.id)?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Download PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCompanyForDetails(null)}
                className="text-slate-600 hover:text-slate-900"
              >
                Close
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const company = selectedCompanyForDetails;
                  setSelectedCompanyForDetails(null);
                  handleOpenInquiry(company);
                }}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Enquire Now
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: INQUIRY & PRE-IPO ALLOTMENT MODAL */}
      {/* ========================================================================= */}
      {selectedCompanyForInquiry && (
        <Modal
          isOpen={!!selectedCompanyForInquiry}
          onClose={() => setSelectedCompanyForInquiry(null)}
          title={
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Sparkles className="w-5 h-5 text-sky-600" />
              <span>Pre-IPO Allocation Enquiry</span>
            </div>
          }
          maxWidth="md"
        >
          <div className="space-y-5 text-slate-800">
            {!isInquirySubmitted ? (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                {/* Security Brief Strip */}
                <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{selectedCompanyForInquiry.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {selectedCompanyForInquiry.sector} · {selectedCompanyForInquiry.statusDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Price</span>
                    <span className="text-base font-extrabold text-slate-900">
                      {selectedCompanyForInquiry.priceDisplay}
                    </span>
                  </div>
                </div>

                {/* Number of Shares Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <label>Desired Quantity (Min: {selectedCompanyForInquiry.lotSize} Shares)</label>
                    <span className="text-sky-600">
                      Est. Total:{' '}
                      {selectedCompanyForInquiry.price > 0
                        ? formatINR(desiredShares * selectedCompanyForInquiry.price)
                        : 'Price on Private Quote'}
                    </span>
                  </div>
                  <input
                    type="number"
                    min={selectedCompanyForInquiry.lotSize || 100}
                    step={25}
                    value={desiredShares}
                    onChange={(e) => setDesiredShares(Number(e.target.value))}
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 outline-none focus:border-sky-500 shadow-xs"
                  />
                </div>

                {/* Investor details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Investor Name</label>
                    <input
                      type="text"
                      value={investorName}
                      onChange={(e) => setInvestorName(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium outline-none focus:border-sky-500 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Mobile Number</label>
                    <input
                      type="text"
                      value={investorMobile}
                      onChange={(e) => setInvestorMobile(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium outline-none focus:border-sky-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-slate-700">PAN Card Number</label>
                  <input
                    type="text"
                    value={investorPan}
                    onChange={(e) => setInvestorPan(e.target.value.toUpperCase())}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold uppercase tracking-wider outline-none focus:border-sky-500 focus:bg-white"
                  />
                </div>

                {/* Instant WhatsApp Quick Connect Option */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Need instant price lock? Call or WhatsApp our Private Desk:</span>
                  </div>
                  <a
                    href="tel:+918506931757"
                    className="font-bold text-sky-600 hover:underline whitespace-nowrap"
                  >
                    +91-8506931757
                  </a>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCompanyForInquiry(null)}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md shadow-sky-500/20"
                    rightIcon={<Check className="w-4 h-4" />}
                  >
                    Submit Enquiry
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-md shadow-emerald-500/10">
                  <Check className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-heading text-slate-900">Enquiry Received!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
                    Our dedicated private placements relationship manager will contact you within 30 minutes with
                    verified seller escrow details and DIS Demat transfer instructions for{' '}
                    <strong>{selectedCompanyForInquiry.name}</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left max-w-sm mx-auto space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inquiry Reference:</span>
                    <span className="font-mono font-bold text-slate-900">
                      DRHP-INQ-{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Official Desk:</span>
                    <span className="text-sky-600 font-semibold">salesmoneyverse@gmail.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Support Hotline:</span>
                    <span className="text-slate-900 font-bold">+91-8506931757</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setSelectedCompanyForInquiry(null)}
                    className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6"
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
