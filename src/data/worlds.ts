// ═══════════════════════════════════════════════════════════════
// WORLDS — The 10 stages of mastery in UGA Dynasty Builder Academy
// ═══════════════════════════════════════════════════════════════
//
// Each world contains ~100 levels across multiple skill tracks.
// Worlds 1-3 are implemented in v1. Worlds 4-10 are defined here
// as metadata so the UI can preview what's coming.
//
// World entry: either XP threshold OR beating the previous world's boss.
// The boss level is always the 10th level of a world.

import { World } from '../types/engine';

export const worlds: World[] = [
  {
    id: 1,
    name: 'Walk-On Developer',
    subtitle: 'From zero to your first play call',
    description: 'You just walked on. Learn the absolute fundamentals: variables, conditionals, and booleans. Every concept is a football decision. Beat the boss to earn your scholarship.',
    icon: '🏃',
    color: '#22C55E',
    levelRange: [1, 10],
    xpRequiredToEnter: 0,
    unlockRequirement: undefined,
    tracks: ['python_logic'],
  },
  {
    id: 2,
    name: 'Redshirt',
    subtitle: 'Getting reps on loops and functions',
    description: 'Redshirt year — no games, just reps. You learn loops, arrays, and functions. These are the tools that automate everything. Beat the boss to earn a starting look.',
    icon: '🔄',
    color: '#3B82F6',
    levelRange: [11, 20],
    xpRequiredToEnter: 500,
    unlockRequirement: 'boss_world_1',
    tracks: ['python_logic', 'javascript'],
  },
  {
    id: 3,
    name: 'Starter',
    subtitle: 'Objects, SQL, and real data thinking',
    description: 'You earned a start. Now the plays get complex: objects, arrays of objects, SQL queries, and state management. This is where real app development begins. Beat the boss to become a captain.',
    icon: '🏈',
    color: '#F59E0B',
    levelRange: [21, 30],
    xpRequiredToEnter: 1250,
    unlockRequirement: 'boss_world_2',
    tracks: ['python_logic', 'javascript', 'sql_data'],
  },
  {
    id: 4,
    name: 'Captain',
    subtitle: 'APIs, async, and system communication',
    description: 'The captain leads the team. You learn how software systems talk to each other: HTTP, REST APIs, async/await, fetch, JSON payloads. This is how real apps get built.',
    icon: '📡',
    color: '#8B5CF6',
    levelRange: [31, 40],
    xpRequiredToEnter: 2500,
    unlockRequirement: 'boss_world_3',
    tracks: ['apis_systems', 'javascript'],
  },
  {
    id: 5,
    name: 'Coordinator',
    subtitle: 'React, components, and UI architecture',
    description: 'Coordinate the offense and defense of your UI. Learn React: components, props, hooks, state, and the component lifecycle. Build real interactive interfaces.',
    icon: '⚛️',
    color: '#EC4899',
    levelRange: [41, 50],
    xpRequiredToEnter: 4000,
    unlockRequirement: 'boss_world_4',
    tracks: ['react_ui'],
  },
  {
    id: 6,
    name: 'Playcaller',
    subtitle: 'Databases, schemas, and data modeling',
    description: 'Call the right plays with data. Advanced SQL, database design, relationships, indexes, and query optimization. Every enterprise app lives here.',
    icon: '🗄️',
    color: '#14B8A6',
    levelRange: [51, 60],
    xpRequiredToEnter: 6000,
    unlockRequirement: 'boss_world_5',
    tracks: ['sql_data', 'product_architecture'],
  },
  {
    id: 7,
    name: 'Recruiting Emperor',
    subtitle: 'AI prompting and workflow automation',
    description: 'You are the AI recruiting emperor. Prompt engineering, AI workflows, LLM integration, chain-of-thought patterns. Build systems that think.',
    icon: '🤖',
    color: '#2ECC71',
    levelRange: [61, 70],
    xpRequiredToEnter: 8500,
    unlockRequirement: 'boss_world_6',
    tracks: ['ai_prompting'],
  },
  {
    id: 8,
    name: 'War Room Analyst',
    subtitle: 'Data visualization and dashboards',
    description: 'The war room runs on data. Build dashboards, charts, and insight systems. Learn visualization libraries, metrics design, and how to turn data into decisions.',
    icon: '📊',
    color: '#F97316',
    levelRange: [71, 80],
    xpRequiredToEnter: 11000,
    unlockRequirement: 'boss_world_7',
    tracks: ['data_visualization', 'sql_data'],
  },
  {
    id: 9,
    name: 'AI Offensive Genius',
    subtitle: 'Machine learning and prediction systems',
    description: 'An AI genius on offense. Regression, classification, training, evaluation. Build prediction systems that anticipate outcomes — just like a great playcaller.',
    icon: '🧠',
    color: '#BA0C2F',
    levelRange: [81, 90],
    xpRequiredToEnter: 14000,
    unlockRequirement: 'boss_world_8',
    tracks: ['ai_prompting', 'python_logic', 'data_visualization'],
  },
  {
    id: 10,
    name: 'Dynasty Architect',
    subtitle: 'System design, deployment, and production apps',
    description: 'You build dynasties. Deploy real products, design scalable systems, manage infrastructure as code, and wire together every skill from the previous 9 worlds.',
    icon: '🏆',
    color: '#BA0C2F',
    levelRange: [91, 100],
    xpRequiredToEnter: 18000,
    unlockRequirement: 'boss_world_9',
    tracks: ['deployment_cloud', 'product_architecture', 'react_ui', 'apis_systems'],
  },
];

// ── Helpers ───────────────────────────────────────────────────────

export function getWorld(id: number): World | undefined {
  return worlds.find(w => w.id === id);
}

export function getWorldForLevel(levelNumber: number): World | undefined {
  return worlds.find(
    w => levelNumber >= w.levelRange[0] && levelNumber <= w.levelRange[1]
  );
}
