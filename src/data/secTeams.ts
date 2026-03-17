// ═══════════════════════════════════════════════════════════════
// SEC TEAMS — Data for Pick the Winner & Weekly Simulator
// ═══════════════════════════════════════════════════════════════
//
// CODING CONCEPT: Data Structures
// Each team is an "object" — a named container of related values.
// The collection of teams is an "array" — an ordered list of objects.
// This mirrors exactly how real sports databases store team records.
// You can query them (find, filter), sort them, and compare them.

export interface SecTeam {
  id: string;
  name: string;
  abbreviation: string;
  mascot: string;
  division: 'East' | 'West';
  rating: number;          // 60–99 overall
  offenseRating: number;   // 60–99
  defenseRating: number;   // 60–99
  tendency: 'run' | 'pass' | 'balanced';
  primaryColor: string;
  emoji: string;
  isRival: boolean;        // UGA rival?
}

// All 14 SEC programs + 2 playoff opponents
// Ratings are approximate real-world power rankings — not real official data
export const secTeams: SecTeam[] = [
  {
    id: 'uga',
    name: 'Georgia', abbreviation: 'UGA', mascot: 'Bulldogs', division: 'East',
    rating: 95, offenseRating: 91, defenseRating: 97,
    tendency: 'balanced', primaryColor: '#BA0C2F', emoji: '🐾', isRival: false,
  },
  {
    id: 'alabama',
    name: 'Alabama', abbreviation: 'BAMA', mascot: 'Crimson Tide', division: 'West',
    rating: 93, offenseRating: 90, defenseRating: 93,
    tendency: 'balanced', primaryColor: '#9E1B32', emoji: '🔴', isRival: true,
  },
  {
    id: 'tennessee',
    name: 'Tennessee', abbreviation: 'TENN', mascot: 'Volunteers', division: 'East',
    rating: 82, offenseRating: 85, defenseRating: 78,
    tendency: 'pass', primaryColor: '#FF8200', emoji: '🟠', isRival: false,
  },
  {
    id: 'lsu',
    name: 'LSU', abbreviation: 'LSU', mascot: 'Tigers', division: 'West',
    rating: 85, offenseRating: 88, defenseRating: 80,
    tendency: 'pass', primaryColor: '#461D7C', emoji: '🟣', isRival: false,
  },
  {
    id: 'florida',
    name: 'Florida', abbreviation: 'UF', mascot: 'Gators', division: 'East',
    rating: 80, offenseRating: 82, defenseRating: 77,
    tendency: 'pass', primaryColor: '#0021A5', emoji: '🐊', isRival: true,
  },
  {
    id: 'auburn',
    name: 'Auburn', abbreviation: 'AUB', mascot: 'Tigers', division: 'West',
    rating: 78, offenseRating: 75, defenseRating: 80,
    tendency: 'run', primaryColor: '#0C2340', emoji: '🔵', isRival: true,
  },
  {
    id: 'texasam',
    name: 'Texas A&M', abbreviation: 'TXAM', mascot: 'Aggies', division: 'West',
    rating: 81, offenseRating: 80, defenseRating: 81,
    tendency: 'balanced', primaryColor: '#500000', emoji: '🤎', isRival: false,
  },
  {
    id: 'olemiss',
    name: 'Ole Miss', abbreviation: 'MISS', mascot: 'Rebels', division: 'West',
    rating: 80, offenseRating: 86, defenseRating: 72,
    tendency: 'pass', primaryColor: '#CE1126', emoji: '❤️', isRival: false,
  },
  {
    id: 'missstate',
    name: 'Mississippi St.', abbreviation: 'MSST', mascot: 'Bulldogs', division: 'West',
    rating: 73, offenseRating: 70, defenseRating: 75,
    tendency: 'run', primaryColor: '#660000', emoji: '🐾', isRival: false,
  },
  {
    id: 'kentucky',
    name: 'Kentucky', abbreviation: 'UK', mascot: 'Wildcats', division: 'East',
    rating: 74, offenseRating: 71, defenseRating: 76,
    tendency: 'run', primaryColor: '#0033A0', emoji: '💙', isRival: false,
  },
  {
    id: 'southcarolina',
    name: 'South Carolina', abbreviation: 'SC', mascot: 'Gamecocks', division: 'East',
    rating: 72, offenseRating: 69, defenseRating: 74,
    tendency: 'balanced', primaryColor: '#73000A', emoji: '🌺', isRival: false,
  },
  {
    id: 'vanderbilt',
    name: 'Vanderbilt', abbreviation: 'VANDY', mascot: 'Commodores', division: 'East',
    rating: 63, offenseRating: 60, defenseRating: 65,
    tendency: 'balanced', primaryColor: '#866D4B', emoji: '🟡', isRival: false,
  },
  {
    id: 'missouri',
    name: 'Missouri', abbreviation: 'MIZ', mascot: 'Tigers', division: 'East',
    rating: 76, offenseRating: 78, defenseRating: 72,
    tendency: 'pass', primaryColor: '#F1B82D', emoji: '🐯', isRival: false,
  },
  {
    id: 'arkansas',
    name: 'Arkansas', abbreviation: 'ARK', mascot: 'Razorbacks', division: 'West',
    rating: 75, offenseRating: 74, defenseRating: 75,
    tendency: 'run', primaryColor: '#9D2235', emoji: '🐗', isRival: false,
  },
  {
    id: 'georgiatech',
    name: 'Georgia Tech', abbreviation: 'GT', mascot: 'Yellow Jackets', division: 'East',
    rating: 71, offenseRating: 68, defenseRating: 73,
    tendency: 'run', primaryColor: '#B3A369', emoji: '🐝', isRival: true,
  },
  {
    id: 'ohiostate',
    name: 'Ohio State', abbreviation: 'OSU', mascot: 'Buckeyes', division: 'East',
    rating: 91, offenseRating: 94, defenseRating: 88,
    tendency: 'pass', primaryColor: '#BB0000', emoji: '🌰', isRival: false,
  },
];

