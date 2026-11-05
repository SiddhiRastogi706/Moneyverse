import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { useAuthStore } from '../../store/authStore';
import { formatINR } from '../../utils/formatters';

export const PortfolioPage: React.FC = () => {
  const { holdings } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            My Portfolio{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
              Holdings
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Detailed breakdown of your active assets across Bonds, Mutual Funds, and Unlisted Shares.
          </p>
        </div>

        <Card className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Security Name</th>
                  <th className="px-4 py-3">Asset Class</th>
                  <th className="px-4 py-3">Units / Principal</th>
                  <th className="px-4 py-3">Current Valuation</th>
                  <th className="px-4 py-3 text-right">Returns (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {holdings.map((h) => (
                  <tr key={h.id} className="hover:bg-sky-50/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                          {h.logoUrl ? (
                            <img
                              src={h.logoUrl}
                              alt={h.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <span className="text-[10px] font-bold text-slate-700">{h.logo}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs sm:text-sm">{h.name}</p>
                          <span className="text-[10px] text-slate-500 font-medium">{h.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 font-medium">{h.category}</td>
                    <td className="px-4 py-3.5 text-slate-600 font-mono font-medium">{h.unitsOrAmount}</td>
                    <td className="px-4 py-3.5 text-slate-900 font-bold font-mono">{formatINR(h.currentValue)}</td>
                    <td className="px-4 py-3.5 text-right font-bold text-emerald-600 font-mono">
                      +{h.returnsPercent}%
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
