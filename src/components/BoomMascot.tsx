import React from 'react';

// Boom's moods — he reacts to everything you do like Duo the owl
export type BoomMood =
  | 'happy'      // correct answer, level up
  | 'excited'    // streak, big XP gain
  | 'thinking'   // during a drill
  | 'sad'        // wrong answer
  | 'sleeping'   // inactive/haven't practiced
  | 'angry'      // broken streak
  | 'coaching'   // giving tips
  | 'celebrating'; // completed a challenge

const BOOM_FACES: Record<BoomMood, string> = {
  happy:       '🐶',
  excited:     '🐕',
  thinking:    '🤔',
  sad:         '😢',
  sleeping:    '😴',
  angry:       '😤',
  coaching:    '🎓',
  celebrating: '🎉',
};

// Boom's speech bubbles — context-aware messages
const BOOM_MESSAGES: Record<BoomMood, string[]> = {
  happy: [
    "WOOF! That's my Dawg! Kirby would be proud!",
    "Between the Hedges, that's a DAWG play right there!",
    "Uga approves! Keep stacking those W's!",
    "That's how we do it in Athens! Go Dawgs!",
    "You're building a dynasty, Coach! Sic 'em!",
  ],
  excited: [
    "DAWGS ON TOP! Your streak is ON FIRE! 🔥",
    "This is like the '22 Natty run — UNSTOPPABLE!",
    "Sanford Stadium is SHAKING right now!",
    "The Dawg Walk energy is REAL today!",
    "Coach Smart would put you on scholarship for this!",
  ],
  thinking: [
    "Hmm... think about it like a play call, Coach.",
    "What would Kirby do? Read the defense first...",
    "Take your time — even Stetson had to read the coverage.",
    "Remember your film study... you've got this.",
    "Process of elimination, just like scouting recruits.",
  ],
  sad: [
    "Aw, that's okay Coach. Even Kirby lost to Alabama... once.",
    "Shake it off! Next play mentality!",
    "Every great Dawg has a bad snap. Let's go again!",
    "That's just a learning rep. Back to the film room!",
    "Don't worry — even Herschel fumbled sometimes.",
  ],
  sleeping: [
    "*yawn* Wake up, Coach! The SEC doesn't sleep!",
    "Zzz... Alabama is out-recruiting us while you nap!",
    "WOOF! Come back! Your streak needs you!",
    "The hedges miss you, Coach. Time to practice!",
    "Boom has been waiting at Sanford all day for you...",
  ],
  angry: [
    "WOOF WOOF! You broke your streak?! Not Dawg-like!",
    "Kirby is NOT happy about this. Get back in there!",
    "Even the fire hydrant outside Sanford is disappointed.",
    "You call yourself a Dawg?! Prove it! Practice NOW!",
    "The G on the helmet stands for GET BACK TO WORK!",
  ],
  coaching: [
    "Pro tip from Boom: Read the code like Kirby reads defenses.",
    "Remember — every line of code is like a play in the playbook.",
    "The best Dawgs study film AND code. You're doing both!",
    "Kirby says: 'It's about the process.' Same with coding!",
    "Attack the code like we attack the SEC — with discipline!",
  ],
  celebrating: [
    "CHAMPIONSHIP MATERIAL! 🏆 You crushed that!",
    "GLORY, GLORY TO OL' GEORGIA! What a performance!",
    "Ring the chapel bell! That was ELITE!",
    "You just Dawg-walked that challenge! WOOF!",
    "Natty-caliber work right there, Coach! 🏈",
  ],
};

// Kirby Smart quotes — real coaching wisdom applied to coding
export const KIRBY_QUOTES = [
  { quote: "It's about the process, not the outcome.", context: "Focus on learning the concept, not just getting the right answer." },
  { quote: "We're going to attack everything we do.", context: "Approach every coding challenge with intensity and purpose." },
  { quote: "Iron sharpens iron.", context: "The harder the drill, the sharper your skills become." },
  { quote: "We want competitors, not participants.", context: "Don't just read the code — write it, break it, fix it." },
  { quote: "Be where your feet are.", context: "Focus on the current problem. Don't skip ahead." },
  { quote: "The standard is the standard.", context: "Write clean code every time. No shortcuts." },
  { quote: "You've got to earn everything in this league.", context: "Every XP point represents real knowledge gained." },
  { quote: "We recruit the right kind of people.", context: "Good code attracts good collaborators." },
  { quote: "Finish the drill.", context: "Complete every exercise, even when it gets tough." },
  { quote: "Championships are won in the off-season.", context: "The practice you put in now pays off in real projects." },
  { quote: "Next play mentality.", context: "Got one wrong? Move on and nail the next one." },
  { quote: "Trust your preparation.", context: "You've studied this — trust what you know." },
  { quote: "We're built for this.", context: "You were made to learn hard things. Embrace the challenge." },
  { quote: "Dawgs fight.", context: "When the code doesn't work, debug harder." },
  { quote: "Play to our identity.", context: "Code with your strengths. Build on what you know." },
];

function getRandomMessage(mood: BoomMood): string {
  const messages = BOOM_MESSAGES[mood];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getRandomKirbyQuote() {
  return KIRBY_QUOTES[Math.floor(Math.random() * KIRBY_QUOTES.length)];
}

// The Boom companion component — appears throughout the app
export function BoomCompanion({
  mood,
  message,
  size = 'md',
  animate = true,
  showSpeech = true,
}: {
  mood: BoomMood;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  showSpeech?: boolean;
}) {
  const displayMessage = message || getRandomMessage(mood);
  const face = BOOM_FACES[mood];

  const sizes = {
    sm: 'text-2xl',
    md: 'text-5xl',
    lg: 'text-7xl',
  };

  const bubbleSizes = {
    sm: 'text-[10px] max-w-[180px]',
    md: 'text-xs max-w-[240px]',
    lg: 'text-sm max-w-[300px]',
  };

  return (
    <div className="flex items-end gap-3">
      <div
        className={`${sizes[size]} ${
          animate ? 'animate-bounce-gentle' : ''
        } select-none`}
      >
        {face}
      </div>
      {showSpeech && (
        <div
          className={`bg-dawg-charcoal border border-dawg-slate rounded-xl rounded-bl-none px-3 py-2 ${bubbleSizes[size]} text-dawg-silver`}
        >
          {displayMessage}
        </div>
      )}
    </div>
  );
}

// Inline Boom — small version for feedback in drills
export function BoomReaction({
  mood,
  message,
}: {
  mood: BoomMood;
  message?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl">{BOOM_FACES[mood]}</span>
      {message && (
        <span className="text-xs text-dawg-silver italic">{message}</span>
      )}
    </div>
  );
}

// Kirby Smart coaching tip component
export function KirbyTip({ category }: { category?: string }) {
  const quote = getRandomKirbyQuote();

  return (
    <div className="bg-gradient-to-r from-dawg-red/10 to-dawg-darkred/10 border border-dawg-red/20 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">🧢</div>
        <div>
          <p className="text-dawg-white text-sm font-display font-bold italic">
            "{quote.quote}"
          </p>
          <p className="text-dawg-silver text-xs mt-1">
            — Coach Kirby Smart
          </p>
          <p className="text-dawg-gold text-xs mt-2">
            {quote.context}
          </p>
        </div>
      </div>
    </div>
  );
}
