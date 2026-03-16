// ═══════════════════════════════════════════════════════════════
// UGA DYNASTY SEASON SIMULATOR — Game Data & Logic
// ═══════════════════════════════════════════════════════════════

export interface Opponent {
  name: string;
  abbreviation: string;
  rating: number;       // 60–95
  primaryColor: string;
  emoji: string;
  tendency: 'run' | 'pass' | 'balanced';
  conference: string;
  isRival: boolean;
}

export interface Matchup {
  week: number;
  opponent: Opponent;
  venue: 'home' | 'away' | 'neutral';
  result?: GameResult;
}

export interface GameResult {
  ugaScore: number;
  oppScore: number;
  won: boolean;
  mvpPlay: string;
  plays: PlayEvent[];
  xpEarned: number;
  strategyUsed: string;
}

export interface PlayEvent {
  id: number;
  description: string;
  ugaPoints: number;   // points added this play
  oppPoints: number;
  mood: 'positive' | 'negative' | 'neutral' | 'big';
  quarter: number;
}

export interface Strategy {
  id: string;
  name: string;
  codingConcept: string;
  description: string;
  icon: string;
  strongVs: 'run' | 'pass' | 'balanced' | 'all';
  bonus: number;   // flat rating bonus
  variance: number; // 0-1, higher = more random
}

// ── SEC + rivalry schedule ──────────────────────────────────────

export const opponents: Record<string, Opponent> = {
  tennessee: {
    name: 'Tennessee', abbreviation: 'TENN', rating: 82,
    primaryColor: '#FF8200', emoji: '🟠', tendency: 'pass',
    conference: 'SEC East', isRival: false,
  },
  alabama: {
    name: 'Alabama', abbreviation: 'BAMA', rating: 93,
    primaryColor: '#9E1B32', emoji: '🔴', tendency: 'balanced',
    conference: 'SEC West', isRival: true,
  },
  auburn: {
    name: 'Auburn', abbreviation: 'AUB', rating: 78,
    primaryColor: '#0C2340', emoji: '🔵', tendency: 'run',
    conference: 'SEC West', isRival: true,
  },
  florida: {
    name: 'Florida', abbreviation: 'UF', rating: 80,
    primaryColor: '#0021A5', emoji: '🐊', tendency: 'pass',
    conference: 'SEC East', isRival: true,
  },
  lsu: {
    name: 'LSU', abbreviation: 'LSU', rating: 85,
    primaryColor: '#461D7C', emoji: '🟣', tendency: 'pass',
    conference: 'SEC West', isRival: false,
  },
  texasam: {
    name: 'Texas A&M', abbreviation: 'TXAM', rating: 81,
    primaryColor: '#500000', emoji: '🤎', tendency: 'balanced',
    conference: 'SEC West', isRival: false,
  },
  olemiss: {
    name: 'Ole Miss', abbreviation: 'MISS', rating: 80,
    primaryColor: '#CE1126', emoji: '🔴', tendency: 'pass',
    conference: 'SEC West', isRival: false,
  },
  kentucky: {
    name: 'Kentucky', abbreviation: 'UK', rating: 74,
    primaryColor: '#0033A0', emoji: '💙', tendency: 'run',
    conference: 'SEC East', isRival: false,
  },
  vanderbilt: {
    name: 'Vanderbilt', abbreviation: 'VANDY', rating: 63,
    primaryColor: '#866D4B', emoji: '🟡', tendency: 'balanced',
    conference: 'SEC East', isRival: false,
  },
  southcarolina: {
    name: 'South Carolina', abbreviation: 'SC', rating: 72,
    primaryColor: '#73000A', emoji: '🌺', tendency: 'balanced',
    conference: 'SEC East', isRival: false,
  },
  missstate: {
    name: 'Mississippi St.', abbreviation: 'MSST', rating: 73,
    primaryColor: '#660000', emoji: '🐾', tendency: 'run',
    conference: 'SEC West', isRival: false,
  },
  georgiatech: {
    name: 'Georgia Tech', abbreviation: 'GT', rating: 71,
    primaryColor: '#B3A369', emoji: '🐝', tendency: 'run',
    conference: 'ACC', isRival: true,
  },
  ohiostate: {
    name: 'Ohio State', abbreviation: 'OSU', rating: 91,
    primaryColor: '#BB0000', emoji: '🌰', tendency: 'pass',
    conference: 'Big Ten', isRival: false,
  },
  michigan: {
    name: 'Michigan', abbreviation: 'MICH', rating: 88,
    primaryColor: '#00274C', emoji: '💛', tendency: 'run',
    conference: 'Big Ten', isRival: false,
  },
};

