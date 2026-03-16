import React, { useState, useEffect } from 'react';

// XP gain animation — flies up and fades out
export function XPPopup({ amount, show }: { amount: number; show: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show && amount > 0) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [show, amount]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-xp-fly pointer-events-none">
      <div className="bg-dawg-gold text-dawg-black font-display font-extrabold text-xl px-4 py-2 rounded-full shadow-lg">
        +{amount} XP
      </div>
    </div>
  );
}

// Streak fire animation
export function StreakFire({ streak }: { streak: number }) {
  if (streak < 2) return null;

  return (
    <div className="flex items-center gap-1">
      <span className="animate-pulse text-orange-400">
        {'🔥'.repeat(Math.min(streak, 5))}
      </span>
      <span className="text-orange-400 font-display font-bold text-xs">
        {streak} day streak!
      </span>
    </div>
  );
}

// Level up celebration
export function LevelUpBanner({
  level,
  title,
  onDismiss,
}: {
  level: number;
  title: string;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
      <div className="bg-gradient-to-b from-dawg-red to-dawg-darkred rounded-2xl p-8 text-center max-w-xs mx-4 animate-scale-in">
        <div className="text-6xl mb-4 animate-bounce-gentle">🏆</div>
        <p className="text-dawg-gold text-xs uppercase tracking-[0.3em] mb-1">
          Level Up!
        </p>
        <h2 className="font-display font-extrabold text-3xl text-white">
          Level {level}
        </h2>
        <p className="text-white/80 font-display font-bold text-lg mt-1">
          {title}
        </p>
        <div className="flex justify-center gap-1 mt-4 text-2xl">
          {'🎉🐶🏈🎉'.split('').map((e, i) => (
            <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
              {e}
            </span>
          ))}
        </div>
        <button
          onClick={onDismiss}
          className="mt-6 bg-white text-dawg-red font-display font-bold px-8 py-2.5 rounded-lg text-sm hover:bg-dawg-gold transition-colors"
        >
          Go Dawgs! 🐾
        </button>
      </div>
    </div>
  );
}
