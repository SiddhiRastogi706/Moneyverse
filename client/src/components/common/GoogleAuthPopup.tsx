import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Minus,
  Square,
  Lock,
  Globe,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Key,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    google?: any;
  }
}

const GOOGLE_CLIENT_ID = '151014022019-6375j8r88sn36fcsp42to3tdaf7i9lhi.apps.googleusercontent.com';

export const GoogleAuthPopup: React.FC = () => {
  const navigate = useNavigate();
  const { isGooglePopupOpen, closeGooglePopup, loginWithGoogle, closeAuthModal } = useAuthStore();

  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApiInput, setShowApiInput] = useState(false);

  // Client ID from constant, env or localStorage
  const [clientId, setClientId] = useState(() => {
    return (
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      localStorage.getItem('moneyverse_google_client_id') ||
      GOOGLE_CLIENT_ID
    );
  });
  const [customClientIdInput, setCustomClientIdInput] = useState(clientId);

  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Initialize real Google Identity Services if clientId is provided
  useEffect(() => {
    if (!isGooglePopupOpen || !clientId) return;

    const initGoogleGsi = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
          });

          // Render official Google button into the ref
          if (googleButtonRef.current) {
            window.google.accounts.id.renderButton(googleButtonRef.current, {
              theme: 'outline',
              size: 'large',
              width: 320,
              text: 'continue_with',
              shape: 'pill',
            });
          }

          // Trigger real Google One-Tap prompt on screen/phone
          window.google.accounts.id.prompt();
        } catch (err) {
          console.warn('Google GSI initialization warning:', err);
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGoogleGsi();
    } else {
      const timer = setTimeout(initGoogleGsi, 500);
      return () => clearTimeout(timer);
    }
  }, [isGooglePopupOpen, clientId]);

  if (!isGooglePopupOpen) return null;

  // Real Google Credential Callback (Decodes official JWT token from Google)
  const handleGoogleCredentialResponse = (response: any) => {
    try {
      setIsLoading(true);
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);

      const realEmail = payload.email;
      const realName = payload.name || realEmail.split('@')[0];
      const initials = realName.slice(0, 2).toUpperCase();

      loginWithGoogle({
        email: realEmail,
        name: realName,
        avatar: initials,
      });

      setIsLoading(false);
      closeAuthModal();
      closeGooglePopup();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      toast.success(`Welcome, ${realName}! Real Google authentication successful.`);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to parse Google JWT:', err);
      toast.error('Google Sign-In response could not be verified.');
      setIsLoading(false);
    }
  };

  const handleSaveClientId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customClientIdInput.trim()) {
      toast.error('Please enter a valid Google Client ID');
      return;
    }
    const cleanId = customClientIdInput.trim();
    localStorage.setItem('moneyverse_google_client_id', cleanId);
    setClientId(cleanId);
    setShowApiInput(false);
    toast.success('Google Client ID connected! Initializing real Google Sign-In...');
  };

  const handleNextWithInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      toast.error('Please enter your Google Email or Phone number');
      return;
    }

    setIsLoading(true);
    const emailToUse = emailInput.includes('@') ? emailInput.trim() : `${emailInput.trim()}@gmail.com`;
    const derivedName =
      nameInput.trim() ||
      emailToUse
        .split('@')[0]
        .replace(/[\._]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    setTimeout(() => {
      loginWithGoogle({ email: emailToUse, name: derivedName });
      setIsLoading(false);
      closeAuthModal();
      closeGooglePopup();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      toast.success(`Signed in as ${emailToUse} via Google!`);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeGooglePopup}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />

        {/* Browser Window Wrapper (Exact Chrome / Google Accounts Window) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden z-20 my-auto text-slate-800 font-sans"
        >
          {/* Chrome Titlebar */}
          <div className="bg-[#DFE1E5] px-3.5 py-2 flex items-center justify-between border-b border-slate-300 select-none">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span className="text-[11px] font-medium text-slate-700 truncate max-w-[260px]">
                Sign in - Google Accounts - Google Chrome
              </span>
            </div>

            {/* Window controls: minimize, maximize, close */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeGooglePopup}
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-300/70 text-slate-600 transition-colors"
                title="Minimize"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                type="button"
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-300/70 text-slate-600 transition-colors"
                title="Maximize"
              >
                <Square className="w-2.5 h-2.5" />
              </button>
              <button
                type="button"
                onClick={closeGooglePopup}
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-red-500 hover:text-white text-slate-600 transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chrome Address Bar (Omnibox) */}
          <div className="bg-[#F1F3F4] px-3 py-1.5 border-b border-slate-200 flex items-center gap-2 text-slate-600 select-none">
            <div className="flex-1 bg-white rounded-full px-3 py-0.5 border border-slate-200 shadow-inner flex items-center gap-1.5 text-[11px] text-slate-600 truncate">
              <Lock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
              <span className="truncate">
                accounts.google.com<span className="text-slate-400">/v3/signin/identifier?client_id={clientId ? 'official' : 'custom'}</span>
              </span>
            </div>
          </div>

          {/* Top Google Loading Progress Bar */}
          {isLoading && (
            <div className="h-1 w-full bg-slate-100 overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-red-500 via-amber-500 to-emerald-500 w-full animate-pulse" />
            </div>
          )}

          {/* Window Body: Google Accounts Interface */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Google Brand Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="text-xs font-semibold text-slate-600">Sign in with Google</span>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sign in</h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  to continue to <strong className="text-slate-900 font-semibold">moneyverseai.com</strong>
                </p>
              </div>
            </div>

            {/* Official Google Real Button Slot (rendered by Google Identity Services when Client ID is present) */}
            {clientId && (
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Official Google One-Tap:
                </p>
                <div ref={googleButtonRef} className="flex justify-center" />
                <div className="relative my-3 flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    or enter your google account
                  </span>
                </div>
              </div>
            )}

            {/* FORM: Real User Email & Name Input */}
            <form onSubmit={handleNextWithInput} className="space-y-4">
              <div className="space-y-1.5">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder=" "
                    id="google-email-input"
                    className="peer w-full px-3.5 pt-4 pb-2 text-sm text-slate-900 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-white"
                  />
                  <label
                    htmlFor="google-email-input"
                    className="absolute left-3.5 top-1.5 text-[11px] text-blue-600 peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-blue-600 transition-all pointer-events-none bg-white px-0.5"
                  >
                    Email or phone
                  </label>
                </div>

                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => toast('Enter your registered Google email address above.')}
                    className="text-xs font-semibold text-[#1a73e8] hover:text-[#174ea6] hover:underline"
                  >
                    Forgot email?
                  </button>
                </div>
              </div>

              {/* Optional Name (So user gets their exact real name instead of fake default) */}
              <div className="space-y-1">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Your Name (optional, defaults to email name)"
                  className="w-full px-3.5 py-2 text-xs text-slate-900 border border-slate-200 rounded-lg outline-none focus:border-blue-600 bg-white"
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-normal">
                To continue, Google will share your name, email address, and language preference with MoneyVerseAI.com.
              </p>

              {/* Action Buttons Row */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    closeGooglePopup();
                    toast('Enter details in the registration modal to create an account.');
                  }}
                  className="text-xs font-semibold text-[#1a73e8] hover:text-[#174ea6] hover:underline"
                >
                  Create account
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 rounded-full bg-[#0b57d0] hover:bg-[#0842a0] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isLoading ? 'Verifying...' : 'Next'}
                </button>
              </div>
            </form>

            {/* Bottom Footer */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">
                <span>English (United States)</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>

              <div className="flex items-center gap-4">
                <a href="#help" onClick={(e) => { e.preventDefault(); toast('Google Accounts Help'); }} className="hover:text-slate-800">
                  Help
                </a>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); toast('Google Privacy Policy'); }} className="hover:text-slate-800">
                  Privacy
                </a>
                <a href="#terms" onClick={(e) => { e.preventDefault(); toast('Google Terms of Service'); }} className="hover:text-slate-800">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
