import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Download } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { formatINR } from '../../utils/formatters';
import toast from 'react-hot-toast';

export const TransactionsPage: React.FC = () => {
  const { transactions } = useAuthStore();
  const [filterType, setFilterType] = useState('ALL');

  const filtered = transactions.filter(
    (t) => filterType === 'ALL' || t.type.toUpperCase() === filterType
  );

  const handleExport = () => {
    toast.success('Exporting transactions to CSV...');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-slate-900">
              Transaction{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
                History
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Complete audit ledger of purchases, coupon interest credits, and redemptions.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExport}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs self-start sm:self-auto bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-600 shadow-sm"
          >
            Export Ledger
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {['ALL', 'PURCHASE', 'INTEREST', 'REDEMPTION'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`text-xs px-3.5 py-1.5 rounded-lg border font-semibold transition-all ${
                filterType === type
                  ? 'bg-sky-500 text-white border-sky-500 shadow-sm shadow-sky-500/25'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-slate-900 shadow-sm'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <Card className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl">
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
                {filtered.map((tx) => (
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
    </DashboardLayout>
  );
};
