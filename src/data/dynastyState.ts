// ═══════════════════════════════════════════════════════════════
// DYNASTY STATE — Coach's Office and Dynasty Desk game logic
// ═══════════════════════════════════════════════════════════════
//
// CODING CONCEPT: State Management
// "State" is the collection of all current values in a system.
// When state changes, the UI re-renders to reflect the new reality.
// Saving state to localStorage means it survives page reloads.
//
// Each CoachAction is like calling a function:
//   takeAction('film-study') → updates offense, defense, morale

// ── Coach Action ─────────────────────────────────────────────────

export interface CoachAction {
  id: string;
  name: string;
  icon: string;
  description: string;
  effect: string;             // human-readable summary of stat changes
  codingConcept: string;      // the coding concept this maps to
  codingExplanation: string;  // one-sentence why this matters in real software
  offenseBonus: number;       // positive or negative integer
  defenseBonus: number;
  recruitingBonus: number;
  moraleBonus: number;
  xpReward: number;
  category: 'offense' | 'defense' | 'recruiting' | 'morale' | 'analysis';
}

// 8 actions the coach can take each week (max 2 per week)
export const COACH_ACTIONS: CoachAction[] = [
  {
    id: 'film-study',
    name: 'Film Study',
    icon: '📽️',
    description: 'Break down the opponent\'s tendencies. Find every formation, every tell.',
    effect: '+3 Offense · +3 Defense · +2 Morale',
    codingConcept: 'Data Analysis',
    codingExplanation: 'Reading structured data to find patterns — the core of analytics engineering.',
    offenseBonus: 3, defenseBonus: 3, recruitingBonus: 0, moraleBonus: 2,
    xpReward: 40,
    category: 'analysis',
  },
  {
    id: 'offense-install',
    name: 'Install New Plays',
    icon: '⚡',
    description: 'Add new offensive concepts. Give the QB more tools and the defense new problems to solve.',
    effect: '+6 Offense · −1 Morale',
    codingConcept: 'Functions',
    codingExplanation: 'Adding new reusable modules — functions let you define behavior once and call it anywhere.',
    offenseBonus: 6, defenseBonus: 0, recruitingBonus: 0, moraleBonus: -1,
    xpReward: 35,
    category: 'offense',
  },
  {
    id: 'defense-drill',
    name: 'Defensive Drills',
    icon: '🛡️',
    description: 'Extra repetitions on gap control, coverage assignments, and run fits.',
    effect: '+6 Defense · −1 Morale',
    codingConcept: 'Loops',
    codingExplanation: 'Repeating an action until mastery is achieved — the foundation of all iteration logic.',
    offenseBonus: 0, defenseBonus: 6, recruitingBonus: 0, moraleBonus: -1,
    xpReward: 35,
    category: 'defense',
  },
  {
    id: 'recruit-push',
    name: 'Recruiting Push',
    icon: '📲',
    description: 'Call top targets. Schedule official visits. Make scholarship offers.',
    effect: '+8 Recruiting · −2 Offense (time diverted)',
    codingConcept: 'APIs',
    codingExplanation: 'Calling external systems to send and receive data — exactly what an API does.',
    offenseBonus: -2, defenseBonus: 0, recruitingBonus: 8, moraleBonus: 0,
    xpReward: 45,
    category: 'recruiting',
  },
  {
    id: 'team-meeting',
    name: 'Championship Mindset Talk',
    icon: '🔥',
    description: 'Fire up the locker room. National championship or bust — everyone buys in.',
    effect: '+10 Morale · +1 Offense · +1 Defense',
    codingConcept: 'State Management',
    codingExplanation: 'Changing a global value that downstream systems react to — state drives everything.',
    offenseBonus: 1, defenseBonus: 1, recruitingBonus: 0, moraleBonus: 10,
    xpReward: 25,
    category: 'morale',
  },
  {
    id: 'rest-starters',
    name: 'Rest Starters',
    icon: '😴',
    description: 'Give key players a mental and physical break. Fresh legs > extra reps before a big game.',
    effect: '+5 Morale · −3 Offense (less practice)',
    codingConcept: 'Tradeoffs',
    codingExplanation: 'Every system design has costs and benefits. Recognizing tradeoffs is senior-engineer thinking.',
    offenseBonus: -3, defenseBonus: 0, recruitingBonus: 0, moraleBonus: 5,
    xpReward: 20,
    category: 'morale',
  },
  {
    id: 'nil-event',
    name: 'NIL Brand Event',
    icon: '💰',
    description: 'Showcase players to brand partners. Builds loyalty, creates buzz for recruits watching.',
    effect: '+5 Recruiting · +4 Morale',
    codingConcept: 'Incentive Systems',
    codingExplanation: 'Using rewards to change behavior — the same principle behind engagement algorithms.',
    offenseBonus: 0, defenseBonus: 0, recruitingBonus: 5, moraleBonus: 4,
    xpReward: 30,
    category: 'recruiting',
  },
  {
    id: 'advanced-analytics',
    name: 'Analytics Deep Dive',
    icon: '📊',
    description: 'Use data to find hidden inefficiencies. Every stat has a story — find it.',
    effect: '+2 all ratings · High XP reward',
    codingConcept: 'Data Visualization',
    codingExplanation: 'Turning raw numbers into decisions — the entire job of a data scientist.',
    offenseBonus: 2, defenseBonus: 2, recruitingBonus: 2, moraleBonus: 2,
    xpReward: 50,
    category: 'analysis',
  },
];

