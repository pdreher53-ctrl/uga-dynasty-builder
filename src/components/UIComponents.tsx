import React from 'react';
import { SkillCategory, SKILL_LABELS } from '../types';
import { getSkillColor } from '../utils/helpers';

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-dawg-charcoal rounded-xl p-4 text-center">
      <div className="text-dawg-silver text-xs uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-2xl font-display font-bold text-dawg-white">
        {value}
      </div>
      {sub && (
        <div className="text-dawg-gold text-xs mt-1">{sub}</div>
      )}
    </div>
  );
}

export function SkillBar({
  skill,
  level,
}: {
  skill: SkillCategory;
  level: number;
}) {
  const maxLevel = 500;
  const pct = Math.min((level / maxLevel) * 100, 100);
  const color = getSkillColor(skill);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-dawg-silver">{SKILL_LABELS[skill]}</span>
        <span className="text-dawg-gold">{level} XP</span>
      </div>
      <div className="h-2 bg-dawg-slate rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export function Badge({
  text,
  variant = 'default',
}: {
  text: string;
  variant?: 'default' | 'gold' | 'red' | 'green';
}) {
  const colors = {
    default: 'bg-dawg-slate text-dawg-silver',
    gold: 'bg-dawg-gold/20 text-dawg-gold',
    red: 'bg-dawg-red/20 text-dawg-red',
    green: 'bg-green-900/30 text-green-400',
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors[variant]}`}
    >
      {text}
    </span>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-dawg-black border border-dawg-slate rounded-lg p-3 overflow-x-auto text-sm font-mono text-green-400 leading-relaxed">
      {code}
    </pre>
  );
}

export function EmptyState({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-dawg-white font-display font-bold text-lg mb-1">
        {title}
      </h3>
      <p className="text-dawg-silver text-sm">{subtitle}</p>
    </div>
  );
}
