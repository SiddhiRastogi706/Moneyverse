import { create } from 'zustand';
import { User, PortfolioHolding, MaturityItem, TransactionItem, RecentDocItem } from '../types';
import { useAdminStore } from './adminStore';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  unreadNotifications: number;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isGooglePopupOpen: boolean;
  openGooglePopup: () => void;
  closeGooglePopup: () => void;
  login: (email?: string, password?: string) => void;
  loginWithGoogle: (data?: { email?: string; name?: string; avatar?: string }) => void;
  registerWithCredentials: (data: { name: string; usernameOrEmail: string; password?: string }) => void;
  logout: () => void;
  markNotificationsRead: () => void;
  updateUser: (updated: Partial<User>) => void;
  holdings: PortfolioHolding[];
  maturities: MaturityItem[];
  transactions: TransactionItem[];
  documents: RecentDocItem[];
  addTransaction: (tx: TransactionItem) => void;
}

const DEMO_USER: User = {
  id: 'usr_rohit_mv10023',
  name: 'Rohit Sharma',
  email: 'rohit.sharma@investor.in',
  mobile: '+91 98765 43210',
  pan: 'ABCDE1234F',
  investorId: 'MV10023',
  avatar: 'RS',
  kycStatus: 'VERIFIED',
  joinedAt: '2025-01-15',
};

const INITIAL_HOLDINGS: PortfolioHolding[] = [
  {
    id: 'h1',
    name: 'HDFC Bank NCD',
    category: 'Bonds',
    unitsOrAmount: '₹ 2,00,000',
    currentValue: 218400,
    returnsPercent: 9.2,
    isPositive: true,
    logo: 'HDFC',
    logoUrl: '/logos/hdfc.svg',
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    id: 'h2',
    name: 'Reliance Industries',
    category: 'Unlisted',
    unitsOrAmount: '500 Shares',
    currentValue: 147500,
    returnsPercent: 14.6,
    isPositive: true,
    logo: 'RELIANCE',
    logoUrl: '/logos/reliance.svg',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'h3',
    name: 'HDFC Balanced Advantage Fund',
    category: 'Mutual Funds',
    unitsOrAmount: '₹ 1,00,000',
    currentValue: 103120,
    returnsPercent: 3.1,
    isPositive: true,
    logo: 'HDFC-MF',
    logoUrl: '/logos/hdfc-mf.svg',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'h4',
    name: 'Tata Motors',
    category: 'Unlisted',
    unitsOrAmount: '300 Shares',
    currentValue: 87600,
    returnsPercent: 11.8,
    isPositive: true,
    logo: 'TATA',
    logoUrl: '/logos/tata.svg',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'h5',
    name: 'LIC Bond',
    category: 'Bonds',
    unitsOrAmount: '₹ 1,50,000',
    currentValue: 161250,
    returnsPercent: 7.5,
    isPositive: true,
    logo: 'LIC',
    logoUrl: '/logos/lic.svg',
    badgeBg: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
];

const INITIAL_MATURITIES: MaturityItem[] = [
  {
    id: 'm1',
    name: 'HDFC Bank NCD',
    amount: 200000,
    maturityDate: '15 Jun 2026',
    daysLeft: 30,
    logoUrl: '/logos/hdfc.svg',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'm2',
    name: 'Tata Motors Unlisted Shares',
    amount: 75000,
    maturityDate: '22 Aug 2026',
    daysLeft: 118,
    logoUrl: '/logos/tata.svg',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'm3',
    name: 'Govt. Bond (GOI)',
    amount: 150000,
    maturityDate: '10 Nov 2026',
    daysLeft: 189,
    logoUrl: '/logos/goi.svg',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'm4',
    name: 'ICICI Bank NCD',
    amount: 100000,
    maturityDate: '12 Feb 2027',
    daysLeft: 263,
    logoUrl: '/logos/icici.svg',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
];

const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 't1',
    date: '12 Apr 2026',
    type: 'Purchase',
    instrument: 'Reliance Industries (Unlisted)',
    amount: 75000,
    status: 'Completed',
  },
  {
    id: 't2',
    date: '05 Apr 2026',
    type: 'Interest',
    instrument: 'HDFC Bank NCD',
    amount: 8750,
    status: 'Completed',
  },
  {
    id: 't3',
    date: '28 Mar 2026',
    type: 'Purchase',
    instrument: 'T-Bills',
    amount: 100000,
    status: 'Completed',
  },
  {
    id: 't4',
    date: '15 Mar 2026',
    type: 'Redemption',
    instrument: 'Tata Motors (Unlisted)',
    amount: 45000,
    status: 'Completed',
  },
  {
    id: 't5',
    date: '10 Mar 2026',
    type: 'Interest',
    instrument: 'LIC Bond',
    amount: 6250,
    status: 'Completed',
  },
];

