"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerformance = exports.getMaturities = exports.getHoldings = exports.getSummary = void 0;
const seedData_1 = require("../seeds/seedData");
const getSummary = async (req, res) => {
    return res.json({
        success: true,
        data: {
            portfolioValue: seedData_1.SEED_USER.portfolioValue,
            last30DaysChange: 8.62,
            totalInvestment: seedData_1.SEED_USER.totalInvestment,
            totalReturns: seedData_1.SEED_USER.totalReturns,
            returnsPercent: seedData_1.SEED_USER.returnsPercent,
            activeInvestmentsCount: seedData_1.SEED_HOLDINGS.length,
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
exports.getSummary = getSummary;
const getHoldings = async (req, res) => {
    return res.json({ success: true, data: seedData_1.SEED_HOLDINGS });
};
exports.getHoldings = getHoldings;
const getMaturities = async (req, res) => {
    return res.json({ success: true, data: seedData_1.SEED_MATURITIES });
};
exports.getMaturities = getMaturities;
const getPerformance = async (req, res) => {
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
exports.getPerformance = getPerformance;
