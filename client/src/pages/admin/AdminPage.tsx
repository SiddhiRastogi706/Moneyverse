import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Users,
  DollarSign,
  FileText,
  UploadCloud,
  CheckCircle2,
  TrendingUp,
  Search,
  Edit3,
  Trash2,
  PlusCircle,
  ExternalLink,
  LogOut,
  Sparkles,
  BarChart3,
  Phone,
  Calendar,
  Layers,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { Logo } from '../../components/common/Logo';
import { useAdminStore, RegisteredInvestor, LeadInquiry, CustomProduct, isMatchingKey } from '../../store/adminStore';
import { DRHP_COMPANIES_DATA } from '../investments/DrhpFiledPage';
import { UNLISTED_SHARES_CATALOG } from '../../data/unlistedSharesData';
import { CORPORATE_BONDS_CATALOG } from '../../data/bondsData';
import { formatINR } from '../../utils/formatters';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    isAdminAuthenticated,
    adminUser,
    adminLogin,
    adminLogout,
    customPrices,
    setProductPrice,
    getPrice,
    attachedPdfs,
    attachPdfToProduct,
    removePdfFromProduct,
    getPdf,
    customProducts,
    addCustomProduct,
    deleteProduct,
    deletedProductIds,
    deleteItem,
    restoreItem,
    isItemDeleted,
    registeredInvestors,
    leadInquiries,
  } = useAdminStore();

  // Admin login form states (Blank by default for security)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'overview' | 'prices' | 'pdfs' | 'investors' | 'leads'
  const [activeTab, setActiveTab] = useState<'overview' | 'prices' | 'pdfs' | 'investors' | 'leads'>('overview');

  // Search & Filter in Price Manager
  const [priceSearch, setPriceSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal: Edit Price
  const [editingItem, setEditingItem] = useState<{ id: string; name: string; currentPrice: number } | null>(null);
  const [newPriceInput, setNewPriceInput] = useState<string>('');

  // Modal: Delete Item (Live Deletion Confirmation)
  const [deletingItem, setDeletingItem] = useState<{ id: string; name: string } | null>(null);

  // Modal: Add New Share/Investment
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCompanyTitle, setNewCompanyTitle] = useState('');
  const [newCompanyCategory, setNewCompanyCategory] = useState<'Unlisted Shares' | 'Bonds' | 'Mutual Funds' | 'DRHP-Filed'>('Unlisted Shares');
  const [newCompanyPrice, setNewCompanyPrice] = useState('250');
  const [newCompanyLotSize, setNewCompanyLotSize] = useState('50');
  const [newCompanySector, setNewCompanySector] = useState('Fintech & Technology');

  // PDF Upload Form
  const [pdfTargetId, setPdfTargetId] = useState<string>('');
  const [pdfTitle, setPdfTitle] = useState('Draft Red Herring Prospectus (DRHP)');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfCustomUrl, setPdfCustomUrl] = useState('');

  // Combine all items into a unified list for Admin management
  const allManageableItems = useMemo(() => {
    const list: Array<{
      id: string;
      name: string;
      category: 'Unlisted Shares' | 'DRHP-Filed' | 'Bonds' | 'Mutual Funds';
      defaultPrice: number;
      lotSize: number;
      sector?: string;
      isCustom?: boolean;
    }> = [];

    // 1. DRHP Companies
    DRHP_COMPANIES_DATA.forEach((c) => {
      list.push({
        id: c.id,
        name: c.name,
        category: 'DRHP-Filed',
        defaultPrice: c.price,
        lotSize: c.lotSize || 100,
        sector: c.sector,
      });
    });

    // 2. Unlisted Shares Catalog (deduplicate against DRHP using semantic matching)
    UNLISTED_SHARES_CATALOG.forEach((s) => {
      if (!list.some((existing) => isMatchingKey(existing.id, s.id))) {
        list.push({
          id: s.id,
          name: s.title,
          category: 'Unlisted Shares',
          defaultPrice: s.minInvestment > 1000 ? Math.round(s.minInvestment / 100) : 150,
          lotSize: 50,
          sector: s.issuer,
        });
      }
    });

    // 3. Corporate Bonds
    CORPORATE_BONDS_CATALOG.forEach((b) => {
      list.push({
        id: b.id,
        name: b.title,
        category: 'Bonds',
        defaultPrice: b.minInvestment || 100000,
        lotSize: 1,
        sector: b.issuer,
      });
    });

    // 4. Custom Products added by Admin
    customProducts.forEach((cp) => {
      list.unshift({
        id: cp.id,
        name: cp.title,
        category: cp.category,
        defaultPrice: cp.price,
        lotSize: cp.lotSize,
        sector: cp.sector,
        isCustom: true,
      });
    });

    return list;
  }, [customProducts]);

  // Filtered items in price editor (honors live deletion status)
  const filteredItems = useMemo(() => {
    return allManageableItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(priceSearch.toLowerCase()) ||
        (item.sector && item.sector.toLowerCase().includes(priceSearch.toLowerCase()));

      const isDeleted = isItemDeleted(item.id, item.name);

      if (selectedCategory === 'Trash (Deleted)') {
        return isDeleted && matchesSearch;
      }

      // Hide deleted items from active lists
      if (isDeleted) return false;

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allManageableItems, priceSearch, selectedCategory, isItemDeleted, deletedProductIds]);

  // Handle Admin Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(adminEmail, adminPassword);
    if (success) {
      setLoginError('');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      toast.success('Welcome back, Administrator!');
    } else {
      setLoginError('Invalid administrator credentials. Please check and try again.');
    }
  };

  // Handle Price Update Save
  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const num = parseFloat(newPriceInput);
    if (isNaN(num) || num < 0) {
      toast.error('Please enter a valid price amount');
      return;
    }

    setProductPrice(editingItem.id, num);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    toast.success(`Price updated to ₹${num} for ${editingItem.name}! Live across website.`);
    setEditingItem(null);
  };

  // Handle PDF Upload / Attachment
  const handleAttachPdf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfTargetId) {
      toast.error('Please select an investment product or company');
      return;
    }

    let finalUrl = pdfCustomUrl.trim();
    let fileSize = '1.8 MB';

    if (pdfFile) {
      finalUrl = URL.createObjectURL(pdfFile);
      fileSize = `${(pdfFile.size / (1024 * 1024)).toFixed(2)} MB`;
    } else if (!finalUrl) {
      finalUrl = 'https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=3&ssid=15&smid=1';
    }

    attachPdfToProduct(pdfTargetId, {
      title: pdfTitle || 'Official Scheme Document',
      url: finalUrl,
      size: fileSize,
      uploadedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      fileType: 'PDF',
    });

    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    toast.success('PDF successfully attached! Now live for visitors to download.');
    setPdfFile(null);
    setPdfCustomUrl('');
  };

  // Handle Create New Custom Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyTitle.trim()) {
      toast.error('Please enter company name');
      return;
    }

    const priceNum = parseFloat(newCompanyPrice) || 200;
    const lotNum = parseInt(newCompanyLotSize) || 50;

    const newProd: CustomProduct = {
      id: `custom_${Date.now()}`,
      title: newCompanyTitle.trim(),
      issuer: newCompanyTitle.trim(),
      category: newCompanyCategory,
      price: priceNum,
      lotSize: lotNum,
      sector: newCompanySector,
      description: `Newly listed ${newCompanyCategory} opportunity curated by MoneyVerse AI.`,
      isCustom: true,
    };

    addCustomProduct(newProd);
    setProductPrice(newProd.id, priceNum);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    toast.success(`"${newCompanyTitle}" successfully added to live catalog!`);

    setIsAddModalOpen(false);
    setNewCompanyTitle('');
    setNewCompanyPrice('250');
    setNewCompanyLotSize('50');
  };

  // =========================================================================
  // VIEW 1: ADMIN LOGIN SCREEN (If not authenticated)
  // =========================================================================
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-7 sm:p-9 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <Logo subtitle="bonds" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>MoneyVerse Admin Control Center</span>
            </div>
            <h1 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
              Administrator Login
            </h1>
            <p className="text-xs text-slate-500">
              Manage live unlisted share prices, upload official PDFs, and monitor active investors.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Enter administrator email"
                  autoComplete="off"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Password or Secret PIN</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter administrator password or PIN"
                  autoComplete="new-password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-800 transition-colors">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <Logo subtitle="bonds" />
          </Link>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Admin Control Center</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              AD
            </div>
            <div className="hidden md:flex flex-col text-left leading-none">
              <span className="text-xs font-bold text-slate-900">Administrator</span>
              <span className="text-[10px] text-slate-500 mt-0.5">{adminUser?.email}</span>
            </div>
          </div>

          <button
            onClick={() => {
              adminLogout();
              toast.success('Logged out of Admin Portal');
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors ml-1"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Admin Nav Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 sm:gap-2">
          {[
            { id: 'overview', label: 'Overview & Metrics', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'prices', label: 'Shares & Price Editor', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'pdfs', label: 'PDF & Document Manager', icon: <FileText className="w-4 h-4" /> },
            { id: 'investors', label: 'Registered Investors', icon: <Users className="w-4 h-4" />, count: registeredInvestors.length },
            { id: 'leads', label: 'Lead Inquiries', icon: <Phone className="w-4 h-4" />, count: leadInquiries.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-3.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] font-mono text-slate-700">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & SYSTEM METRICS */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Investors</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{registeredInvestors.length}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Real-time connected</span>
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Assets & Shares</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{allManageableItems.length}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Across Bonds, Pre-IPO, DRHP</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attached Scheme PDFs</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{Object.keys(attachedPdfs).length}</p>
                  <p className="text-[11px] text-sky-600 font-semibold mt-0.5">Live downloadable</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-inner">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Popup Inquiries / Leads</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{leadInquiries.length}</p>
                  <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Verified Phone & Email</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
                  <Phone className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Actions Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/15 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Instant Platform Control</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight">Need to adjust unlisted share prices or upload new DRHP prospectus?</h3>
                <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
                  Any price change you save here is immediately reflected live across the entire website for all web and mobile visitors.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setActiveTab('prices')}
                  className="px-4 py-2 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-md hover:bg-blue-50 transition-all flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Share Prices</span>
                </button>
                <button
                  onClick={() => setActiveTab('pdfs')}
                  className="px-4 py-2 rounded-xl bg-blue-700/80 hover:bg-blue-700 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload PDF</span>
                </button>
              </div>
            </div>

            {/* Recent Registered Investors Preview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recently Active Investors</h3>
                  <p className="text-xs text-slate-500">Live feed of investors logging into MoneyVerse AI</p>
                </div>
                <button
                  onClick={() => setActiveTab('investors')}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>View All {registeredInvestors.length} Investors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4">Investor</th>
                      <th className="py-2.5 px-4">Investor ID</th>
                      <th className="py-2.5 px-4">Auth Method</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {registeredInvestors.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                          No registered investors yet. Real users signing up via Google OAuth or email will appear here in real time.
                        </td>
                      </tr>
                    ) : (
                      registeredInvestors.slice(0, 4).map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                                {inv.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">{inv.name}</p>
                                <p className="text-[11px] text-slate-500">{inv.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-700">{inv.investorId}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold">
                              {inv.authMethod}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                              {inv.kycStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500">{inv.lastActive}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: UNLISTED SHARES & LIVE PRICE EDITOR */}
        {/* ========================================================================= */}
        {activeTab === 'prices' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">
                  Unlisted Shares & Investment Price Manager
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click 'Edit Price' on any asset to change its live rate across the website in real-time.
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 self-start sm:self-auto transition-all active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Share / Company</span>
              </button>
            </div>

            {/* Search & Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={priceSearch}
                  onChange={(e) => setPriceSearch(e.target.value)}
                  placeholder="Search shares, DRHP companies, bonds..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
                {['All', 'Unlisted Shares', 'DRHP-Filed', 'Bonds', 'Trash (Deleted)'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? cat === 'Trash (Deleted)'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                    {cat === 'Trash (Deleted)' && deletedProductIds.length > 0 && ` (${deletedProductIds.length})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Table of Shares */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Asset / Company</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Live Price</th>
                      <th className="py-3 px-4">Lot Size</th>
                      <th className="py-3 px-4">Attached PDF</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredItems.slice(0, 50).map((item) => {
                      const livePrice = getPrice(item.id, item.defaultPrice);
                      const isPriceOverridden = typeof customPrices[item.id] === 'number';
                      const attachedDoc = getPdf(item.id);

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-50 to-blue-100 border border-blue-200/60 flex items-center justify-center font-bold text-xs text-blue-700 flex-shrink-0">
                                {item.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 line-clamp-1">{item.name}</p>
                                <p className="text-[11px] text-slate-500 line-clamp-1">{item.sector || 'Financial Markets'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                item.category === 'DRHP-Filed'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : item.category === 'Bonds'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              }`}
                            >
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900 font-mono">
                                ₹ {livePrice.toLocaleString('en-IN')}
                              </span>
                              {isPriceOverridden && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold uppercase tracking-wider">
                                  Custom
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-mono">
                            {item.lotSize} {item.category === 'Bonds' ? 'Unit' : 'Shares'}
                          </td>
                          <td className="py-3.5 px-4">
                            {attachedDoc ? (
                              <a
                                href={attachedDoc.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold hover:bg-emerald-100 transition-colors"
                              >
                                <FileText className="w-3 h-3 text-emerald-600" />
                                <span className="max-w-[100px] truncate">{attachedDoc.title}</span>
                              </a>
                            ) : (
                              <span className="text-[11px] text-slate-400">None attached</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {selectedCategory === 'Trash (Deleted)' ? (
                                <button
                                  onClick={() => {
                                    restoreItem(item.id);
                                    toast.success(`"${item.name}" restored to live website!`);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors flex items-center gap-1"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                  <span>Restore Live</span>
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditingItem({ id: item.id, name: item.name, currentPrice: livePrice });
                                      setNewPriceInput(String(livePrice));
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors flex items-center gap-1"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Edit Price</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      setPdfTargetId(item.id);
                                      setPdfTitle(`Official Prospectus - ${item.name}`);
                                      setActiveTab('pdfs');
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
                                    title="Attach Scheme PDF"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>Attach PDF</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      setDeletingItem({ id: item.id, name: item.name });
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors flex items-center gap-1"
                                    title="Delete from Live Website"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
                                  </button>
                                </>
                              )}

                              {item.isCustom && (
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete custom company "${item.name}"?`)) {
                                      deleteProduct(item.id);
                                      toast.success('Company removed');
                                    }
                                  }}
                                  className="w-7 h-7 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PDF & DOCUMENT MANAGER (Bonds, Mutual Funds, DRHP) */}
        {/* ========================================================================= */}
        {activeTab === 'pdfs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900">
                PDF & Scheme Document Upload Center
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload official DRHP prospectus, bond term sheets, or mutual fund factsheets to make them live on the public website.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Upload Form Card */}
              <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Attach New PDF</h3>
                </div>

                <form onSubmit={handleAttachPdf} className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      Target Investment Asset <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={pdfTargetId}
                      onChange={(e) => setPdfTargetId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="">-- Choose Asset / Company --</option>
                      {allManageableItems.map((item) => (
                        <option key={item.id} value={item.id}>
                          [{item.category}] {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      Document Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={pdfTitle}
                      onChange={(e) => setPdfTitle(e.target.value)}
                      placeholder="e.g. SEBI Draft Red Herring Prospectus"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      Select Local PDF File
                    </label>
                    <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setPdfFile(e.target.files[0]);
                            toast.success(`Selected file: ${e.target.files[0].name}`);
                          }
                        }}
                        className="hidden"
                        id="admin-pdf-input"
                      />
                      <label htmlFor="admin-pdf-input" className="cursor-pointer block space-y-1">
                        <UploadCloud className="w-6 h-6 text-slate-400 mx-auto" />
                        <span className="font-bold text-blue-600 block text-xs">
                          {pdfFile ? pdfFile.name : 'Click to browse PDF file'}
                        </span>
                        <span className="text-[10px] text-slate-400 block">PDF up to 25MB</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      Or Paste PDF Web URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={pdfCustomUrl}
                      onChange={(e) => setPdfCustomUrl(e.target.value)}
                      placeholder="https://example.com/prospectus.pdf"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publish PDF Live</span>
                  </button>
                </form>
              </div>

              {/* Right Currently Attached Documents List */}
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Active Attached Scheme PDFs</h3>
                    <p className="text-xs text-slate-500">These documents are currently live on the public website</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
                    {Object.keys(attachedPdfs).length} Active Documents
                  </span>
                </div>

                {Object.keys(attachedPdfs).length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-700">No PDFs attached yet</p>
                    <p className="text-[11px] text-slate-400">Use the form on the left to attach your first scheme PDF</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {Object.entries(attachedPdfs).map(([productId, doc]) => {
                      const item = allManageableItems.find((p) => p.id === productId);
                      const itemName = item?.name || productId;

                      return (
                        <div
                          key={productId}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
                              PDF
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{doc.title}</p>
                              <p className="text-[11px] text-slate-500">
                                Attached to: <strong className="text-blue-600">{itemName}</strong> · {doc.size} · Uploaded: {doc.uploadedAt}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </a>
                            <button
                              onClick={() => {
                                removePdfFromProduct(productId);
                                toast.success(`Removed PDF for ${itemName}`);
                              }}
                              className="w-7 h-7 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                              title="Delete PDF"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: REGISTERED INVESTORS & ACCESS MONITOR */}
        {/* ========================================================================= */}
        {activeTab === 'investors' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">
                  Registered Investors & Access Activity
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time monitor of every investor registered, login methods, and assigned Investor IDs.
                </p>
              </div>

              <button
                onClick={() => {
                  const csvContent =
                    'data:text/csv;charset=utf-8,' +
                    ['Name,Email,Mobile,Investor ID,Auth Method,KYC Status,Joined At']
                      .concat(
                        registeredInvestors.map(
                          (i) => `${i.name},${i.email},${i.mobile},${i.investorId},${i.authMethod},${i.kycStatus},${i.joinedAt}`
                        )
                      )
                      .join('\n');
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement('a');
                  link.setAttribute('href', encodedUri);
                  link.setAttribute('download', `moneyverse_investors_${Date.now()}.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  toast.success('Investor list exported to CSV');
                }}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Export to CSV</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Investor Name</th>
                      <th className="py-3 px-4">Contact Info</th>
                      <th className="py-3 px-4">Investor ID</th>
                      <th className="py-3 px-4">Auth Channel</th>
                      <th className="py-3 px-4">KYC Status</th>
                      <th className="py-3 px-4">Joined At</th>
                      <th className="py-3 px-4">Live Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {registeredInvestors.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                          No registered investors yet. Real user registrations will appear here automatically.
                        </td>
                      </tr>
                    ) : (
                      registeredInvestors.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                                {inv.name.slice(0, 2).toUpperCase()}
                              </div>
                              <span>{inv.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-800">{inv.email}</p>
                            <p className="text-[11px] text-slate-500">{inv.mobile}</p>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                            {inv.investorId}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold">
                              {inv.authMethod}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                              {inv.kycStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">{inv.joinedAt}</td>
                          <td className="py-3.5 px-4">
                            {inv.isOnline ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Online</span>
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">{inv.lastActive}</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: LEAD INQUIRIES (From Popups) */}
        {/* ========================================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">
                  Lead Submissions & Inquiries
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Phone numbers and requirements captured directly from the lead capture popups.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                {leadInquiries.length} Inquiries Logged
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Visitor / Contact</th>
                      <th className="py-3 px-4">Phone Number</th>
                      <th className="py-3 px-4">Organization</th>
                      <th className="py-3 px-4">Project / Requirement Note</th>
                      <th className="py-3 px-4">Received Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leadInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400 text-xs">
                          No inquiries received yet. When visitors fill the inquiry form or lead popup, real entries will appear here live.
                        </td>
                      </tr>
                    ) : (
                      leadInquiries.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-slate-900">{lead.name}</p>
                            <p className="text-[11px] text-slate-500">{lead.email}</p>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                            {lead.phone}
                          </td>
                          <td className="py-3.5 px-4 text-slate-700">{lead.companyName || 'Individual'}</td>
                          <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={lead.description}>
                            {lead.description || 'General Inquiry'}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">{lead.timestamp}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT PRICE MODAL */}
      {/* ========================================================================= */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Update Live Share Price</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{editingItem.name}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePrice} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  New Share Price in Rupees (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    step="any"
                    required
                    value={newPriceInput}
                    onChange={(e) => setNewPriceInput(e.target.value)}
                    placeholder="e.g. 155"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Previous Price: ₹ {editingItem.currentPrice}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  Save & Publish Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: LIVE DELETE CONFIRMATION */}
      {/* ========================================================================= */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Delete from Live Website?</h3>
                <p className="text-xs text-slate-500">Takes effect across the entire website instantly.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200 text-xs text-red-900 leading-relaxed">
              Are you sure you want to delete <strong className="font-bold underline">{deletingItem.name}</strong>?
              It will be completely removed from the live website, investments catalog, DRHP list, and search results.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteItem(deletingItem.id);
                  toast.success(`"${deletingItem.name}" deleted from live website!`);
                  setDeletingItem(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 flex items-center gap-1.5 transition-all active:scale-[0.98]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Live</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD NEW SHARE / COMPANY */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Add New Company / Investment</h3>
                  <p className="text-[11px] text-slate-500">Add directly to the live website catalog</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Company / Share Name *</label>
                <input
                  type="text"
                  required
                  value={newCompanyTitle}
                  onChange={(e) => setNewCompanyTitle(e.target.value)}
                  placeholder="e.g. Swiggy Limited, Vikram Solar, etc."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Asset Category</label>
                  <select
                    value={newCompanyCategory}
                    onChange={(e) => setNewCompanyCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Unlisted Shares">Unlisted Shares</option>
                    <option value="DRHP-Filed">DRHP-Filed Company</option>
                    <option value="Bonds">Corporate Bond</option>
                    <option value="Mutual Funds">Mutual Fund</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Sector / Industry</label>
                  <input
                    type="text"
                    value={newCompanySector}
                    onChange={(e) => setNewCompanySector(e.target.value)}
                    placeholder="e.g. Renewable Energy"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Price in ₹ *</label>
                  <input
                    type="number"
                    required
                    value={newCompanyPrice}
                    onChange={(e) => setNewCompanyPrice(e.target.value)}
                    placeholder="250"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-blue-500 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Min Lot Size (Shares)</label>
                  <input
                    type="number"
                    required
                    value={newCompanyLotSize}
                    onChange={(e) => setNewCompanyLotSize(e.target.value)}
                    placeholder="50"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  Create & Publish Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
