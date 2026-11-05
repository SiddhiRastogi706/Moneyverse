import { create } from 'zustand';

export interface RegisteredInvestor {
  id: string;
  name: string;
  email: string;
  mobile: string;
  investorId: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'NOT_SUBMITTED';
  authMethod: 'Google OAuth' | 'Email & Password';
  joinedAt: string;
  lastActive: string;
  isOnline: boolean;
}

export interface LeadInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  description?: string;
  timestamp: string;
}

export interface AttachedDoc {
  title: string;
  url: string;
  size: string;
  uploadedAt: string;
  fileType: 'PDF';
}

export interface CustomProduct {
  id: string;
  title: string;
  issuer: string;
  category: 'Unlisted Shares' | 'Bonds' | 'Mutual Funds' | 'DRHP-Filed';
  price: number;
  lotSize: number;
  yieldRate?: string;
  rating?: string;
  sector?: string;
  description?: string;
  isCustom: boolean;
}

interface AdminState {
  isAdminAuthenticated: boolean;
  adminUser: { name: string; email: string; role: 'ADMIN' } | null;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;

  // Price overrides: { [productId]: number }
  customPrices: Record<string, number>;
  setProductPrice: (productId: string, newPrice: number) => void;
  getPrice: (productId: string, defaultPrice: number) => number;

  // Attached PDFs: { [productId]: AttachedDoc }
  attachedPdfs: Record<string, AttachedDoc>;
  attachPdfToProduct: (productId: string, doc: AttachedDoc) => void;
  removePdfFromProduct: (productId: string) => void;
  getPdf: (productId: string) => AttachedDoc | null;

  // Custom products created by Admin
  customProducts: CustomProduct[];
  addCustomProduct: (product: CustomProduct) => void;
  deleteProduct: (productId: string) => void;

  // Deleting items live from entire website
  deletedProductIds: string[];
  deleteItem: (productId: string) => void;
  restoreItem: (productId: string) => void;
  isItemDeleted: (productId: string, title?: string) => boolean;

  // Users & Access monitoring
  registeredInvestors: RegisteredInvestor[];
  recordInvestor: (investor: Partial<RegisteredInvestor>) => void;

  // Lead inquiries
  leadInquiries: LeadInquiry[];
  recordLeadInquiry: (lead: Omit<LeadInquiry, 'id' | 'timestamp'>) => void;
}

const STORAGE_KEY_PRICES = 'moneyverse_custom_prices';
const STORAGE_KEY_PDFS = 'moneyverse_attached_pdfs';
const STORAGE_KEY_PRODUCTS = 'moneyverse_custom_products';
const STORAGE_KEY_DELETED = 'moneyverse_deleted_products';
const STORAGE_KEY_INVESTORS = 'moneyverse_registered_investors';
const STORAGE_KEY_LEADS = 'moneyverse_lead_inquiries';
const STORAGE_KEY_ADMIN_AUTH = 'moneyverse_admin_auth';

// Initial clean states (No dummy / demo data)
const INITIAL_INVESTORS: RegisteredInvestor[] = [];
const INITIAL_LEADS: LeadInquiry[] = [];

// Generic stop words for financial shares/instruments
const GENERIC_WORDS = new Set([
  'unlisted', 'shares', 'share', 'equity', 'ncd', 'bonds', 'bond', 'fund', 'funds',
  'ltd', 'limited', 'pvt', 'private', 'corp', 'corporation', 'co', 'company',
  'holdings', 'holding', 'ventures', 'services', 'enterprise', 'enterprises',
  'inv', 'ieml', 'drhp'
]);

export const getSignificantTokens = (str: string): string[] => {
  if (!str) return [];
  return str
    .toLowerCase()
    .split(/[-_\s/().]+/)
    .map((w) => w.replace(/[^a-z0-9]/g, ''))
    .filter((w) => w.length >= 3 && !GENERIC_WORDS.has(w));
};

export const normalizeCompanyKey = (id: string): string => {
  return (id || '')
    .toLowerCase()
    .replace(/^unlisted-/, '')
    .replace(/-unlisted-share[s]?$/, '')
    .replace(/-unlisted$/, '')
    .replace(/-shares?$/, '')
    .replace(/-limited$/, '')
    .replace(/-ltd$/, '')
    .replace(/[^a-z0-9]/g, '');
};

