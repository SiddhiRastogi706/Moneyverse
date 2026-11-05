import { Request, Response } from 'express';
import { SEED_INVESTMENTS, SEED_TRANSACTIONS, SEED_DOCUMENTS, SEED_USER } from '../seeds/seedData';
import { generatePortfolioStatementPDF } from '../services/pdfService';

// Investments
export const getInvestments = async (req: Request, res: Response) => {
  const { category, search } = req.query;
  let results = [...SEED_INVESTMENTS];

  if (category && category !== 'All') {
    results = results.filter((i) => i.category.toLowerCase().includes(String(category).toLowerCase()));
  }
  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter((i) => i.title.toLowerCase().includes(q) || i.issuer.toLowerCase().includes(q));
  }

  return res.json({ success: true, count: results.length, data: results });
};

export const getInvestmentById = async (req: Request, res: Response) => {
  const item = SEED_INVESTMENTS.find((i) => i.id === req.params.id) || SEED_INVESTMENTS[0];
  return res.json({ success: true, data: item });
};

// Transactions
export const getTransactions = async (req: Request, res: Response) => {
  return res.json({ success: true, data: SEED_TRANSACTIONS });
};

export const createTransaction = async (req: Request, res: Response) => {
  const { instrument, amount, type } = req.body;
  const newTx = {
    id: `t_${Date.now()}`,
    date: 'Today',
    type: type || 'Purchase',
    instrument: instrument || 'HDFC Bank NCD',
    amount: Number(amount) || 100000,
    status: 'Completed',
  };
  return res.status(201).json({ success: true, data: newTx });
};

// Documents
export const getDocuments = async (req: Request, res: Response) => {
  return res.json({ success: true, data: SEED_DOCUMENTS });
};

export const downloadDocument = async (req: Request, res: Response) => {
  const docItem = SEED_DOCUMENTS.find((d) => d.id === req.params.id) || SEED_DOCUMENTS[0];
  generatePortfolioStatementPDF(res, docItem.title, SEED_USER.name, SEED_USER.investorId);
};

// AI Chat
export const chatWithAI = async (req: Request, res: Response) => {
  const { message } = req.body;
  const query = (message || '').toLowerCase();

  let reply = 'For balanced conservative growth, a 50:30:20 allocation across AAA Corporate Bonds (providing 9.25% fixed return), RBI T-Bills (ensuring high emergency liquidity), and select Pre-IPO leaders (for capital upside) is optimal for Indian investors.';

  if (query.includes('tax') || query.includes('tds')) {
    reply = 'Interest on listed NCDs is taxed at your income slab. TDS is deducted at 10% under Section 193 of the Income Tax Act if aggregate interest exceeds ₹5,000. LTCG on bonds held >12 months is taxed at 12.5% without indexation.';
  } else if (query.includes('bond') || query.includes('ncd')) {
    reply = 'AAA-rated corporate bonds from issuers like HDFC Bank and REC provide sovereign-equivalent safety with 9.25% p.a. yields and quarterly coupon credits to your bank account.';
  } else if (query.includes('unlisted') || query.includes('pre-ipo')) {
    reply = 'Pre-IPO shares in unicorns such as Groww and Tata Technologies provide early growth participation before retail IPO crowds. Note that a 6-month statutory lock-in applies post-listing.';
  }

  return res.json({
    success: true,
    data: {
      response: reply,
      disclaimer: 'Educational purposes only. Not personalized financial advice. Investments are subject to market risks.',
    },
  });
};
