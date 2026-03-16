import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/', label: 'HQ', icon: '🏟️' },
  { path: '/recruits', label: 'Recruits', icon: '📋' },
  { path: '/combine', label: 'Combine', icon: '🏋️' },
  { path: '/filmroom', label: 'Film Room', icon: '🎬' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dawg-charcoal border-t border-dawg-slate safe-area-bottom z-50">
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
              className={`flex flex-col items-center py-2 px-3 transition-colors ${
                active ? 'text-dawg-red' : 'text-dawg-silver'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-[10px] font-medium mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
