'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/store/authStore';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

const WalletConnectButton = dynamic(
  () => import('@/components/auth/WalletConnectButton'),
  { ssr: false, loading: () => <div className="h-11 rounded-xl bg-white/5" /> },
);

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      router.replace(user.role === 'admin' ? '/admin' : '/user');
    }
  }, [isAuthenticated, user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your email and password.');
      return;
    }
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (result.success) {
      toast.success('Welcome back!');
      const role = useAuth.getState().user?.role;
      router.push(role === 'admin' ? '/admin' : '/user');
    } else {
      toast.error(result.error ?? 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Logo size="lg" textClassName="text-2xl font-bold text-white" />
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-blue-200/60 text-sm mt-1">
              Sign in to your Chioma account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-blue-200/60 uppercase tracking-widest mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-blue-300/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-blue-200/60 uppercase tracking-widest mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-blue-300/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-blue-300/40 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <Link
                  href="#"
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all text-sm"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-transparent px-3 text-blue-300/40 font-medium">
                or continue with
              </span>
            </div>
          </div>

          <WalletConnectButton
            className="w-full"
            buttonText="Connect Stellar Wallet"
          />

          <p className="text-center text-sm text-blue-200/50 mt-6">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
