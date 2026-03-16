// ═══════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS — The data blueprints for UGA Dynasty Builder
// ═══════════════════════════════════════════════════════════════════

export interface Recruit {
  id: string;
  name: string;
  position: string;
  stars: number; // 3-5 star rating
  state: string;
  highSchool: string;
  height: string;
  weight: number;
  fortyTime: number;
  gpa: number;
  skill: SkillCategory;
  bio: string;
  jsonLesson: string; // JSON representation of the recruit for learning
}

export type SkillCategory =
  | 'python'
  | 'sql'
  | 'javascript'
  | 'react'
  | 'apis'
  | 'machineLearning'
  | 'dataViz'
  | 'promptEngineering'
  | 'git'
  | 'cloud';

export type PipelineStage =
  | 'Scouted'
  | 'Contacted'
  | 'Offered'
  | 'Visited'
  | 'Committed';

export interface Drill {
  id: string;
  title: string;
  category: SkillCategory;
  difficulty: 'Rookie' | 'Starter' | 'All-American';
  xpReward: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  footballContext: string;
  workContext: string;
}

export interface Lesson {
  id: string;
  title: string;
  skill: SkillCategory;
  footballAnalogy: string;
  techExplanation: string;
  workApplication: string;
  codeExample?: string;
}

export interface Alert {
  id: string;
  type: 'recruit' | 'drill' | 'streak';
  title: string;
  message: string;
  timestamp: string;
}

export interface UserProgress {
  userId: string;
  totalXp: number;
  streak: number;
  lastCombineDate: string | null;
  completedDrillIds: string[];
  unlockedLessonIds: string[];
  skillLevels: Record<SkillCategory, number>;
  recruitPipeline: Record<string, PipelineStage>;
  updatedAt: string;
}

export const DEFAULT_SKILL_LEVELS: Record<SkillCategory, number> = {
  python: 0,
  sql: 0,
  javascript: 0,
  react: 0,
  apis: 0,
  machineLearning: 0,
  dataViz: 0,
  promptEngineering: 0,
  git: 0,
  cloud: 0,
};

export const SKILL_LABELS: Record<SkillCategory, string> = {
  python: 'Python',
  sql: 'SQL',
  javascript: 'JavaScript',
  react: 'React',
  apis: 'APIs',
  machineLearning: 'Machine Learning',
  dataViz: 'Data Viz',
  promptEngineering: 'Prompt Engineering',
  git: 'Git',
  cloud: 'Cloud',
};
