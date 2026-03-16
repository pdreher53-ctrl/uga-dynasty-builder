import React, { useRef, useEffect, useState, useCallback } from 'react';

// Canvas mini-game: Run routes on the field by answering code questions
// Each correct answer advances your route, wrong answers = incompletion

interface RoutePoint {
  x: number;
  y: number;
}

interface RouteQuestion {
  question: string;
  answer: string;
  wrong: string[];
}

const ROUTE_QUESTIONS: RouteQuestion[] = [
  { question: 'Array length in JS?', answer: '.length', wrong: ['.size()', '.count'] },
  { question: 'Python list append?', answer: '.append()', wrong: ['.add()', '.push()'] },
  { question: 'SQL sort results?', answer: 'ORDER BY', wrong: ['SORT BY', 'GROUP BY'] },
  { question: 'React render list?', answer: '.map()', wrong: ['.forEach()', '.loop()'] },
  { question: 'JS async/await?', answer: 'await fetch()', wrong: ['wait fetch()', 'sync fetch()'] },
  { question: 'Python dict access?', answer: "dict['key']", wrong: ['dict.get(key)', 'dict(key)'] },
  { question: 'CSS flexbox center?', answer: 'justify-content', wrong: ['align-self', 'text-center'] },
  { question: 'Git new branch?', answer: 'git checkout -b', wrong: ['git branch new', 'git create'] },
];

// Slant route pattern
const SLANT_ROUTE: RoutePoint[] = [
  { x: 170, y: 350 },
  { x: 170, y: 300 },
  { x: 120, y: 200 },
  { x: 80, y: 120 },
  { x: 50, y: 50 },
];

export function RouteRunner({ onComplete }: { onComplete: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0); // which route point we're at
  const [questionIdx, setQuestionIdx] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const animRef = useRef<number>(0);

  const currentQ = ROUTE_QUESTIONS[questionIdx % ROUTE_QUESTIONS.length];

  // Shuffle options when question changes
  useEffect(() => {
    const allOpts = [currentQ.answer, ...currentQ.wrong];
    setOptions(allOpts.sort(() => Math.random() - 0.5));
    setResult(null);
  }, [questionIdx]);

  // Draw the field and route
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Field
      ctx.fillStyle = '#2d5a27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Yard lines
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Hedges
      ctx.fillStyle = '#1a4d1a';
      ctx.fillRect(0, 0, 6, canvas.height);
      ctx.fillRect(canvas.width - 6, 0, 6, canvas.height);

      // End zone
      ctx.fillStyle = 'rgba(186,12,47,0.3)';
      ctx.fillRect(0, 0, canvas.width, 40);
      ctx.fillStyle = '#BA0C2F';
      ctx.font = 'bold 14px "Barlow Condensed", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('END ZONE', canvas.width / 2, 26);
      ctx.textAlign = 'left';

      // Draw route line (future path - dashed)
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = progress; i < SLANT_ROUTE.length; i++) {
        if (i === progress) ctx.moveTo(SLANT_ROUTE[i].x, SLANT_ROUTE[i].y);
        else ctx.lineTo(SLANT_ROUTE[i].x, SLANT_ROUTE[i].y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw completed route (solid)
      if (progress > 0) {
        ctx.strokeStyle = '#D4A843';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i <= progress && i < SLANT_ROUTE.length; i++) {
          if (i === 0) ctx.moveTo(SLANT_ROUTE[i].x, SLANT_ROUTE[i].y);
          else ctx.lineTo(SLANT_ROUTE[i].x, SLANT_ROUTE[i].y);
        }
        ctx.stroke();
      }

      // Draw player at current position
      const pos = SLANT_ROUTE[Math.min(progress, SLANT_ROUTE.length - 1)];
      ctx.font = '24px serif';
      ctx.fillText('🏃', pos.x - 12, pos.y + 8);

      // Draw defender
      ctx.font = '20px serif';
      ctx.fillText('🛡️', pos.x + 40, pos.y - 20);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [progress]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (result || done) return;
      const correct = answer === currentQ.answer;
      setResult(correct ? 'correct' : 'wrong');

      if (correct) {
        setScore((s) => s + 15);
        setTimeout(() => {
          const nextProgress = progress + 1;
          if (nextProgress >= SLANT_ROUTE.length) {
            setDone(true);
            onComplete(score + 15);
          } else {
            setProgress(nextProgress);
            setQuestionIdx((q) => q + 1);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setQuestionIdx((q) => q + 1);
        }, 1000);
      }
    },
    [result, done, currentQ, progress, score, onComplete]
  );

  if (done) {
    return (
      <div className="bg-dawg-charcoal rounded-xl p-6 text-center">
        <div className="text-5xl mb-3">🏈</div>
        <h3 className="font-display font-extrabold text-xl text-dawg-white mb-2">
          TOUCHDOWN!
        </h3>
        <p className="text-dawg-gold font-display font-bold text-lg">
          Route completed! +{score} XP
        </p>
        <p className="text-dawg-silver text-sm mt-2">
          You ran a perfect slant route Between the Hedges!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <div className="text-dawg-gold font-display font-bold text-sm">
          Score: {score}
        </div>
        <div className="flex gap-1">
          {SLANT_ROUTE.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < progress ? 'bg-dawg-gold' : 'bg-dawg-slate'
              }`}
            />
          ))}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={340}
        height={400}
        className="w-full rounded-xl border border-dawg-slate"
      />

      <div className="bg-dawg-charcoal rounded-lg px-3 py-2 text-center">
        <p className="text-dawg-white text-sm font-display font-bold">
          {currentQ.question}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            disabled={result !== null}
            className={`py-2.5 rounded-lg font-mono text-[10px] font-bold transition-all ${
              result && opt === currentQ.answer
                ? 'bg-green-600 text-white'
                : result === 'wrong' && opt !== currentQ.answer
                ? 'bg-dawg-slate text-dawg-silver/50'
                : 'bg-dawg-red hover:bg-dawg-darkred text-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
