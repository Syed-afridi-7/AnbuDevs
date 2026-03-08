import React, { useMemo } from 'react';

const CELL_SIZE = 11;
const CELL_GAP = 2;
const TOTAL_CELL = CELL_SIZE + CELL_GAP;
const WEEKS = 52;
const DAYS = 7;

const COLOR_SCALE: Record<number, string> = {
  0: '#27272a',       // zinc-800
  1: 'rgba(124,45,18,0.4)',   // orange-900/40
  2: 'rgba(194,65,12,0.6)',   // orange-700/60
  3: 'rgba(249,115,22,0.8)',  // orange-500/80
  4: '#fb923c',       // orange-400
  5: '#fdba74',       // orange-300
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS: { label: string; row: number }[] = [
  { label: 'Mon', row: 1 },
  { label: 'Wed', row: 3 },
  { label: 'Fri', row: 5 },
];

function generateMockData(): Record<string, number> {
  const data: Record<string, number> = {};
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    // Weighted random: more 0s and 1s, fewer 4s and 5s
    const rand = Math.random();
    let val = 0;
    if (rand > 0.35) val = 1;
    if (rand > 0.55) val = 2;
    if (rand > 0.72) val = 3;
    if (rand > 0.87) val = 4;
    if (rand > 0.95) val = 5;
    data[key] = val;
  }
  return data;
}

function getWeeks(data: Record<string, number>) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun
  // Start from the Sunday of the earliest week
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364 - ((startDate.getDay() + 6) % 7));

  const weeks: { date: Date; count: number }[][] = [];
  let currentWeek: { date: Date; count: number }[] = [];

  const cursor = new Date(startDate);
  while (cursor <= today) {
    const key = cursor.toISOString().split('T')[0];
    currentWeek.push({ date: new Date(cursor), count: data[key] || 0 });
    if (cursor.getDay() === 6 || cursor.getTime() === today.getTime()) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  return weeks;
}

const CodingHeatmap: React.FC = () => {
  const data = useMemo(() => generateMockData(), []);
  const weeks = useMemo(() => getWeeks(data), [data]);

  // Compute month label positions
  const monthPositions = useMemo(() => {
    const positions: { label: string; x: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const firstDay = week[0];
      if (firstDay) {
        const month = firstDay.date.getMonth();
        if (month !== lastMonth) {
          lastMonth = month;
          positions.push({ label: MONTH_LABELS[month], x: wi });
        }
      }
    });
    return positions;
  }, [weeks]);

  const LEFT_PAD = 32;
  const TOP_PAD = 20;
  const svgWidth = LEFT_PAD + weeks.length * TOTAL_CELL + 10;
  const svgHeight = TOP_PAD + DAYS * TOTAL_CELL + 30;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 md:p-6">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">Coding Activity</h3>
      <div className="overflow-x-auto">
        <svg width={svgWidth} height={svgHeight} className="min-w-[700px]">
          {/* Month labels */}
          {monthPositions.map((m, i) => (
            <text
              key={i}
              x={LEFT_PAD + m.x * TOTAL_CELL}
              y={12}
              className="fill-zinc-500"
              fontSize={10}
              fontFamily="sans-serif"
            >
              {m.label}
            </text>
          ))}

          {/* Day labels */}
          {DAY_LABELS.map((d) => (
            <text
              key={d.label}
              x={0}
              y={TOP_PAD + d.row * TOTAL_CELL + 9}
              className="fill-zinc-500"
              fontSize={10}
              fontFamily="sans-serif"
            >
              {d.label}
            </text>
          ))}

          {/* Grid */}
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              const dayIndex = day.date.getDay(); // 0=Sun mapped to row 0
              const dateStr = day.date.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
              return (
                <rect
                  key={`${wi}-${di}`}
                  x={LEFT_PAD + wi * TOTAL_CELL}
                  y={TOP_PAD + dayIndex * TOTAL_CELL}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={2}
                  ry={2}
                  fill={COLOR_SCALE[day.count] || COLOR_SCALE[0]}
                >
                  <title>{`${dateStr}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}</title>
                </rect>
              );
            })
          )}

          {/* Legend */}
          <text
            x={LEFT_PAD}
            y={TOP_PAD + DAYS * TOTAL_CELL + 20}
            className="fill-zinc-500"
            fontSize={10}
            fontFamily="sans-serif"
          >
            Less
          </text>
          {[0, 1, 2, 3, 4, 5].map((level, i) => (
            <rect
              key={level}
              x={LEFT_PAD + 30 + i * (CELL_SIZE + 3)}
              y={TOP_PAD + DAYS * TOTAL_CELL + 11}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx={2}
              ry={2}
              fill={COLOR_SCALE[level]}
            />
          ))}
          <text
            x={LEFT_PAD + 30 + 6 * (CELL_SIZE + 3) + 4}
            y={TOP_PAD + DAYS * TOTAL_CELL + 20}
            className="fill-zinc-500"
            fontSize={10}
            fontFamily="sans-serif"
          >
            More
          </text>
        </svg>
      </div>
    </div>
  );
};

export default CodingHeatmap;
