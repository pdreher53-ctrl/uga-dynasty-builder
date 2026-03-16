import React, { useState, useEffect } from 'react';

// Mini-game: decode the "playbook" by reading code and predicting output
interface PlaybookPlay {
  code: string;
  question: string;
  options: string[];
  correctIndex: number;
  playName: string;
}

const PLAYS: PlaybookPlay[] = [
  {
    playName: 'HB Dive',
    code: 'let x = 5;\nlet y = 3;\nconsole.log(x + y);',
    question: 'What gets logged?',
    options: ['8', '53', '15', 'undefined'],
    correctIndex: 0,
  },
  {
    playName: 'Slant Route',
    code: 'const arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr.length);',
    question: 'What gets logged?',
    options: ['3', '4', '[1,2,3,4]', 'undefined'],
    correctIndex: 1,
  },
  {
    playName: 'Play Action',
    code: "const name = 'Georgia';\nconsole.log(name[0]);",
    question: 'What gets logged?',
    options: ['Georgia', 'G', 'g', 'undefined'],
    correctIndex: 1,
  },
  {
    playName: 'Screen Pass',
    code: "const x = '5' + 3;\nconsole.log(x);",
    question: 'What gets logged?',
    options: ['8', "'53'", '53', 'Error'],
    correctIndex: 2,
  },
  {
    playName: 'QB Sneak',
    code: 'let score = 0;\nfor (let i = 0; i < 3; i++) {\n  score += 7;\n}\nconsole.log(score);',
    question: 'What gets logged?',
    options: ['7', '14', '21', '28'],
    correctIndex: 2,
  },
  {
    playName: 'Flea Flicker',
    code: "const arr = ['a', 'b', 'c'];\nconsole.log(arr.indexOf('b'));",
    question: 'What gets logged?',
    options: ['0', '1', '2', "'b'"],
    correctIndex: 1,
  },
  {
    playName: 'Hail Mary',
    code: 'const obj = {a: 1, b: 2};\nconsole.log(Object.keys(obj));',
    question: 'What gets logged?',
    options: ["['a','b']", "[1, 2]", "{'a','b'}", 'undefined'],
    correctIndex: 0,
  },
  {
    playName: 'Power Run',
    code: "const x = true && 'Go';\nconsole.log(x);",
    question: 'What gets logged?',
    options: ['true', 'false', "'Go'", 'undefined'],
    correctIndex: 2,
  },
];

export function PlaybookDecoder({
  onComplete,
}: {
  onComplete: (score: number) => void;
}) {
  const [currentPlay, setCurrentPlay] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  const totalPlays = 5;

  // Pick 5 random plays
  const [plays] = useState(() =>
    [...PLAYS].sort(() => Math.random() - 0.5).slice(0, totalPlays)
  );

  const play = plays[currentPlay];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === play.correctIndex) {
      const bonus = streak >= 2 ? 5 : 0;
      setScore((s) => s + 10 + bonus);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const nextPlay = () => {
    if (currentPlay + 1 >= totalPlays) {
      setDone(true);
      onComplete(score);
    } else {
      setCurrentPlay((p) => p + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  if (done) {
    return (
      <div className="bg-dawg-charcoal rounded-xl p-6 text-center">
        <div className="text-5xl mb-3">📖</div>
        <h3 className="font-display font-extrabold text-xl text-dawg-white mb-2">
          Playbook Decoded!
        </h3>
        <div className="text-dawg-gold font-display font-bold text-3xl mb-2">
          {score} pts
        </div>
        <p className="text-dawg-silver text-sm">
          {score >= 40
            ? 'Offensive Coordinator material! You read that playbook like Kirby reads defenses!'
            : score >= 20
            ? 'Good reads! Keep studying that playbook, Coach.'
            : 'Back to the film room — review those code patterns!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* HUD */}
      <div className="flex justify-between items-center px-1">
        <div className="text-dawg-gold font-display font-bold text-sm">
          Score: {score}
          {streak >= 2 && (
            <span className="text-orange-400 ml-2">🔥 x{streak}</span>
          )}
        </div>
        <div className="flex gap-1.5">
          {plays.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < currentPlay
                  ? 'bg-dawg-gold'
                  : i === currentPlay
                  ? 'bg-dawg-red'
                  : 'bg-dawg-slate'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Play card */}
      <div className="bg-dawg-charcoal rounded-xl overflow-hidden">
        <div className="bg-dawg-red/20 px-4 py-2 flex items-center gap-2">
          <span className="text-sm">📋</span>
          <span className="font-display font-bold text-dawg-white text-sm">
            {play.playName}
          </span>
        </div>

        {/* Code */}
        <div className="p-4">
          <pre className="bg-dawg-black rounded-lg p-3 font-mono text-xs text-green-400 whitespace-pre overflow-x-auto mb-3">
            {play.code}
          </pre>

          <p className="text-dawg-white text-sm font-display font-bold mb-3">
            {play.question}
          </p>

          {/* Options */}
          <div className="grid grid-cols-2 gap-2">
            {play.options.map((opt, i) => {
              let classes =
                'py-2.5 px-3 rounded-lg text-xs font-mono font-bold transition-all text-center ';
              if (!showResult) {
                classes +=
                  'bg-dawg-black border border-dawg-slate text-dawg-silver hover:border-dawg-red';
              } else if (i === play.correctIndex) {
                classes += 'bg-green-900/30 border border-green-500 text-green-400';
              } else if (i === selected) {
                classes += 'bg-red-900/30 border border-red-500 text-red-400';
              } else {
                classes += 'bg-dawg-black border border-dawg-slate text-dawg-silver/40';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showResult}
                  className={classes}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {showResult && (
        <button
          onClick={nextPlay}
          className="w-full bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold py-2.5 rounded-lg text-sm transition-colors"
        >
          {currentPlay + 1 >= totalPlays ? 'See Results' : 'Next Play →'}
        </button>
      )}
    </div>
  );
}
