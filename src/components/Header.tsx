import React, { useState } from 'react';

export function Header({
  title,
  onSignOut,
  isDemoMode,
}: {
  title: string;
  onSignOut: () => void;
  isDemoMode?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-dawg-black/95 backdrop-blur border-b border-dawg-slate">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <div>
          <h1 className="font-display font-bold text-lg text-dawg-white leading-tight">
            {title}
          </h1>
          {isDemoMode && (
            <span className="text-[10px] text-dawg-gold">DEMO MODE</span>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 rounded-full bg-dawg-red flex items-center justify-center text-white text-sm font-bold"
          >
            G
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-10 bg-dawg-charcoal border border-dawg-slate rounded-lg shadow-xl overflow-hidden min-w-[140px]">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onSignOut();
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-dawg-silver hover:bg-dawg-slate transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
