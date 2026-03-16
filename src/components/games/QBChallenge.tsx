import React, { useRef, useEffect, useState, useCallback } from 'react';

// Canvas-based QB Challenge mini-game
// Throw passes to receivers by solving code snippets quickly
interface Receiver {
  x: number;
  y: number;
  targetX: number;
  speed: number;
  label: string;
  isCorrect: boolean;
  caught: boolean;
  missed: boolean;
}

interface QBQuestion {
  question: string;
  options: { label: string; correct: boolean }[];
}

const QB_QUESTIONS: QBQuestion[] = [
  {
    question: 'Which selects all rows?',
    options: [
      { label: 'SELECT *', correct: true },
      { label: 'GET ALL', correct: false },
      { label: 'FETCH *', correct: false },
    ],
  },
  {
    question: 'Print in Python?',
    options: [
      { label: 'print()', correct: true },
      { label: 'echo()', correct: false },
      { label: 'log()', correct: false },
    ],
  },
  {
    question: 'JS array method to filter?',
    options: [
      { label: '.filter()', correct: true },
      { label: '.find()', correct: false },
      { label: '.where()', correct: false },
    ],
  },
  {
    question: 'React state hook?',
    options: [
      { label: 'useState', correct: true },
      { label: 'setState', correct: false },
      { label: 'useStore', correct: false },
    ],
  },
  {
    question: 'HTTP GET retrieves?',
    options: [
      { label: 'Data', correct: true },
      { label: 'Errors', correct: false },
      { label: 'Nothing', correct: false },
    ],
  },
  {
    question: 'Git save snapshot?',
    options: [
      { label: 'commit', correct: true },
      { label: 'push', correct: false },
      { label: 'save', correct: false },
    ],
  },
  {
    question: 'JSON uses what quotes?',
    options: [
      { label: 'Double "', correct: true },
      { label: "Single '", correct: false },
      { label: 'Backtick `', correct: false },
    ],
  },
  {
    question: 'Loop in Python?',
    options: [
      { label: 'for x in list', correct: true },
      { label: 'foreach x', correct: false },
      { label: 'loop x', correct: false },
    ],
  },
];

export function QBChallenge({ onComplete }: { onComplete: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameOver, setGameOver] = useState(false);
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [footballAnim, setFootballAnim] = useState<{ x: number; y: number; targetIdx: number } | null>(null);
  const animRef = useRef<number>(0);

  const currentQ = QB_QUESTIONS[questionIdx % QB_QUESTIONS.length];

  // Set up receivers when question changes
  useEffect(() => {
    if (gameOver) return;
    const newReceivers: Receiver[] = currentQ.options.map((opt, i) => ({
      x: -50,
      y: 60 + i * 80,
      targetX: 100 + Math.random() * 150,
      speed: 1.5 + Math.random(),
      label: opt.label,
      isCorrect: opt.correct,
      caught: false,
      missed: false,
    }));
    setReceivers(newReceivers);
  }, [questionIdx, gameOver]);

  // Timer
  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw field
      ctx.fillStyle = '#2d5a27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Yard lines
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Hedges (top and bottom)
      ctx.fillStyle = '#1a4d1a';
      ctx.fillRect(0, 0, canvas.width, 8);
      ctx.fillRect(0, canvas.height - 8, canvas.width, 8);

      // QB
      ctx.font = '28px serif';
      ctx.fillText('🏈', 15, canvas.height / 2 + 8);

      // Receivers
      receivers.forEach((r) => {
        if (r.caught) {
          ctx.font = '20px serif';
          ctx.fillText('🎉', r.x, r.y + 6);
        } else if (r.missed) {
          ctx.font = '12px serif';
          ctx.fillText('❌', r.x, r.y + 4);
        } else {
          // Receiver body
          ctx.font = '22px serif';
          ctx.fillText('🏃', r.x, r.y + 6);

          // Label
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px monospace';
          ctx.fillText(r.label, r.x - 5, r.y - 12);
        }
      });

      // Football animation
      if (footballAnim) {
        ctx.font = '16px serif';
        ctx.fillText('🏈', footballAnim.x, footballAnim.y);
      }

      // Move receivers
      setReceivers((prev) =>
        prev.map((r) => ({
          ...r,
          x: r.caught || r.missed ? r.x : Math.min(r.x + r.speed, r.targetX),
        }))
      );

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [receivers, footballAnim]);

  const throwToReceiver = useCallback(
    (index: number) => {
      if (gameOver) return;
      const receiver = receivers[index];
      if (!receiver || receiver.caught || receiver.missed) return;

      if (receiver.isCorrect) {
        setReceivers((prev) =>
          prev.map((r, i) =>
            i === index ? { ...r, caught: true } : { ...r, missed: !r.caught }
          )
        );
        setScore((s) => s + 10);
        setTimeout(() => {
          setQuestionIdx((q) => q + 1);
        }, 600);
      } else {
        setReceivers((prev) =>
          prev.map((r, i) => (i === index ? { ...r, missed: true } : r))
        );
        setScore((s) => Math.max(0, s - 5));
      }
    },
    [receivers, gameOver]
  );

  useEffect(() => {
    if (gameOver) {
      onComplete(score);
    }
  }, [gameOver, score, onComplete]);

  if (gameOver) {
    return (
      <div className="bg-dawg-charcoal rounded-xl p-6 text-center">
        <div className="text-5xl mb-3">🏆</div>
        <h3 className="font-display font-extrabold text-xl text-dawg-white mb-2">
          QB Challenge Complete!
        </h3>
        <div className="text-dawg-gold font-display font-bold text-3xl mb-2">
          {score} pts
        </div>
        <p className="text-dawg-silver text-sm">
          {score >= 60
            ? "Heisman-caliber performance!"
            : score >= 30
            ? "Solid game, starter material!"
            : "Keep practicing, Coach!"}
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
        </div>
        <div className="text-dawg-white font-mono text-sm bg-dawg-charcoal px-3 py-1 rounded-full">
          {timeLeft}s
        </div>
      </div>

      {/* Question */}
      <div className="bg-dawg-charcoal rounded-lg px-3 py-2 text-center">
        <p className="text-dawg-white text-sm font-display font-bold">
          {currentQ.question}
        </p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={340}
        height={280}
        className="w-full rounded-xl border border-dawg-slate"
      />

      {/* Throw buttons */}
      <div className="grid grid-cols-3 gap-2">
        {receivers.map((r, i) => (
          <button
            key={i}
            onClick={() => throwToReceiver(i)}
            disabled={r.caught || r.missed}
            className={`py-2.5 rounded-lg font-mono text-xs font-bold transition-all ${
              r.caught
                ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                : r.missed
                ? 'bg-red-900/30 text-red-400 border border-red-500/30'
                : 'bg-dawg-red hover:bg-dawg-darkred text-white'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
