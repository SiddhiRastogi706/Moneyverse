import { Request, Response } from 'express';
import { SEED_USER, SEED_HOLDINGS, SEED_MATURITIES } from '../seeds/seedData';

export const getSummary = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: {
      portfolioValue: SEED_USER.portfolioValue,
      last30DaysChange: 8.62,
      totalInvestment: SEED_USER.totalInvestment,
      totalReturns: SEED_USER.totalReturns,
      returnsPercent: SEED_USER.returnsPercent,
      activeInvestmentsCount: SEED_HOLDINGS.length,
      upcomingMaturitiesCount: 2,
      assetAllocation: [
        { name: 'Bonds', percentage: 42.8, value: 534000 },
        { name: 'Mutual Funds', percentage: 28.3, value: 353000 },
        { name: 'Unlisted Shares', percentage: 18.7, value: 234500 },
        { name: 'Cash / Others', percentage: 10.2, value: 127250 },
      ],
      returnsBreakdown: {
        overallPercent: 12.97,
        vsLastMonthPercent: 1.42,
        interestDividend: 112480,
        capitalGain: 23760,
      },
    },
  });
};

export const getHoldings = async (req: Request, res: Response) => {
  return res.json({ success: true, data: SEED_HOLDINGS });
};

export const getMaturities = async (req: Request, res: Response) => {
  return res.json({ success: true, data: SEED_MATURITIES });
};

export const getPerformance = async (req: Request, res: Response) => {
  const range = req.query.range || '6M';
  const history = [
    { month: 'Nov', returnPct: 2.1 },
    { month: 'Dec', returnPct: 4.8 },
    { month: 'Jan', returnPct: 7.2 },
    { month: 'Feb', returnPct: 9.6 },
    { month: 'Mar', returnPct: 11.55 },
    { month: 'Apr', returnPct: 12.97 },
  ];
  return res.json({ success: true, range, data: history });
};
