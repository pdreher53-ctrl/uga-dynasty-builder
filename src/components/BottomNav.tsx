import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/', label: 'HQ', icon: '🏟️' },
  { path: '/recruits', label: 'Recruits', icon: '📋' },
  { path: '/training', label: 'Train', icon: '🏋️' },
  { path: '/gameday', label: 'Gameday', icon: '🏈' },
  { path: '/filmroom', label: 'Film', icon: '🎬' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dawg-charcoal/95 backdrop-blur border-t border-dawg-slate safe-area-bottom z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active =
            tab.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center py-2 px-2 transition-colors relative ${
                active ? 'text-dawg-red' : 'text-dawg-silver'
              }`}
            >
              {active && (
                <div className="absolute -top-0.5 w-8 h-0.5 bg-dawg-red rounded-full" />
              )}
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[9px] font-medium mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
