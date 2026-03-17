import React, { useState } from 'react';
import { PowerGLogo } from '../components/PowerGLogo';

export function LoginScreen({
  onSignIn,
  onPlayWithoutSignIn,
  isDemoMode,
}: {
  onSignIn: (email: string) => Promise<{ error: unknown }>;
  onPlayWithoutSignIn?: () => void;
  isDemoMode: boolean;
}) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemoMode) {
      await onSignIn(email);
      return;
    }

    setLoading(true);
    setError('');
    const { error: err } = await onSignIn(email);
    setLoading(false);

    if (err) {
      setError('Something went wrong. Check your email and try again.');
    } else {
      setSent(true);
    }
  };

  return (
    <div className="h-screen bg-dawg-black flex overflow-hidden">
      {/* Desktop: left panel with Boom mascot */}
      <div className="hidden lg:flex flex-col w-1/2 bg-dawg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dawg-red/20 to-dawg-black/60" />
        <img
          src="/boom.png"
          alt="Boom — UGA Mascot"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-80"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="relative z-10 p-8 mt-auto">
          <p className="font-display font-extrabold text-4xl text-white leading-tight drop-shadow-lg">
            BUILD YOUR<br />
            <span className="text-dawg-red">DYNASTY.</span>
          </p>
          <p className="text-white/70 mt-2 text-sm">Learn to code through football recruiting</p>
        </div>
      </div>

      {/* Right panel (or full screen on mobile) */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <PowerGLogo size={100} />
            </div>
            <h1 className="font-display font-extrabold text-3xl text-dawg-white tracking-tight">
              UGA DYNASTY
            </h1>
            <h2 className="font-display font-bold text-xl text-dawg-red mt-1">
              BUILDER
            </h2>
            <p className="text-dawg-silver text-sm mt-3 lg:hidden">
              Learn to code through football recruiting
            </p>
          </div>


          {sent ? (
            <div className="bg-dawg-charcoal rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="text-dawg-white font-display font-bold text-lg mb-2">
                Check Your Email!
              </h3>
              <p className="text-dawg-silver text-sm">
                We sent a magic link to <strong className="text-dawg-white">{email}</strong>.
                Click the link to sign in.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-dawg-red text-sm underline"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={!isDemoMode}
                  className="w-full bg-dawg-charcoal border border-dawg-slate rounded-lg px-4 py-3 text-dawg-white placeholder-dawg-silver/50 focus:outline-none focus:border-dawg-red transition-colors"
                />
              </div>
              {error && (
                <p className="text-red-400 text-xs mb-3">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading
                  ? 'Sending...'
                  : isDemoMode
                  ? 'Enter Dynasty HQ'
                  : 'Send Magic Link'}
              </button>
            </form>
          )}

          {onPlayWithoutSignIn && !isDemoMode && (
            <div className="mt-6 text-center">
              <button
                onClick={onPlayWithoutSignIn}
                className="text-dawg-silver/50 hover:text-dawg-silver text-sm underline underline-offset-2 transition-colors"
              >
                Play without signing in (local device only)
              </button>
              <p className="text-dawg-silver/30 text-[10px] mt-1">
                Sign in to sync progress across all your devices
              </p>
            </div>
          )}

          <p className="text-dawg-silver/40 text-[10px] text-center mt-6">
            Built with React + TypeScript + Supabase + Tailwind
          </p>
        </div>
      </div>
    </div>
  );
}