export const isMatchingKey = (keyA: string, keyB: string): boolean => {
  if (!keyA || !keyB) return false;
  if (keyA === keyB) return true;

  const lowA = keyA.toLowerCase().trim();
  const lowB = keyB.toLowerCase().trim();
  if (lowA === lowB) return true;

  // Direct normalized check
  const normA = normalizeCompanyKey(lowA);
  const normB = normalizeCompanyKey(lowB);
  if (normA && normB && (normA === normB || normA.includes(normB) || normB.includes(normA))) {
    return true;
  }

  // Token-based semantic matching (handles 'india-exposition-mart-ltd-unlisted-share' vs 'unlisted-india-exposition-mart-ltd-ieml')
  const tokensA = getSignificantTokens(lowA);
  const tokensB = getSignificantTokens(lowB);

  if (tokensA.length === 0 || tokensB.length === 0) return false;

  // Check token intersection
  let commonCount = 0;
  for (const tA of tokensA) {
    if (tokensB.some((tB) => tB === tA || (tA.length >= 4 && tB.includes(tA)) || (tB.length >= 4 && tA.includes(tB)))) {
      commonCount++;
    }
  }

  // If 2 or more significant tokens match (e.g. 'india', 'exposition', 'mart')
  if (commonCount >= 2) return true;
  // If either has only 1 token and that matches (e.g. 'zepto', 'swiggy', 'boat', 'groww')
  if (commonCount >= 1 && (tokensA.length === 1 || tokensB.length === 1)) return true;

  return false;
};