const INITIAL_DOCS: RecentDocItem[] = [
  {
    id: 'd1',
    title: 'Portfolio Statement (Mar 2026)',
    date: '12 Apr 2026',
    size: '2.4 MB',
    format: 'PDF',
    url: '/statements/portfolio-mar-2026.pdf',
  },
  {
    id: 'd2',
    title: 'Transaction Report',
    date: '05 Apr 2026',
    size: '1.8 MB',
    format: 'PDF',
    url: '/statements/transactions-q1-2026.pdf',
  },
  {
    id: 'd3',
    title: 'KYC Acknowledgement',
    date: '28 Mar 2026',
    size: '1.2 MB',
    format: 'PDF',
    url: '/statements/kyc-ack.pdf',
  },
  {
    id: 'd4',
    title: 'Tax Certificate (FY 2025-26)',
    date: '15 Mar 2026',
    size: '3.1 MB',
    format: 'PDF',
    url: '/statements/tax-cert-25-26.pdf',
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false, // Starts unauthenticated so clicking Investor Dashboard prompts authentication!
  user: null,
  unreadNotifications: 3,
  isAuthModalOpen: false,
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  isGooglePopupOpen: false,
  openGooglePopup: () => set({ isGooglePopupOpen: true }),
  closeGooglePopup: () => set({ isGooglePopupOpen: false }),
  login: (email, password) => {
    const userToSet = {
      ...DEMO_USER,
      email: email || DEMO_USER.email,
    };
    set({ isAuthenticated: true, user: userToSet, isAuthModalOpen: false, isGooglePopupOpen: false });
  },
  loginWithGoogle: (data) => {
    const email = data?.email || 'rohit.sharma@gmail.com';
    const computedName =
      data?.name ||
      email
        .split('@')[0]
        .replace(/[\._]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()) ||
      'Rohit Sharma';

    const initials =
      computedName
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'RS';

    const randomId = Math.floor(10000 + Math.random() * 90000);
    const googleUser: User = {
      id: `usr_google_${Date.now()}`,
      name: computedName,
      email: email,
      mobile: '+91 8506931757',
      pan: 'ABCDE1234F',
      investorId: `MV${randomId}`,
      avatar: initials,
      kycStatus: 'VERIFIED',
      joinedAt: new Date().toISOString().split('T')[0],
    };

    // Auto-record in admin live user monitor
    useAdminStore.getState().recordInvestor({
      id: googleUser.id,
      name: googleUser.name,
      email: googleUser.email,
      mobile: googleUser.mobile,
      investorId: googleUser.investorId,
      authMethod: 'Google OAuth',
      kycStatus: 'VERIFIED',
    });

    set({ isAuthenticated: true, user: googleUser, isAuthModalOpen: false, isGooglePopupOpen: false });
  },
  registerWithCredentials: ({ name, usernameOrEmail }) => {
    const initials = name
      .split(' ')
      .filter(Boolean)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'IN';

    const randomId = Math.floor(10000 + Math.random() * 90000);
    const registeredUser: User = {
      id: `usr_${Date.now()}`,
      name: name || 'Rohit Sharma',
      email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@investor.in`,
      mobile: '+91 8506931757',
      pan: 'ABCDE1234F',
      investorId: `MV${randomId}`,
      avatar: initials,
      kycStatus: 'VERIFIED',
      joinedAt: '2026-11-04',
    };

    // Auto-record in admin live user monitor
    useAdminStore.getState().recordInvestor({
      id: registeredUser.id,
      name: registeredUser.name,
      email: registeredUser.email,
      mobile: registeredUser.mobile,
      investorId: registeredUser.investorId,
      authMethod: 'Email & Password',
      kycStatus: 'VERIFIED',
    });

    set({ isAuthenticated: true, user: registeredUser, isAuthModalOpen: false });
  },
  logout: () => set({ isAuthenticated: false, user: null, isAuthModalOpen: false }),
  markNotificationsRead: () => set({ unreadNotifications: 0 }),
  updateUser: (updated) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updated } : null,
    })),
  holdings: INITIAL_HOLDINGS,
  maturities: INITIAL_MATURITIES,
  transactions: INITIAL_TRANSACTIONS,
  documents: INITIAL_DOCS,
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [tx, ...state.transactions],
    })),
}));
