import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock, ArrowRight, CheckCircle2, Eye, EyeOff, LayoutDashboard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Logo } from '../../components/common/Logo';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerWithCredentials, openGooglePopup } = useAuthStore();

  const [name, setName] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignup = () => {
    openGooglePopup();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please verify.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      registerWithCredentials({ name, usernameOrEmail, password });
      setIsLoading(false);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      toast.success(`Account registered successfully! Welcome, ${name}.`);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Brand Visual Side (Clean Bluish & White Theme) */}
      <div className="lg:w-1/2 relative bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden text-white">
        {/* Subtle light orbs for depth */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-60 h-60 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="z-10 flex items-center justify-between">
          <div className="bg-white/95 px-3 py-1.5 rounded-2xl shadow-md inline-block">
            <Logo subtitle="bonds" />
          </div>
          <Link
            to="/"
            className="text-xs font-bold text-sky-100 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="z-10 my-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-sky-100">
            <LayoutDashboard className="w-3.5 h-3.5 text-cyan-300" />
            <span>INSTANT INVESTOR ONBOARDING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Open Your Demat-Linked Investor Account in 60 Seconds.
          </h2>
          <p className="text-sm text-sky-100/90 leading-relaxed">
            Gain direct access to high-yielding corporate bonds, apex treasury bills, and high-growth pre-IPO shares with bank-grade security.
          </p>

          <div className="space-y-3 pt-4 border-t border-white/20 text-xs text-sky-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>Compliant with SEBI Online Bond Platform Provider (OBPP) norms</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>Assigned unique investor code MV10023 upon authorization</span>
            </div>
          </div>
        </div>

        <div className="z-10 text-xs text-sky-200/80">
          © 2026 MoneyVerseAI.com. Regulated by applicable Indian debt guidelines.
        </div>
      </div>

      {/* Right Registration Form Side */}
      <div className="lg:w-1/2 p-6 sm:p-12 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Investor Dashboard Sign Up</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              Create Investor Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Provide your details or continue with Google to access your dashboard.
            </p>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.99] hover:border-slate-300"
          >
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
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              or enter your details
            </span>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            {/* Name */}
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
                  placeholder="e.g. Rohit Sharma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Username / Email */}
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
                  placeholder="rohit.sharma@investor.in or username"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password (min 6 characters)"
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

            {/* Confirm Password */}
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 mt-1"
            >
              {isLoading ? 'Creating Account...' : 'Create Account & Access Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500">
            Already have an investor account?{' '}
            <Link to="/auth/login" className="text-sky-600 font-bold hover:underline">
              Sign In here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