// ── 14-game SEC schedule ────────────────────────────────────────

export function buildSchedule(): Matchup[] {
  return [
    { week: 1,  opponent: opponents.tennessee,    venue: 'home' },
    { week: 2,  opponent: opponents.southcarolina, venue: 'home' },
    { week: 3,  opponent: opponents.kentucky,      venue: 'away' },
    { week: 4,  opponent: opponents.auburn,        venue: 'away' },   // Deep South Oldest Rivalry
    { week: 5,  opponent: opponents.vanderbilt,    venue: 'home' },
    { week: 6,  opponent: opponents.olemiss,       venue: 'away' },
    { week: 7,  opponent: opponents.florida,       venue: 'neutral' }, // "World's Largest Cocktail Party"
    { week: 8,  opponent: opponents.missstate,     venue: 'home' },
    { week: 9,  opponent: opponents.texasam,       venue: 'away' },
    { week: 10, opponent: opponents.lsu,           venue: 'home' },
    { week: 11, opponent: opponents.alabama,       venue: 'neutral' }, // SEC Championship
    { week: 12, opponent: opponents.georgiatech,   venue: 'neutral' }, // Clean Old-Fashioned Hate
    { week: 13, opponent: opponents.ohiostate,     venue: 'neutral' }, // CFP Semifinal
    { week: 14, opponent: opponents.michigan,      venue: 'neutral' }, // CFP National Championship
  ];
}

// ── Strategies (coding concepts mapped to football) ─────────────

export const strategies: Strategy[] = [
  {
    id: 'function',
    name: 'Function Call',
    codingConcept: 'Functions',
    description: 'Balanced, modular. Call the right play for each situation. Adaptable to any defense.',
    icon: '⚙️',
    strongVs: 'all',
    bonus: 3,
    variance: 0.3,
  },
  {
    id: 'loop',
    name: 'For Loop',
    codingConcept: 'Loops',
    description: 'Grind the ground game. Repeat the run until it breaks the defense. Low variance, steady gains.',
    icon: '🔄',
    strongVs: 'pass',
    bonus: 6,
    variance: 0.15,
  },
  {
    id: 'algorithm',
    name: 'Algorithm Blitz',
    codingConcept: 'Algorithms',
    description: 'Data-driven. Analyze the defense and attack the optimal weakness. Huge upside against strong teams.',
    icon: '📊',
    strongVs: 'balanced',
    bonus: 8,
    variance: 0.5,
  },
  {
    id: 'recursion',
    name: 'Recursion Bomb',
    codingConcept: 'Recursion',
    description: 'Keep calling the same deep shots until something breaks. Boom or bust — maximum variance.',
    icon: '💥',
    strongVs: 'run',
    bonus: 12,
    variance: 0.8,
  },
];

// ── Simulation Logic ────────────────────────────────────────────

export function calculateUgaRating(totalXp: number): number {
  // XP directly improves your team — learning = winning
  return Math.min(99, Math.max(72, 78 + Math.floor(totalXp / 80)));
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + Date.now() * 0.0001) * 10000;
  return x - Math.floor(x);
}

