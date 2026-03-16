import { SkillCategory } from '../types';

export function getXpLevel(totalXp: number): { level: number; title: string; xpToNext: number; xpInLevel: number } {
  const levels = [
    { threshold: 0, title: 'Walk-On' },
    { threshold: 100, title: 'Scout Team' },
    { threshold: 300, title: 'Backup' },
    { threshold: 600, title: 'Starter' },
    { threshold: 1000, title: 'All-SEC' },
    { threshold: 1500, title: 'All-American' },
    { threshold: 2500, title: 'Heisman Finalist' },
    { threshold: 4000, title: 'National Champion' },
  ];

  let currentLevel = 0;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (totalXp >= levels[i].threshold) {
      currentLevel = i;
      break;
    }
  }

  const nextThreshold = currentLevel < levels.length - 1
    ? levels[currentLevel + 1].threshold
    : levels[currentLevel].threshold;
  const currentThreshold = levels[currentLevel].threshold;

  return {
    level: currentLevel + 1,
    title: levels[currentLevel].title,
    xpToNext: nextThreshold - totalXp,
    xpInLevel: totalXp - currentThreshold,
  };
}

export function getSkillColor(skill: SkillCategory): string {
  const colors: Record<SkillCategory, string> = {
    python: '#3776AB',
    sql: '#E48E00',
    javascript: '#F7DF1E',
    react: '#61DAFB',
    apis: '#6DB33F',
    machineLearning: '#FF6F61',
    dataViz: '#9B59B6',
    promptEngineering: '#2ECC71',
    git: '#F05032',
    cloud: '#4285F4',
  };
  return colors[skill] || '#888';
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Never';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function getStarDisplay(stars: number): string {
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}
