import React, { useState } from 'react';

export function LoginScreen({
  onSignIn,
  isDemoMode,
}: {
  onSignIn: (email: string) => Promise<{ error: unknown }>;
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
    <div className="min-h-screen bg-dawg-black flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Logo area with Boom */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-2 animate-bounce-gentle">🐶</div>
          <h1 className="font-display font-extrabold text-4xl text-dawg-white tracking-tight">
            UGA DYNASTY
          </h1>
          <h2 className="font-display font-bold text-2xl text-dawg-red mt-1">
            BUILDER
          </h2>
          <p className="text-dawg-silver text-sm mt-3">
            Learn to code through football recruiting
          </p>
          <p className="text-dawg-gold text-xs mt-1 italic">
            "It's about the process." — Coach Kirby Smart
          </p>
        </div>

        {/* Sanford Stadium vibe */}
        <div className="h-1 bg-gradient-to-r from-transparent via-dawg-red to-transparent mb-6 rounded-full" />

        {isDemoMode && (
          <div className="bg-dawg-gold/10 border border-dawg-gold/30 rounded-lg p-3 mb-6 text-center">
            <p className="text-dawg-gold text-xs">
              <strong>Demo Mode</strong> — No Supabase configured.
              Progress saves locally. Set up Supabase to sync across devices!
            </p>
          </div>
        )}

        {sent ? (
          <div className="bg-dawg-charcoal rounded-xl p-6 text-center animate-scale-in">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-dawg-white font-display font-bold text-lg mb-2">
              Check Your Email!
            </h3>
            <p className="text-dawg-silver text-sm">
              We sent a magic link to{' '}
              <strong className="text-dawg-white">{email}</strong>. Click the
              link to sign in.
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
            {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold py-3 rounded-lg transition-colors disabled:opacity-50 animate-pulse-ring"
            >
              {loading
                ? 'Sending...'
                : isDemoMode
                ? 'Enter Dynasty HQ 🐾'
                : 'Send Magic Link'}
            </button>
          </form>
        )}

        {/* SEC schools teaser */}
        <div className="mt-8 text-center">
          <p className="text-dawg-silver/30 text-[10px] mb-2">
            COMPETE AGAINST ALL 16 SEC SCHOOLS
          </p>
          <div className="flex justify-center gap-1 text-sm opacity-40">
            🐶 🐘 🐊 🐅 🟠 🐯 👍 🔴 🐔 🐱 🐅 🔔 🐗 ⚓ 🤘 🏇
          </div>
        </div>

        <p className="text-dawg-silver/30 text-[10px] text-center mt-6">
          Built with React + TypeScript + Supabase + Tailwind
        </p>
      </div>
    </div>
  );
}
