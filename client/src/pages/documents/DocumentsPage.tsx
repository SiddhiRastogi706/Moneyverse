import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Stepper } from '../../components/common/Stepper';
import { Download, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

export const DocumentsPage: React.FC = () => {
  const { documents, user } = useAuthStore();

  const kycSteps = [
    { id: 1, title: 'PAN Validation' },
    { id: 2, title: 'Aadhaar DigiLocker' },
    { id: 3, title: 'Bank Verification' },
    { id: 4, title: 'Verified Active' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">
            KYC & Documents{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
              Center
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your tax certificates, contract notes, and review your regulatory KYC compliance status.
          </p>
        </div>

        {/* KYC Status Stepper */}
        <Card className="p-6 space-y-4 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">Regulatory KYC Status</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Investor Code: <strong className="text-sky-600">{user?.investorId}</strong>
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full CKYC Verified</span>
            </span>
          </div>

          <div className="py-4">
            <Stepper steps={kycSteps} activeStep={3} />
          </div>
        </Card>

        {/* Document Downloads */}
        <Card className="p-6 space-y-4 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <h3 className="text-base font-bold font-heading text-slate-900">Statements & Certificates</h3>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-xl bg-slate-50 hover:bg-sky-50/40 border border-slate-200 flex items-center justify-between gap-4 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center text-xs font-black shadow-sm flex-shrink-0">
                    PDF
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{doc.title}</h4>
                    <p className="text-xs text-slate-500">{doc.date} · {doc.size}</p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => toast.success(`Downloading ${doc.title}`)}
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  className="text-xs bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-600 shadow-sm flex-shrink-0"
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
