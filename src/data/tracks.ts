// ═══════════════════════════════════════════════════════════════
// SKILL TRACKS — The 10 learning domains of the Academy
// ═══════════════════════════════════════════════════════════════
//
// Each track can contain 100+ levels.
// Tracks are orthogonal to worlds — a world can draw from multiple tracks.
// As you advance through worlds, you touch each track multiple times
// at increasing depth (spiral curriculum).

import { Track } from '../types/engine';

export const tracks: Track[] = [
  {
    id: 'python_logic',
    name: 'Python / Logic',
    description: 'Variables, conditionals, loops, functions — the foundation of all programming.',
    icon: '🐍',
    color: '#3776AB',
  },
  {
    id: 'sql_data',
    name: 'SQL / Data',
    description: 'Query, filter, sort, and aggregate structured data like a pro.',
    icon: '🗄️',
    color: '#E48E00',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'The language of the web. Objects, arrays, async, DOM manipulation.',
    icon: '⚡',
    color: '#F7DF1E',
  },
  {
    id: 'react_ui',
    name: 'React / UI',
    description: 'Build interactive interfaces with components, props, hooks, and state.',
    icon: '⚛️',
    color: '#61DAFB',
  },
  {
    id: 'apis_systems',
    name: 'APIs / Systems',
    description: 'How software talks to software. REST, HTTP, authentication, integration.',
    icon: '🔌',
    color: '#6DB33F',
  },
  {
    id: 'ai_prompting',
    name: 'AI Prompting',
    description: 'Prompt engineering, AI workflows, building with LLMs in production.',
    icon: '🤖',
    color: '#2ECC71',
  },
  {
    id: 'product_architecture',
    name: 'Product Architecture',
    description: 'System design, separation of concerns, scalable patterns.',
    icon: '🏗️',
    color: '#9B59B6',
  },
  {
    id: 'debugging',
    name: 'Debugging',
    description: 'Read errors, trace bugs, fix broken code. The most underrated skill.',
    icon: '🔍',
    color: '#E74C3C',
  },
  {
    id: 'data_visualization',
    name: 'Data Visualization',
    description: 'Transform raw numbers into charts, dashboards, and actionable insight.',
    icon: '📊',
    color: '#1ABC9C',
  },
  {
    id: 'deployment_cloud',
    name: 'Deployment / Cloud',
    description: 'Ship real products. Environment variables, CI/CD, cloud platforms.',
    icon: '☁️',
    color: '#4285F4',
  },
];

// Quick lookup by ID
export function getTrack(id: string): Track | undefined {
  return tracks.find(t => t.id === id);
}
