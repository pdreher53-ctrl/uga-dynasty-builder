import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PipelineStage, SkillCategory, SKILL_LABELS } from '../types';
import { recruits } from '../data/recruits';
import { getStarDisplay, getSkillColor } from '../utils/helpers';
import { Badge } from '../components/UIComponents';

export function RecruitBoard({
  recruitPipeline,
}: {
  recruitPipeline: Record<string, PipelineStage>;
}) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'pipeline'>('all');
  const [sortBy, setSortBy] = useState<'stars' | 'name' | 'position'>('stars');

  const filtered = recruits
    .filter((r) => {
      if (filter === 'pipeline') return recruitPipeline[r.id] != null;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'stars') return b.stars - a.stars;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.position.localeCompare(b.position);
    });

  return (
    <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-4xl mx-auto">
      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-dawg-red text-white'
              : 'bg-dawg-charcoal text-dawg-silver'
          }`}
        >
          All ({recruits.length})
        </button>
        <button
          onClick={() => setFilter('pipeline')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            filter === 'pipeline'
              ? 'bg-dawg-red text-white'
              : 'bg-dawg-charcoal text-dawg-silver'
          }`}
        >
          My Pipeline ({Object.keys(recruitPipeline).length})
        </button>
      </div>

      {/* Sort */}
      <div className="flex gap-2 mb-4">
        <span className="text-dawg-silver text-xs self-center">Sort:</span>
        {(['stars', 'name', 'position'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider font-medium transition-colors ${
              sortBy === s
                ? 'bg-dawg-slate text-dawg-white'
                : 'text-dawg-silver hover:text-dawg-white'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Recruit list */}
      <div className="space-y-3">
        {filtered.map((recruit) => {
          const stage = recruitPipeline[recruit.id];
          return (
            <button
              key={recruit.id}
              onClick={() => navigate(`/recruits/${recruit.id}`)}
              className="w-full bg-dawg-charcoal rounded-xl p-4 text-left hover:bg-dawg-slate transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display font-bold text-dawg-white text-sm truncate">
                      {recruit.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-dawg-gold">
                      {getStarDisplay(recruit.stars)}
                    </span>
                    <span className="text-dawg-silver">{recruit.position}</span>
                    <span className="text-dawg-silver/50">
                      {recruit.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: getSkillColor(recruit.skill) }}
                    />
                    <span className="text-dawg-silver text-[10px]">
                      {SKILL_LABELS[recruit.skill]}
                    </span>
                    {stage && (
                      <Badge
                        text={stage}
                        variant={
                          stage === 'Committed'
                            ? 'green'
                            : stage === 'Offered'
                            ? 'gold'
                            : 'default'
                        }
                      />
                    )}
                  </div>
                </div>
                <span className="text-dawg-silver/30 text-lg ml-2">›</span>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-dawg-silver text-sm">
            No recruits in your pipeline yet. Start scouting!
          </p>
        </div>
      )}
    </div>
  );
}