// ── Helpers ──────────────────────────────────────────────────────

// Get a team by ID — returns undefined if not found
export function getTeam(id: string): SecTeam | undefined {
  return secTeams.find(t => t.id === id);
}

// Get two random non-UGA teams for a matchup
// CODING CONCEPT: Array operations — filter, sort, slice
export function getRandomMatchup(): [SecTeam, SecTeam] {
  const pool = secTeams.filter(t => t.id !== 'uga');
  // Shuffle using a random sort
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

// Simulate a game between two teams
// Returns the winner, scores, and an explanation of the result
//
// CODING CONCEPT: Functions — reusable logic that takes inputs and returns outputs.
// You could call this function 1000 times with different teams and it would work every time.
export function simulateMatchup(
  teamA: SecTeam,
  teamB: SecTeam,
): SimResult {
  // Rating gap determines the probability of winning — a 10-point gap is significant
  const ratingDiff = teamA.rating - teamB.rating;

  // Add randomness (variance) — the "upset factor"
  // Math.random() gives 0.0 to 1.0; we shift it to create -9 to +11 swing
  const variance = (Math.random() - 0.45) * 20;
  const effectiveDiff = ratingDiff + variance;

  // CODING CONCEPT: Conditionals (if/else)
  // The conditional decides who wins based on the effective difference
  const winner = effectiveDiff >= 0 ? teamA : teamB;
  const loser = effectiveDiff >= 0 ? teamB : teamA;
  const absMargin = Math.abs(effectiveDiff);

  // Score generation — winner scores more, loser scores less, scaled by margin
  const winScore = Math.round(21 + Math.random() * 14 + absMargin * 0.4);
  const lossScore = Math.max(0, Math.round(8 + Math.random() * 14 - absMargin * 0.2));
  const margin = winScore - lossScore;

  const dominance: 'close' | 'comfortable' | 'blowout' =
    margin <= 7 ? 'close' : margin <= 17 ? 'comfortable' : 'blowout';

  // Human-readable explanation of what the data said
  const explanation =
    dominance === 'close'
      ? `${winner.name} edged it out — ratings were close (${winner.rating} vs ${loser.rating}) and variance decided it.`
      : dominance === 'comfortable'
      ? `${winner.name} controlled the game — a ${Math.abs(ratingDiff)}-point rating edge made the difference.`
      : `${winner.name} dominated. A ${Math.abs(ratingDiff)}-pt rating gap + a big variance roll = blowout.`;

  return {
    winner, loser, winScore, lossScore,
    margin, dominance, explanation,
    wasUpset: winner.rating < loser.rating,
  };
}

export interface SimResult {
  winner: SecTeam;
  loser: SecTeam;
  winScore: number;
  lossScore: number;
  margin: number;
  dominance: 'close' | 'comfortable' | 'blowout';
  explanation: string;
  wasUpset: boolean;
}

// ── Weekly Simulator ─────────────────────────────────────────────

export interface WeekGame {
  id: string;
  home: SecTeam;
  away: SecTeam;
  isUgaGame: boolean;
  result?: {
    winner: SecTeam;
    loser: SecTeam;
    homeScore: number;
    awayScore: number;
    dominance: 'close' | 'comfortable' | 'blowout';
    wasUpset: boolean;
  };
}

// Build a week of SEC games: UGA's game + 4 other matchups
// weekNum is used to deterministically shuffle the non-UGA matchups
export function buildWeekGames(ugaOpponentId: string, weekNum: number): WeekGame[] {
  const uga = secTeams.find(t => t.id === 'uga')!;
  const opponent = secTeams.find(t => t.id === ugaOpponentId);
  if (!opponent) return [];

  // All teams not playing UGA this week
  const others = secTeams.filter(t => t.id !== 'uga' && t.id !== ugaOpponentId && t.id !== 'ohiostate');

  // Deterministic shuffle for this week (same week always shows same matchups)
  const seededShuffle = [...others].sort(
    (a, b) => (a.id.charCodeAt(0) * weekNum + 7) % 13 - (b.id.charCodeAt(0) * weekNum + 7) % 13
  );

  return [
    // UGA's game always first (highlighted)
    { id: `w${weekNum}-uga`, home: uga, away: opponent, isUgaGame: true },
    { id: `w${weekNum}-g1`, home: seededShuffle[0], away: seededShuffle[1], isUgaGame: false },
    { id: `w${weekNum}-g2`, home: seededShuffle[2], away: seededShuffle[3], isUgaGame: false },
    { id: `w${weekNum}-g3`, home: seededShuffle[4], away: seededShuffle[5], isUgaGame: false },
    { id: `w${weekNum}-g4`, home: seededShuffle[6], away: seededShuffle[7], isUgaGame: false },
  ];
}
