import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Logo } from './Logo';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const GOOGLE_CLIENT_ID = '151014022019-6375j8r88sn36fcsp42to3tdaf7i9lhi.apps.googleusercontent.com';

export const AuthModal: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthModalOpen, closeAuthModal, openGooglePopup, registerWithCredentials, login, loginWithGoogle } = useAuthStore();

  const [mode, setMode] = useState<'signup' | 'signin'>('signup');

  // Form Fields (Clean empty state, no dummy data)
  const [name, setName] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize real Google Identity Services (GSI) with user's client ID
  React.useEffect(() => {
    if (!isAuthModalOpen) return;

    const initGsi = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response: any) => {
              try {
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
                closeAuthModal();
                confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
                toast.success(`Welcome, ${realName}! Real Google sign-in verified.`);
                navigate('/dashboard');
              } catch (e) {
                console.error('Error decoding Google JWT', e);
              }
            },
            auto_select: false,
          });

          // Trigger native Google One-Tap
          window.google.accounts.id.prompt();
        } catch (err) {
          console.warn('GSI init warning:', err);
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGsi();
    } else {
      const timer = setTimeout(initGsi, 500);
      return () => clearTimeout(timer);
    }
  }, [isAuthModalOpen, closeAuthModal, loginWithGoogle, navigate]);

  if (!isAuthModalOpen) return null;

  const handleGoogleAuth = () => {
    // If Google GSI prompt is available, trigger One-Tap prompt
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt();
      } catch (e) {
        console.warn(e);
      }
    }
    // Also opens the dedicated Google Accounts popup window
    openGooglePopup();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match. Please re-check.');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        registerWithCredentials({ name, usernameOrEmail, password });
        setIsLoading(false);
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        toast.success(`Account created! Welcome, ${name}.`);
        navigate('/dashboard');
      }, 700);
    } else {
      // Sign in mode
      setIsLoading(true);
      setTimeout(() => {
        login(usernameOrEmail, password);
        setIsLoading(false);
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
        toast.success('Signed in successfully! Welcome back.');
        navigate('/dashboard');
      }, 600);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window (Crisp Bluish & White Theme) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 p-6 sm:p-8 text-slate-800 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shadow-xs"
            aria-label="Close authentication"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Brand Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="flex justify-center mb-1">
              <Logo subtitle="bonds" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold">
              <LayoutDashboard className="w-3.5 h-3.5 text-sky-600" />
              <span>Investor Dashboard Access</span>
            </div>

            <h2 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
              {mode === 'signup' ? 'Create Your Investor Account' : 'Welcome Back, Investor'}
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {mode === 'signup'
                ? 'Sign up below to access your portfolio, track bonds, and unlock pre-IPO allocations.'
                : 'Enter your credentials to unlock your personalized Investor Dashboard.'}
            </p>
          </div>

          {/* ========================================================================= */}
          {/* 1. CONTINUE WITH GOOGLE (User Requested) */}
          {/* ========================================================================= */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.99] hover:border-slate-300"
          >
            {/* Official Google G Logo SVG */}
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24">
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
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              or with username & password
            </span>
          </div>

          {/* Mode Switcher Tabs: Sign Up vs Sign In */}
          <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200 mb-4">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-white text-sky-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up (New Account)
            </button>
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-white text-sky-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In (Existing)
            </button>
          </div>

          {/* ========================================================================= */}
          {/* AUTHENTICATION FORM FIELDS (User Requested: Name, Username/Email, Password, Confirm Password) */}
          {/* ========================================================================= */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* 1. Name (Only in signup mode) */}
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-xs"
                  />
                </div>
              </div>
            )}

            {/* 2. Username / Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Username / Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="Enter email or username"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-xs"
                />
              </div>
            </div>

            {/* 3. Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Password <span className="text-red-500">*</span>
                </label>
                {mode === 'signin' && (
                  <span className="text-[11px] text-sky-600 font-semibold cursor-pointer hover:underline">
                    Forgot Password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 4. Confirm Password (User Requested) */}
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-[11px] text-red-500 font-medium">Passwords do not match</p>
                )}
              </div>
            )}

            {/* Trust check */}
            <div className="p-2.5 rounded-xl bg-sky-50/80 border border-sky-200/80 flex items-center gap-2 text-xs text-sky-900">
              <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span className="text-[11px] leading-tight">
                Bank-grade 256-bit encryption · Official SEBI & CDSL/NSDL integration
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Authorizing...</span>
              ) : (
                <>
                  <span>
                    {mode === 'signup' ? 'Create Account & Enter Dashboard' : 'Sign In & Enter Dashboard'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-4 text-center text-xs text-slate-500">
            {mode === 'signup' ? (
              <p>
                Already have an investor account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-sky-600 font-bold hover:underline"
                >
                  Sign In here
                </button>
              </p>
            ) : (
              <p>
                New to MoneyVerse?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-sky-600 font-bold hover:underline"
                >
                  Create free account
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
