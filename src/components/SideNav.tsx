import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PowerGLogo } from './PowerGLogo';

const tabs = [
  { path: '/', label: 'Dynasty HQ', icon: '🏟️', description: 'Dashboard & Progress' },
  { path: '/courses', label: 'Courses', icon: '📚', description: 'Guided learning path' },
  { path: '/game', label: 'Season Simulator', icon: '🏈', description: 'Play the season' },
  { path: '/combine', label: 'Daily Combine', icon: '🏋️', description: 'Practice drills' },
  { path: '/recruits', label: 'Recruit Board', icon: '📋', description: 'Manage pipeline' },
];

export function SideNav({
  onSignOut,
  isDemoMode,
  totalXp,
  streak,
}: {
  onSignOut: () => void;
  isDemoMode?: boolean;
  totalXp?: number;
  streak?: number;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-dawg-charcoal border-r border-dawg-slate h-screen fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-dawg-slate">
        <div className="flex items-center gap-3">
          <PowerGLogo size={52} />
          <div>
            <div className="font-display font-extrabold text-dawg-white text-lg leading-tight tracking-tight">
              UGA DYNASTY
            </div>
            <div className="font-display font-bold text-dawg-red text-sm tracking-wider">
              BUILDER
            </div>
          </div>
        </div>
        {isDemoMode && (
          <div className="mt-2 text-[10px] text-dawg-gold bg-dawg-gold/10 border border-dawg-gold/20 rounded px-2 py-1 inline-block">
            DEMO MODE
          </div>
        )}
      </div>

      {/* XP + Streak stats */}
      {(totalXp !== undefined || streak !== undefined) && (
        <div className="px-5 py-3 border-b border-dawg-slate flex gap-6">
          {totalXp !== undefined && (
            <div>
              <div className="text-dawg-gold font-display font-bold text-xl leading-none">
                {totalXp.toLocaleString()}
              </div>
              <div className="text-dawg-silver/60 text-[10px] uppercase tracking-wider mt-0.5">XP</div>
            </div>
          )}
          {streak !== undefined && (
            <div>
              <div className="text-dawg-red font-display font-bold text-xl leading-none">
                {streak}
              </div>
              <div className="text-dawg-silver/60 text-[10px] uppercase tracking-wider mt-0.5">
                Day Streak
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {tabs.map((tab) => {
          const active =
            tab.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`w-full flex items-center gap-3 px-5 py-3 transition-all text-left group ${
                active
                  ? 'bg-dawg-red/10 border-r-2 border-dawg-red'
                  : 'border-r-2 border-transparent hover:bg-dawg-slate/20'
              }`}
            >
              <span className="text-xl w-7 text-center shrink-0">{tab.icon}</span>
              <div>
                <div
                  className={`font-display font-bold text-sm leading-tight ${
                    active ? 'text-dawg-white' : 'text-dawg-silver group-hover:text-dawg-white'
                  }`}
                >
                  {tab.label}
                </div>
                <div className="text-[10px] text-dawg-silver/50 mt-0.5">{tab.description}</div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Boom mascot area */}
      <div className="px-5 py-3 border-t border-dawg-slate">
        <div className="rounded-lg overflow-hidden mb-3 bg-dawg-slate/20">
          <img
            src="/boom.png"
            alt="Boom — UGA Mascot"
            className="w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-2 text-dawg-silver hover:text-dawg-white text-sm py-1.5 transition-colors"
        >
          <span className="text-base">↩</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
