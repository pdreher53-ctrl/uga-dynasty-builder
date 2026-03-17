// ═══════════════════════════════════════════════════════════════
// CHALLENGE EVALUATOR — Answer validation, pure functions
// ═══════════════════════════════════════════════════════════════

import { LevelQuestion, BossChallenge, isBossChallenge } from '../types/engine';

// ── Single question result ────────────────────────────────────

export interface QuestionResult {
  correct: boolean;
  selectedIndex: number;
  correctIndex: number;
  explanation: string;
}

export function evaluateAnswer(
  question: LevelQuestion,
  selectedIndex: number
): QuestionResult {
  return {
    correct: selectedIndex === question.correctIndex,
    selectedIndex,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
  };
}

// ── Boss challenge result ─────────────────────────────────────

export interface BossResult {
  passed: boolean;
  score: number;        // how many correct
  passingScore: number; // how many needed
  partResults: QuestionResult[];
}

export function evaluateBossChallenge(
  boss: BossChallenge,
  selectedIndices: number[] // one per part, in order
): BossResult {
  const partResults = boss.parts.map((part, i) =>
    evaluateAnswer(part, selectedIndices[i] ?? -1)
  );
  const score = partResults.filter(r => r.correct).length;
  return {
    passed: score >= boss.passingScore,
    score,
    passingScore: boss.passingScore,
    partResults,
  };
}

// ── Combined evaluator (handles both types) ───────────────────

export type ChallengeResult = QuestionResult | BossResult;

export function isBossResult(r: ChallengeResult): r is BossResult {
  return 'partResults' in r;
}

export function evaluateChallenge(
  challenge: LevelQuestion | BossChallenge,
  answers: number | number[] // single index or array for boss
): ChallengeResult {
  if (isBossChallenge(challenge)) {
    return evaluateBossChallenge(challenge, answers as number[]);
  }
  return evaluateAnswer(challenge, answers as number);
}

export function didPassChallenge(result: ChallengeResult): boolean {
  if (isBossResult(result)) return result.passed;
  return result.correct;
}
