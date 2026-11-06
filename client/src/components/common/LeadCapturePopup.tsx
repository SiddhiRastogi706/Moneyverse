import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  User,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { useAdminStore } from '../../store/adminStore';

const LEAD_SUBMITTED_KEY = 'moneyverse_lead_submitted';

export const LeadCapturePopup: React.FC = () => {
  const { isAdminAuthenticated } = useAdminStore();
  const location = useLocation();
  const isAdminSession = isAdminAuthenticated || location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/admin');

  const [isOpen, setIsOpen] = useState(false);

  // Form Fields requested by user: name, phone, gmail, write us
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const imageUrl =
    'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D';

  // 1. Trigger popup after 5 seconds of entering the page (Disabled for Admin)
  useEffect(() => {
    if (isAdminSession) {
      setIsOpen(false);
      return;
    }

    const isDismissed = sessionStorage.getItem('moneyverse_lead_dismissed') === 'true';
    const hasSubmitted = localStorage.getItem(LEAD_SUBMITTED_KEY) === 'true';
    if (isDismissed || hasSubmitted) return;

    const timer = setTimeout(() => {
      if (localStorage.getItem(LEAD_SUBMITTED_KEY) === 'true') return;
      setIsOpen(true);
    }, 5000); // 5 seconds delay requested by user

    // Listen for custom trigger event so any explicit button can also open it
    const handleOpenEvent = () => {
      if (!isAdminSession && localStorage.getItem(LEAD_SUBMITTED_KEY) !== 'true') {
        setIsOpen(true);
      }
    };
    window.addEventListener('open-lead-popup', handleOpenEvent);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-lead-popup', handleOpenEvent);
    };
  }, [isAdminSession]);

  // 2. Global listener: Whenever visitor clicks on any other section on the page (Disabled for Admin)
  useEffect(() => {
    if (isAdminSession) {
      setIsOpen(false);
      return;
    }

    let lastCloseTime = 0;

    const handleSectionClick = (e: MouseEvent) => {
      // Debounce if just closed within 500ms or already dismissed
      if (Date.now() - lastCloseTime < 500) return;
      if (sessionStorage.getItem('moneyverse_lead_dismissed') === 'true') return;
      if (localStorage.getItem(LEAD_SUBMITTED_KEY) === 'true') return;

      const target = e.target as HTMLElement;
      if (!target) return;

      // Do not trigger if click is inside the popup or its backdrop
      if (
        target.closest('.lead-capture-modal-container') ||
        target.closest('.lead-capture-backdrop')
      ) {
        return;
      }

      // Do not trigger if click is in the top navbar header or buttons (allow regular browsing)
      if (target.closest('header') || target.closest('.glass-nav') || target.closest('a') || target.closest('button')) {
        return;
      }

      // Check if user clicked anywhere inside a section on the page
      const clickedSection = target.closest('section, main, article, [data-section]');
      if (clickedSection) {
        setIsOpen(true);
      }
    };

    const handleModalClosed = () => {
      lastCloseTime = Date.now();
    };

    document.addEventListener('click', handleSectionClick);
    window.addEventListener('lead-modal-closed', handleModalClosed);

    return () => {
      document.removeEventListener('click', handleSectionClick);
      window.removeEventListener('lead-modal-closed', handleModalClosed);
    };
  }, [isAdminSession]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('moneyverse_lead_dismissed', 'true');
    window.dispatchEvent(new Event('lead-modal-closed'));
  };

  // If Admin is active or on /admin route, NEVER render this popup
  if (isAdminSession) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Record lead in admin store for live monitoring
      useAdminStore.getState().recordLeadInquiry({
        name: name || 'Interested Investor',
        email: email || 'visitor@gmail.com',
        phone: phone || '+91 98765 00000',
        companyName: 'Individual Investor',
        description: message || 'Popup Lead Submission',
      });
      localStorage.setItem(LEAD_SUBMITTED_KEY, 'true');

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      toast.success('Your details have been submitted! Our team will contact you shortly.');
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop with soft blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity lead-capture-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col lg:flex-row my-auto lead-capture-modal-container"
          >
            {/* Close Button at top right of modal */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-xs"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ========================================================================= */}
            {/* LEFT COLUMN: USER'S REQUESTED UNSPLASH IMAGE */}
            {/* ========================================================================= */}
            <div className="relative w-full lg:w-[48%] min-h-[260px] sm:min-h-[320px] lg:min-h-[500px] overflow-hidden bg-slate-900">
              {/* Full high-resolution crisp image */}
              <img
                src="/lead-popup.jpg"
                alt="Stock Market Investment & Data Analytics"
                className="w-full h-full object-cover object-center absolute inset-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = imageUrl;
                }}
              />

              {/* Subtle bottom gradient for readability of badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>MoneyVerse Wealth Desk</span>
                </div>
              </div>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/15 text-white shadow-xl space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h4 className="text-sm font-bold font-heading text-white">Join 10,000+ Smart Investors</h4>
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  Access curated high-yield bonds (9.5%+ p.a.) and verified pre-IPO shares with instant Demat credit.
                </p>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: NAME, PHONE NO, GMAIL, WRITE US & SUBMIT */}
            {/* ========================================================================= */}
            <div className="w-full lg:w-[52%] p-6 sm:p-8 flex flex-col justify-between bg-white text-slate-800">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 my-auto">
                  {/* Header */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-tight">
                      Get In Touch With Us
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">
                      Leave your details below and our senior wealth advisor will connect with you within 15 minutes.
                    </p>
                  </div>

                  {/* 1. Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* 2. Phone Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 select-none">
                        +91 🇮🇳
                      </div>
                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your 10-digit mobile number"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Gmail / Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Gmail / Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* 4. Write to us */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Write to us <span className="text-slate-400 font-normal">(Your inquiry or requirement)</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <textarea
                        rows={3}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your requirement here (e.g. want to invest in bonds, pre-IPO shares, or portfolio advisory)..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-xs resize-none"
                      />
                    </div>
                  </div>

                  {/* Trust indicator */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>100% Confidential · Fast 15-minute response from our relationship desk</span>
                  </div>

                  {/* 5. Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Success View */
                <div className="text-center py-10 space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-md shadow-emerald-500/10">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold font-heading text-slate-900">Thank You, {name || 'Investor'}!</h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Your requirements have been successfully dispatched. Our dedicated relationship manager will
                      connect with you within <strong>15 minutes</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left max-w-sm mx-auto space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Official Support Email:</span>
                      <span className="font-semibold text-sky-600">salesmoneyverse@gmail.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Relationship Desk:</span>
                      <span className="font-bold text-slate-900">+91-8506931757</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      Continue Exploring MoneyVerse
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
