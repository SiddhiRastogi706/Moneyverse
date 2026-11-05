export type AssetClass = 'Bonds' | 'Mutual Funds' | 'Money Market' | 'Unlisted Shares' | 'Cash / Others';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  investorId: string; // e.g. "MV10023"
  avatar?: string;
  kycStatus: 'NOT_SUBMITTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
  joinedAt: string;
}

export interface StatItem {
  label: string;
  value: string;
  subValue?: string;
  change?: string;
  isPositive?: boolean;
  iconName?: string;
}

export interface PortfolioHolding {
  id: string;
  name: string;
  category: 'Bonds' | 'Mutual Funds' | 'Money Market' | 'Unlisted';
  unitsOrAmount: string; // e.g. "₹ 2,00,000" or "500 Shares"
  currentValue: number;
  returnsPercent: number;
  isPositive: boolean;
  logo: string;
  badgeBg: string;
  logoUrl?: string;
}

export interface MaturityItem {
  id: string;
  name: string;
  amount: number;
  maturityDate: string;
  daysLeft: number;
  badgeColor?: string;
  logoUrl?: string;
}

export interface TransactionItem {
  id: string;
  date: string;
  type: 'Purchase' | 'Interest' | 'Redemption' | 'Dividend';
  instrument: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Processing';
}

export interface RecentDocItem {
  id: string;
  title: string;
  date: string;
  size: string;
  format: 'PDF';
  url: string;
}

export interface InvestmentProduct {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  logoUrl?: string;
  logoBg?: string;
  category: AssetClass;
  yieldRate: string; // e.g. "9.25% p.a." or "Expected Upside 25%+"
  tenure: string; // e.g. "3 Years", "6 Months"
  rating: string; // e.g. "Rated AAA", "Rated A1+", "Private"
  minInvestment: number;
  tag: string; // e.g. "Bonds", "Money Market", "Unlisted Shares"
  description: string;
  payoutFrequency?: string;
  isin?: string;
  depository?: string;
  highlightPoints: string[];
}