// ── Dynasty Game State ───────────────────────────────────────────

// A snapshot of one week — stored in history for the Dynasty Desk charts
export interface WeekRecord {
  week: number;
  actionIds: string[];             // which actions were taken this week
  gameResult?: 'win' | 'loss';
  ugaScore?: number;
  oppScore?: number;
  opponent?: string;
  offenseRating: number;           // ratings AT END of this week
  defenseRating: number;
  recruitingRating: number;
  morale: number;
}

// The full persistent coach state
export interface DynastyGameState {
  season: number;
  currentWeek: number;          // 1–14 regular season
  offenseRating: number;        // 60–99
  defenseRating: number;        // 60–99
  recruitingRating: number;     // 60–99
  morale: number;               // 0–100
  wins: number;
  losses: number;
  nationalRanking: number;      // 1–25, or 99 = unranked
  weekHistory: WeekRecord[];
  actionsUsedThisWeek: string[];
}

// Default starting state for a new dynasty
export const INITIAL_DYNASTY_STATE: DynastyGameState = {
  season: new Date().getFullYear(),
  currentWeek: 1,
  offenseRating: 82,
  defenseRating: 88,
  recruitingRating: 90,
  morale: 75,
  wins: 0,
  losses: 0,
  nationalRanking: 3,
  weekHistory: [],
  actionsUsedThisWeek: [],
};

// ── Utility helpers ───────────────────────────────────────────────

// Keep ratings between 60 and 99 — can't go below floor or above ceiling
export function clampRating(n: number): number {
  return Math.min(99, Math.max(60, Math.round(n)));
}

// Keep morale between 0 and 100
export function clampMorale(n: number): number {
  return Math.min(100, Math.max(0, Math.round(n)));
}

// Calculate an overall team rating from its components
export function calcOverall(off: number, def: number, morale: number): number {
  // Offense and defense each count 40%, morale counts 20%
  return clampRating(off * 0.4 + def * 0.4 + (morale / 100) * 99 * 0.2);
}

// Returns a morale label based on 0–100 value
export function getMoraleLabel(morale: number): { label: string; color: string } {
  if (morale >= 90) return { label: 'CHAMPIONSHIP READY 🔥', color: '#F59E0B' };
  if (morale >= 75) return { label: 'FIRED UP', color: '#22C55E' };
  if (morale >= 55) return { label: 'Steady', color: '#94A3B8' };
  if (morale >= 35) return { label: 'Shaky', color: '#F97316' };
  return { label: 'CRISIS', color: '#EF4444' };
}
