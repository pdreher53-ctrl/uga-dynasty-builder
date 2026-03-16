import React from 'react';

export type BoomMood = 'idle' | 'happy' | 'celebrate' | 'sad' | 'thinking';

const MOOD_CLASS: Record<BoomMood, string> = {
  idle:      'boom-idle',
  happy:     'boom-happy',
  celebrate: 'boom-celebrate',
  sad:       'boom-sad',
  thinking:  'boom-think',
};

const MOOD_SPEECH: Record<BoomMood, string> = {
  idle:      '',
  happy:     'Go Dawgs! 🐾',
  celebrate: 'NATIONAL CHAMPS! 🏆',
  sad:       'We\'ll get \'em next time...',
  thinking:  'Hmm, let me think...',
};

export function BoomMascot({
  mood = 'idle',
  size = 160,
  showSpeech = false,
  className = '',
}: {
  mood?: BoomMood;
  size?: number;
  showSpeech?: boolean;
  className?: string;
}) {
  const speechText = MOOD_SPEECH[mood];
  const showTongue = mood === 'happy' || mood === 'celebrate';
  const showStar = mood === 'celebrate';

  return (
    <div className={`flex flex-col items-center ${className}`} style={{ width: size }}>
      {/* Speech bubble */}
      {showSpeech && speechText && (
        <div className="relative mb-2 bg-dawg-charcoal border border-dawg-slate rounded-xl px-3 py-1.5 text-center">
          <span className="text-dawg-white text-xs font-display font-bold">{speechText}</span>
          {/* Triangle pointer */}
          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #3a3a3a',
            }}
          />
        </div>
      )}

      {/* SVG Boom */}
      <svg
        viewBox="0 0 160 200"
        width={size}
        height={size * 1.25}
        xmlns="http://www.w3.org/2000/svg"
        className={MOOD_CLASS[mood]}
        style={{ overflow: 'visible' }}
      >
        {/* Celebrate stars */}
        {showStar && (
          <>
            <text x="10" y="30" fontSize="16" className="boom-tongue">⭐</text>
            <text x="130" y="25" fontSize="14" className="boom-tongue" style={{ animationDelay: '0.3s' }}>✨</text>
            <text x="140" y="60" fontSize="12" style={{ animation: 'boom-tongue 0.7s ease-in-out infinite', animationDelay: '0.6s' }}>⭐</text>
          </>
        )}

        {/* ── TAIL (animated separately) ── */}
        <g className="boom-tail" style={{ transformOrigin: '128px 138px' }}>
          <path
            d="M 128 138 Q 152 128 149 108 Q 146 90 133 97 Q 128 100 131 108"
            stroke="#DDD0AA"
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 128 138 Q 150 130 148 112 Q 146 96 135 102"
            stroke="#C8BC92"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* ── BODY ── */}
        {/* Main body fur */}
        <ellipse cx="80" cy="158" rx="58" ry="50" fill="#F0E6CC" />
        {/* UGA jersey overlay */}
        <ellipse cx="80" cy="163" rx="54" ry="46" fill="#BA0C2F" />
        {/* Jersey collar */}
        <ellipse cx="80" cy="120" rx="24" ry="9" fill="#BA0C2F" />
        {/* Jersey "G" */}
        <text
          x="80" y="183"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="34"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
        >
          G
        </text>
        {/* Jersey black trim */}
        <ellipse cx="80" cy="163" rx="54" ry="46" fill="none" stroke="#1A1A1A" strokeWidth="3" />

        {/* ── HEAD ── */}
        {/* Left ear */}
        <ellipse
          cx="36" cy="68" rx="19" ry="24"
          fill="#D4C4A0"
          transform="rotate(-15 36 68)"
        />
        <ellipse
          cx="36" cy="68" rx="12" ry="16"
          fill="#C4A87C"
          transform="rotate(-15 36 68)"
        />
        {/* Right ear */}
        <ellipse
          cx="124" cy="68" rx="19" ry="24"
          fill="#D4C4A0"
          transform="rotate(15 124 68)"
        />
        <ellipse
          cx="124" cy="68" rx="12" ry="16"
          fill="#C4A87C"
          transform="rotate(15 124 68)"
        />

        {/* Main head */}
        <ellipse cx="80" cy="80" rx="48" ry="44" fill="#F0E6CC" />

        {/* Head forehead wrinkle */}
        <path d="M 55 58 Q 80 52 105 58" stroke="#C8A87C" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M 62 64 Q 80 60 98 64" stroke="#C8A87C" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />

        {/* Jowls */}
        <ellipse cx="46" cy="96" rx="22" ry="17" fill="#E8D8B4" />
        <ellipse cx="114" cy="96" rx="22" ry="17" fill="#E8D8B4" />

        {/* Muzzle area */}
        <ellipse cx="80" cy="98" rx="24" ry="18" fill="#EEE0BE" />

        {/* Wrinkles on jowls */}
        <path d="M 38 88 Q 54 94 66 88" stroke="#C8A87C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 94 88 Q 106 94 122 88" stroke="#C8A87C" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Cheek spots */}
        <ellipse cx="52" cy="92" rx="9" ry="7" fill="#D4B48C" opacity="0.4" />
        <ellipse cx="108" cy="92" rx="9" ry="7" fill="#D4B48C" opacity="0.4" />

        {/* ── EYES ── */}
        <g className="boom-eyes">
          {/* Eye whites */}
          <circle cx="65" cy="72" r="11" fill="white" />
          <circle cx="95" cy="72" r="11" fill="white" />
          {/* Iris */}
          <circle cx="65" cy="72" r="8" fill="#2D1B09" />
          <circle cx="95" cy="72" r="8" fill="#2D1B09" />
          {/* Pupil */}
          <circle cx="66" cy="72" r="4" fill="#0A0A0A" />
          <circle cx="96" cy="72" r="4" fill="#0A0A0A" />
          {/* Highlight */}
          <circle cx="62" cy="69" r="2.5" fill="white" opacity="0.9" />
          <circle cx="92" cy="69" r="2.5" fill="white" opacity="0.9" />
          {/* Sad eyebrows (mood-specific) */}
          {mood === 'sad' && (
            <>
              <path d="M 56 62 Q 65 58 74 63" stroke="#8B6040" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 86 63 Q 95 58 104 62" stroke="#8B6040" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          )}
          {/* Happy eyebrows */}
          {(mood === 'happy' || mood === 'celebrate') && (
            <>
              <path d="M 56 64 Q 65 60 74 64" stroke="#6B4020" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 86 64 Q 95 60 104 64" stroke="#6B4020" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* ── NOSE ── */}
        <ellipse cx="80" cy="92" rx="13" ry="9" fill="#1A1A1A" />
        <ellipse cx="76" cy="89" rx="4" ry="3" fill="#333" opacity="0.6" />
        <ellipse cx="84" cy="89" rx="4" ry="3" fill="#333" opacity="0.6" />
        <ellipse cx="80" cy="88" rx="6" ry="2" fill="#444" opacity="0.4" />

        {/* ── MOUTH ── */}
        <path
          d="M 64 104 Q 80 116 96 104"
          stroke="#8B5E3C"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* ── TONGUE (mood-dependent) ── */}
        {showTongue ? (
          <g className="boom-tongue">
            <ellipse cx="80" cy="113" rx="12" ry="9" fill="#FF6B8A" />
            <path d="M 68 113 Q 80 126 92 113" fill="#FF4477" />
            <ellipse cx="80" cy="118" rx="7" ry="5" fill="#FF4477" />
            {/* Tongue highlight */}
            <ellipse cx="76" cy="111" rx="3" ry="2" fill="#FF9BB8" opacity="0.6" />
          </g>
        ) : (
          /* Closed mouth tongue hint */
          <ellipse cx="80" cy="108" rx="8" ry="4" fill="#FF8FAB" opacity="0.3" />
        )}

        {/* ── FRONT PAWS ── */}
        {/* Left paw */}
        <ellipse cx="46" cy="198" rx="24" ry="14" fill="#F0E6CC" />
        <ellipse cx="35" cy="203" rx="8" ry="5" fill="#E0D0AA" />
        <ellipse cx="46" cy="205" rx="8" ry="5" fill="#E0D0AA" />
        <ellipse cx="57" cy="203" rx="8" ry="5" fill="#E0D0AA" />
        {/* Right paw */}
        <ellipse cx="114" cy="198" rx="24" ry="14" fill="#F0E6CC" />
        <ellipse cx="103" cy="203" rx="8" ry="5" fill="#E0D0AA" />
        <ellipse cx="114" cy="205" rx="8" ry="5" fill="#E0D0AA" />
        <ellipse cx="125" cy="203" rx="8" ry="5" fill="#E0D0AA" />

        {/* UGA collar */}
        <rect x="60" y="116" width="40" height="9" rx="4" fill="#1A1A1A" />
        <text x="80" y="124" fontFamily="sans-serif" fontSize="6" fill="#BA0C2F" textAnchor="middle" fontWeight="bold">UGA</text>
      </svg>
    </div>
  );
}
