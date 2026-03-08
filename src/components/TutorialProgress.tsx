import React from 'react';
import { Progress } from '@/components/ui/progress';
import { tutorialCategories } from '@/data/tutorials';

const completedTutorials = ['ds-1', 'ds-2', 'ds-3', 'alg-1', 'alg-2', 'web-1', 'web-2'];
const totalTutorials = 20;

const categoryProgress = [
  { category: 'Data Structures', completed: 3, total: 5 },
  { category: 'Algorithms', completed: 2, total: 5 },
  { category: 'Web Development', completed: 2, total: 5 },
  { category: 'System Design', completed: 0, total: 5 },
];

const TutorialProgress: React.FC = () => {
  const overallPercent = Math.round((completedTutorials.length / totalTutorials) * 100);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 md:p-6">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">Tutorial Progress</h3>

      {/* Overall progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-zinc-400">
            {completedTutorials.length} of {totalTutorials} tutorials completed
          </span>
          <span className="text-sm font-medium text-orange-400">{overallPercent}%</span>
        </div>
        <Progress
          value={overallPercent}
          className="h-2.5 bg-zinc-800"
          style={{ '--progress-indicator-color': '#f97316' } as React.CSSProperties}
        />
        <style>{`
          [data-state="complete"] > div,
          [role="progressbar"] > div {
            background-color: var(--progress-indicator-color, #f97316) !important;
          }
        `}</style>
      </div>

      {/* Category breakdown */}
      <div className="space-y-3">
        {categoryProgress.map((cat) => {
          const pct = Math.round((cat.completed / cat.total) * 100);
          return (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">{cat.category}</span>
                <span className="text-xs text-zinc-500">
                  {cat.completed}/{cat.total}
                </span>
              </div>
              <Progress value={pct} className="h-1.5 bg-zinc-800" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorialProgress;
