import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PipelineStage, SKILL_LABELS } from '../types';
import { recruits } from '../data/recruits';
import { getStarDisplay, getSkillColor } from '../utils/helpers';
import { Badge, CodeBlock } from '../components/UIComponents';

const PIPELINE_STAGES: PipelineStage[] = [
  'Scouted',
  'Contacted',
  'Offered',
  'Visited',
  'Committed',
];

export function RecruitDetail({
  recruitPipeline,
  onUpdatePipeline,
}: {
  recruitPipeline: Record<string, PipelineStage>;
  onUpdatePipeline: (recruitId: string, stage: PipelineStage) => void;
}) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recruit = recruits.find((r) => r.id === id);

  if (!recruit) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-dawg-silver">Recruit not found.</p>
        <button
          onClick={() => navigate('/recruits')}
          className="text-dawg-red text-sm mt-2 underline"
        >
          Back to board
        </button>
      </div>
    );
  }

  const currentStage = recruitPipeline[recruit.id];

  return (
    <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/recruits')}
        className="text-dawg-silver text-sm mb-4 hover:text-dawg-white transition-colors"
      >
        ← Back to Board
      </button>

      {/* Profile card */}
      <div className="bg-dawg-charcoal rounded-xl p-5 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="font-display font-extrabold text-xl text-dawg-white">
              {recruit.name}
            </h2>
            <div className="text-dawg-gold text-sm mt-0.5">
              {getStarDisplay(recruit.stars)}
            </div>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm"
            style={{ backgroundColor: getSkillColor(recruit.skill) }}
          >
            {recruit.position}
          </div>
        </div>

        <p className="text-dawg-silver text-sm leading-relaxed mb-4">
          {recruit.bio}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-dawg-black/50 rounded-lg p-2.5">
            <span className="text-dawg-silver/70">School</span>
            <div className="text-dawg-white font-medium mt-0.5">
              {recruit.highSchool}
            </div>
          </div>
          <div className="bg-dawg-black/50 rounded-lg p-2.5">
            <span className="text-dawg-silver/70">State</span>
            <div className="text-dawg-white font-medium mt-0.5">
              {recruit.state}
            </div>
          </div>
          <div className="bg-dawg-black/50 rounded-lg p-2.5">
            <span className="text-dawg-silver/70">Size</span>
            <div className="text-dawg-white font-medium mt-0.5">
              {recruit.height} / {recruit.weight} lbs
            </div>
          </div>
          <div className="bg-dawg-black/50 rounded-lg p-2.5">
            <span className="text-dawg-silver/70">40-Yard</span>
            <div className="text-dawg-white font-medium mt-0.5">
              {recruit.fortyTime}s
            </div>
          </div>
          <div className="bg-dawg-black/50 rounded-lg p-2.5">
            <span className="text-dawg-silver/70">GPA</span>
            <div className="text-dawg-white font-medium mt-0.5">
              {recruit.gpa}
            </div>
          </div>
          <div className="bg-dawg-black/50 rounded-lg p-2.5">
            <span className="text-dawg-silver/70">Skill</span>
            <div className="text-dawg-white font-medium mt-0.5">
              {SKILL_LABELS[recruit.skill]}
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline stage selector */}
      <div className="bg-dawg-charcoal rounded-xl p-4 mb-4">
        <h3 className="font-display font-bold text-dawg-white text-sm mb-3">
          Recruiting Pipeline
        </h3>
        <div className="flex gap-1.5">
          {PIPELINE_STAGES.map((stage) => (
            <button
              key={stage}
              onClick={() => onUpdatePipeline(recruit.id, stage)}
              className={`flex-1 py-2 rounded-lg text-[10px] font-medium transition-colors ${
                currentStage === stage
                  ? stage === 'Committed'
                    ? 'bg-green-600 text-white'
                    : 'bg-dawg-red text-white'
                  : 'bg-dawg-slate text-dawg-silver hover:bg-dawg-slate/80'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
        {currentStage && (
          <p className="text-dawg-silver text-xs mt-2">
            Status: <Badge text={currentStage} variant={currentStage === 'Committed' ? 'green' : 'gold'} />
          </p>
        )}
      </div>

      {/* JSON lesson */}
      <div className="bg-dawg-charcoal rounded-xl p-4">
        <h3 className="font-display font-bold text-dawg-white text-sm mb-2">
          JSON Scout Report
        </h3>
        <p className="text-dawg-silver text-xs mb-3">
          This is how {recruit.name.split(' ')[0]}'s data looks in JSON format:
        </p>
        <CodeBlock code={JSON.stringify(JSON.parse(recruit.jsonLesson), null, 2)} />
      </div>
    </div>
  );
}