export function simulateGame(
  ugaRating: number,
  opponent: Opponent,
  strategy: Strategy,
  weekSeed: number
): GameResult {
  const advantage = ugaRating - opponent.rating;
  const stratBonus = strategy.strongVs === opponent.tendency || strategy.strongVs === 'all'
    ? strategy.bonus
    : strategy.bonus * 0.5;

  const r = () => seededRandom(weekSeed + Math.random() * 1000);
  const variance = strategy.variance;

  // Generate 8 play events (key moments of the game)
  const plays: PlayEvent[] = [];
  let ugaRunning = 0;
  let oppRunning = 0;

  const playTemplates = [
    // Q1
    (up: boolean) => ({
      description: up
        ? `🏈 Opening drive — ${strategy.name} execute! QB hits the seam for a TD!`
        : `🏈 Opening drive stalls — ${opponent.name} answers with a field goal.`,
      ugaPoints: up ? 7 : 0, oppPoints: up ? 0 : 3, mood: up ? 'big' : 'negative' as const,
    }),
    (up: boolean) => ({
      description: up
        ? `🛡️ Defense forces a 3-and-out. ${opponent.name} punts into coffin corner.`
        : `🛡️ ${opponent.name} grinds 8-play drive. Touchdown on the ground.`,
      ugaPoints: 0, oppPoints: up ? 0 : 7, mood: up ? 'positive' : 'negative' as const,
    }),
    // Q2
    (up: boolean) => ({
      description: up
        ? `⚡ 58-yard bomb — WIDE OPEN! End zone dance time. Dawgs up big!`
        : `⚡ Screen pass broken up. Fourth down turnover.`,
      ugaPoints: up ? 7 : 0, oppPoints: 0, mood: up ? 'big' : 'neutral' as const,
    }),
    (up: boolean) => ({
      description: up
        ? `🎯 Red zone efficiency: back-to-back completions, PAT is good!`
        : `🎯 ${opponent.name} capitalizes on our turnover. Field goal is good.`,
      ugaPoints: up ? 7 : 0, oppPoints: up ? 0 : 3, mood: up ? 'positive' : 'negative' as const,
    }),
    // Halftime
    (up: boolean) => ({
      description: `🏟️ Halftime adjustments — ${strategy.codingConcept} approach ${up ? 'working perfectly' : 'needs tuning'}. Crowd is ${up ? 'rocking' : 'nervous'}.`,
      ugaPoints: 0, oppPoints: 0, mood: 'neutral' as const,
    }),
    // Q3
    (up: boolean) => ({
      description: up
        ? `💪 Third quarter domination — rushing game opens up passing lanes. Another score!`
        : `💪 ${opponent.name} runs away from our defense. Momentum swing!`,
      ugaPoints: up ? 7 : 0, oppPoints: up ? 0 : 7, mood: up ? 'positive' : 'negative' as const,
    }),
    // Q4
    (up: boolean) => ({
      description: up
        ? `🔥 4th and goal — we go for it! TOUCHDOWN DAWGS! This is over!`
        : `🔥 ${opponent.name} converts on 4th and 2. Too close for comfort.`,
      ugaPoints: up ? 7 : 0, oppPoints: up ? 0 : 7, mood: up ? 'big' : 'negative' as const,
    }),
    // Final
    (up: boolean) => ({
      description: up
        ? `🏆 Final whistle — Dawgs WIN! Boom runs onto the field! Between the Hedges erupts!`
        : `😓 Final whistle — tough loss. ${opponent.name} escapes Athens with the W.`,
      ugaPoints: 0, oppPoints: 0, mood: up ? 'big' : 'neutral' as const,
    }),
  ];

  const quarters = [1, 1, 2, 2, 2, 3, 4, 4];

  for (let i = 0; i < playTemplates.length; i++) {
    const effectiveAdv = advantage + stratBonus + (r() - 0.4) * 30 * variance;
    const playIsPositive = effectiveAdv > 0 ? r() < 0.62 + advantage * 0.005 : r() < 0.35;
    const playData = playTemplates[i](playIsPositive);
    ugaRunning += playData.ugaPoints;
    oppRunning += playData.oppPoints;
    plays.push({
      id: i,
      description: playData.description,
      ugaPoints: playData.ugaPoints,
      oppPoints: playData.oppPoints,
      mood: playData.mood as PlayEvent['mood'],
      quarter: quarters[i],
    });
  }

  // Final score calculation
  const baseUga = 17 + Math.max(0, advantage * 0.35) + stratBonus + (r() - 0.3) * 14;
  const baseOpp = 10 + Math.max(0, -advantage * 0.3) + (r() - 0.5) * 10;
  const ugaScore = Math.round(Math.max(0, ugaRunning + baseUga * 0.4));
  const oppScore = Math.round(Math.max(0, oppRunning + baseOpp * 0.4));
  const won = ugaScore > oppScore;

  const mvpPlays = won
    ? [`${opponent.name} defense shredded by ${strategy.name}!`, `${strategy.codingConcept} strategy = victory!`, `Boom says: 'That\'s how we do it Between the Hedges!'`]
    : [`${opponent.name} were tough today.`, `Our ${strategy.name} strategy didn't click.`, `Time to study more code and come back stronger.`];

  const xpEarned = won
    ? 75 + Math.max(0, Math.round((ugaScore - oppScore) * 1.5))
    : 25;

  return {
    ugaScore,
    oppScore,
    won,
    mvpPlay: mvpPlays[Math.floor(r() * mvpPlays.length)],
    plays,
    xpEarned,
    strategyUsed: strategy.name,
  };
}