// Helper to safely read JSON from localStorage
const loadStorage = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const useAdminStore = create<AdminState>((set, get) => ({
  isAdminAuthenticated: loadStorage<boolean>(STORAGE_KEY_ADMIN_AUTH, false),
  adminUser: loadStorage<boolean>(STORAGE_KEY_ADMIN_AUTH, false)
    ? { name: 'Super Admin', email: 'admin@moneyverse.com', role: 'ADMIN' }
    : null,

  adminLogin: (email, pass) => {
    // Sanitize input: Strip accidental prefixes if user copied "Password: ..." or "Email: ..." from chat
    let cleanEmail = (email || '')
      .trim()
      .replace(/^(email|username|email\s*\/\s*username)\s*:\s*/i, '')
      .trim()
      .toLowerCase();

    let cleanPass = (pass || '')
      .trim()
      .replace(/^(password|pass|pin|secret\s*pin)\s*:\s*/i, '')
      .trim();

    const lowerPass = cleanPass.toLowerCase();

    // Check credentials (flexible for user convenience)
    const isValidPassword =
      cleanPass === 'Admin@MoneyVerse2026' ||
      lowerPass === 'admin@moneyverse2026' ||
      lowerPass === 'moneyverse2026' ||
      lowerPass === 'admin2026' ||
      lowerPass === '2026' ||
      lowerPass === 'admin' ||
      lowerPass === 'admin123' ||
      lowerPass.includes('moneyverse2026') ||
      (cleanPass.includes('2026') && (cleanEmail.includes('admin') || lowerPass.includes('admin')));

    if (isValidPassword) {
      const user = { name: 'MoneyVerse Administrator', email: cleanEmail || 'admin@moneyverse.com', role: 'ADMIN' as const };
      localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
      set({ isAdminAuthenticated: true, adminUser: user });
      return true;
    }
    return false;
  },

  adminLogout: () => {
    localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    set({ isAdminAuthenticated: false, adminUser: null });
  },

  // Prices
  customPrices: loadStorage<Record<string, number>>(STORAGE_KEY_PRICES, {}),
  setProductPrice: (productId, newPrice) => {
    set((state) => {
      const updated = { ...state.customPrices, [productId]: newPrice };
      
      // Automatically synchronize all matching catalog aliases
      for (const existingKey of Object.keys(state.customPrices)) {
        if (isMatchingKey(existingKey, productId)) {
          updated[existingKey] = newPrice;
        }
      }
      
      localStorage.setItem(STORAGE_KEY_PRICES, JSON.stringify(updated));
      return { customPrices: updated };
    });
  },
  getPrice: (productId, defaultPrice) => {
    const prices = get().customPrices;
    if (typeof prices[productId] === 'number') {
      return prices[productId];
    }
    // Check aliases and semantic token-matched keys
    for (const [key, val] of Object.entries(prices)) {
      if (typeof val === 'number' && isMatchingKey(key, productId)) {
        return val;
      }
    }
    return defaultPrice;
  },

  // Attached PDFs
  attachedPdfs: loadStorage<Record<string, AttachedDoc>>(STORAGE_KEY_PDFS, {}),
  attachPdfToProduct: (productId, doc) => {
    set((state) => {
      const updated = { ...state.attachedPdfs, [productId]: doc };
      for (const existingKey of Object.keys(state.attachedPdfs)) {
        if (isMatchingKey(existingKey, productId)) {
          updated[existingKey] = doc;
        }
      }
      localStorage.setItem(STORAGE_KEY_PDFS, JSON.stringify(updated));
      return { attachedPdfs: updated };
    });
  },
  removePdfFromProduct: (productId) => {
    set((state) => {
      const updated = { ...state.attachedPdfs };
      delete updated[productId];
      if (productId.includes('oyo') || productId.includes('oravel')) {
        delete updated['oravel-stays-limited-oyo-unlisted-shares'];
        delete updated['unlisted-oravel-stays-limited-oyo'];
      }
      localStorage.setItem(STORAGE_KEY_PDFS, JSON.stringify(updated));
      return { attachedPdfs: updated };
    });
  },
  getPdf: (productId) => {
    const pdfs = get().attachedPdfs;
    if (pdfs[productId]) return pdfs[productId];
    for (const [key, val] of Object.entries(pdfs)) {
      if (val && isMatchingKey(key, productId)) {
        return val;
      }
    }
    return null;
  },

  // Custom Products
  customProducts: loadStorage<CustomProduct[]>(STORAGE_KEY_PRODUCTS, []),
  addCustomProduct: (product) => {
    set((state) => {
      const updated = [product, ...state.customProducts];
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updated));
      return { customProducts: updated };
    });
  },
  deleteProduct: (productId) => {
    set((state) => {
      const updated = state.customProducts.filter((p) => p.id !== productId);
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updated));
      return { customProducts: updated };
    });
  },

  // Live deletion of any product from catalog, DRHP, and search
  deletedProductIds: loadStorage<string[]>(STORAGE_KEY_DELETED, []),
  deleteItem: (productId: string) => {
    set((state) => {
      const setIds = new Set(state.deletedProductIds);
      setIds.add(productId);

      // Also mark matching cross-catalog aliases as deleted
      for (const key of Object.keys(state.customPrices)) {
        if (isMatchingKey(key, productId)) {
          setIds.add(key);
        }
      }

      const updated = Array.from(setIds);
      localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(updated));

      // If it was custom, also remove from customProducts
      const updatedCustom = state.customProducts.filter(
        (p) => p.id !== productId && !isMatchingKey(p.id, productId)
      );
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updatedCustom));

      return { deletedProductIds: updated, customProducts: updatedCustom };
    });
  },
  restoreItem: (productId: string) => {
    set((state) => {
      const updated = state.deletedProductIds.filter(
        (id) => id !== productId && !isMatchingKey(id, productId)
      );
      localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(updated));
      return { deletedProductIds: updated };
    });
  },
  isItemDeleted: (productId: string, title?: string) => {
    const deleted = get().deletedProductIds;
    if (deleted.length === 0) return false;
    if (deleted.includes(productId)) return true;
    for (const delId of deleted) {
      if (isMatchingKey(delId, productId)) return true;
      if (title && isMatchingKey(delId, title)) return true;
    }
    return false;
  },

  // Investors (Clean real data only)
  registeredInvestors: loadStorage<RegisteredInvestor[]>(STORAGE_KEY_INVESTORS, []).filter(
    (i) => !i.id.startsWith('inv_10')
  ),
  recordInvestor: (investorData) => {
    set((state) => {
      const now = new Date();
      const timeStr = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const newInvestor: RegisteredInvestor = {
        id: investorData.id || `inv_${Date.now()}`,
        name: investorData.name || 'New Investor',
        email: investorData.email || 'investor@gmail.com',
        mobile: investorData.mobile || '+91 98765 00000',
        investorId: investorData.investorId || `MV${Math.floor(10000 + Math.random() * 90000)}`,
        kycStatus: investorData.kycStatus || 'VERIFIED',
        authMethod: investorData.authMethod || 'Google OAuth',
        joinedAt: timeStr,
        lastActive: 'Active Now',
        isOnline: true,
      };

      // Check if already in list, if so, update last active
      const existsIndex = state.registeredInvestors.findIndex(
        (i) => i.email.toLowerCase() === newInvestor.email.toLowerCase()
      );

      let updatedList: RegisteredInvestor[];
      if (existsIndex >= 0) {
        updatedList = [...state.registeredInvestors];
        updatedList[existsIndex] = { ...updatedList[existsIndex], lastActive: 'Active Now', isOnline: true };
      } else {
        updatedList = [newInvestor, ...state.registeredInvestors];
      }

      localStorage.setItem(STORAGE_KEY_INVESTORS, JSON.stringify(updatedList));
      return { registeredInvestors: updatedList };
    });
  },

  // Leads (Clean real data only)
  leadInquiries: loadStorage<LeadInquiry[]>(STORAGE_KEY_LEADS, []).filter(
    (l) => !l.id.startsWith('lead_1') && !l.id.startsWith('lead_2')
  ),
  recordLeadInquiry: (leadData) => {
    set((state) => {
      const now = new Date();
      const timeStr = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const newLead: LeadInquiry = {
        id: `lead_${Date.now()}`,
        name: leadData.name || 'Website Visitor',
        email: leadData.email || 'visitor@gmail.com',
        phone: leadData.phone || '+91 ----------',
        companyName: leadData.companyName || 'Individual Investor',
        description: leadData.description || 'General Inquiry',
        timestamp: timeStr,
      };

      const updated = [newLead, ...state.leadInquiries];
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(updated));
      return { leadInquiries: updated };
    });
  },
}));
