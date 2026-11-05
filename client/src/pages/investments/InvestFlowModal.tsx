import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, ShieldCheck, ArrowRight, Building, CreditCard, AlertTriangle, Sparkles } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Stepper } from '../../components/common/Stepper';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { formatINR } from '../../utils/formatters';
import { InvestmentProduct } from '../../types';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface InvestFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  investment: InvestmentProduct;
}

export const InvestFlowModal: React.FC<InvestFlowModalProps> = ({
  isOpen,
  onClose,
  investment,
}) => {
  const { user, addTransaction } = useAuthStore();
  const [activeStep, setActiveStep] = useState(0);
  const [amount, setAmount] = useState(investment.minInvestment);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const steps = [
    { id: 1, title: 'Amount' },
    { id: 2, title: 'Investor' },
    { id: 3, title: 'Compliance' },
    { id: 4, title: 'Confirm' },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Execute payment
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setConfirmed(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        addTransaction({
          id: `tx_${Date.now()}`,
          date: 'Today',
          type: 'Purchase',
          instrument: investment.title,
          amount: amount,
          status: 'Completed',
        });
        toast.success(`Successfully invested ${formatINR(amount)} in ${investment.title}!`);
      }, 1200);
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setConfirmed(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="lg">
      <div className="space-y-6 text-slate-900">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            SECURE INVESTMENT CHECKOUT
          </span>
          <h2 className="text-xl font-bold font-heading text-slate-900 mt-0.5">
            {investment.title}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {investment.category} · {investment.yieldRate} · {investment.tenure}
          </p>
        </div>

        {/* Stepper */}
        {!confirmed && (
          <div className="py-2">
            <Stepper steps={steps} activeStep={activeStep} />
          </div>
        )}

        {/* Content per Step */}
        {!confirmed ? (
          <div className="space-y-4">
            {activeStep === 0 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Select Investment Amount (Min: {formatINR(investment.minInvestment)})
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold font-heading text-sky-600">₹</span>
                    <input
                      type="number"
                      step={10000}
                      min={investment.minInvestment}
                      value={amount}
                      onChange={(e) => setAmount(Math.max(investment.minInvestment, Number(e.target.value)))}
                      className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-lg font-bold text-slate-900 outline-none focus:border-sky-500 shadow-sm"
                    />
                  </div>
                  {/* Preset Amount Pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[100000, 200000, 500000, 1000000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(preset)}
                        className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                          amount === preset
                            ? 'bg-sky-500 text-white font-bold border-sky-500 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600'
                        }`}
                      >
                        {formatINR(preset)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Expected Annual Yield:</span>
                    <span className="text-slate-900 font-bold">{investment.yieldRate}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Payout Frequency:</span>
                    <span className="text-slate-900">{investment.payoutFrequency || 'Quarterly'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Verified Investor Identity</h4>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Investor Name:</span>
                    <span className="font-semibold text-slate-900">{user?.name || 'Rohit Sharma'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Investor Code:</span>
                    <span className="font-semibold text-sky-600">{user?.investorId || 'MV10023'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">PAN Card:</span>
                    <span className="font-semibold text-slate-900">{user?.pan || 'ABCDE1234F'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-medium">Demat CDSL BOID:</span>
                    <span className="font-semibold text-slate-900">12081600 3982 1104</span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-3">
                <div className="rounded-xl p-4 bg-amber-50 border border-amber-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-amber-800 font-bold">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                    <span>SEBI Risk Acknowledgement</span>
                  </div>
                  <p className="text-amber-900/90 leading-relaxed font-medium">
                    I acknowledge that bonds and private securities carry inherent credit, market, and liquidity risks. I have reviewed the scheme information document and financial health of {investment.issuer}.
                  </p>
                </div>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs">
                  <input type="checkbox" defaultChecked className="mt-0.5 rounded text-sky-600 focus:ring-sky-500" />
                  <span className="text-slate-600 leading-relaxed font-medium">
                    I confirm that I am investing surplus investible funds and comply with FEMA/PMLA guidelines.
                  </span>
                </label>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Order Summary</h4>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Security:</span>
                    <span className="font-semibold text-slate-900">{investment.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Total Payable:</span>
                    <span className="font-bold text-sky-600 text-base font-mono">{formatINR(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Payment Mode:</span>
                    <span className="text-slate-900 font-semibold">NPCI UPI Auto-Hold / RTGS Escrow</span>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={activeStep === 0 ? handleClose : () => setActiveStep(activeStep - 1)}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {activeStep === 0 ? 'Cancel' : 'Back'}
              </Button>

              <Button
                variant="primary"
                size="md"
                isLoading={isProcessing}
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md shadow-sky-500/20"
              >
                {activeStep === steps.length - 1 ? 'Authorize & Invest' : 'Continue'}
              </Button>
            </div>
          </div>
        ) : (
          /* Success Confirmation View */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-heading text-slate-900">Investment Authorized!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
                Your order of <strong className="text-slate-900">{formatINR(amount)}</strong> in {investment.title} has been transmitted to clearing depository (CDSL).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Transaction ID:</span>
                <span className="font-mono text-slate-900 font-bold">TXN-{Math.floor(10000000 + Math.random() * 90000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Allotment Turnaround:</span>
                <span className="text-emerald-600 font-bold">T+1 Settlement</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleClose}
                className="px-8 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md shadow-sky-500/20"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
