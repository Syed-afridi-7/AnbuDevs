import React, { useState } from 'react';
import { Trophy, Medal, Flame, Crown, TrendingUp, Award } from 'lucide-react';
import { leaderboardData, LeaderboardUser } from '@/data/leaderboard';

type TimeFilter = 'weekly' | 'monthly' | 'allTime';

const PodiumCard: React.FC<{ user: LeaderboardUser; position: 'first' | 'second' | 'third' }> = ({ user, position }) => {
  const config = {
    first: {
      gradient: 'from-yellow-500 to-amber-600',
      height: 'md:pt-0',
      badge: 'bg-yellow-500 text-black',
      avatarRing: 'ring-yellow-500',
      order: 'order-2 md:order-2',
      scale: 'md:scale-105',
    },
    second: {
      gradient: 'from-zinc-400 to-zinc-500',
      height: 'md:pt-6',
      badge: 'bg-zinc-400 text-black',
      avatarRing: 'ring-zinc-400',
      order: 'order-1 md:order-1',
      scale: '',
    },
    third: {
      gradient: 'from-amber-700 to-amber-800',
      height: 'md:pt-6',
      badge: 'bg-amber-700 text-white',
      avatarRing: 'ring-amber-700',
      order: 'order-3 md:order-3',
      scale: '',
    },
  }[position];

  return (
    <div className={`flex-1 ${config.order} ${config.height} ${config.scale}`}>
      <div className={`relative rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 text-center overflow-hidden`}>
        {/* Gradient top border */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`} />

        {/* Rank badge */}
        <div className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${config.badge} text-xs font-bold mb-3`}>
          {position === 'first' ? <Crown className="w-4 h-4" /> : user.rank}
        </div>

        {/* Avatar */}
        <div className={`w-14 h-14 mx-auto rounded-full bg-zinc-800 ring-2 ${config.avatarRing} flex items-center justify-center mb-2`}>
          <span className="text-lg font-bold text-zinc-300">{user.initials}</span>
        </div>

        <h3 className="text-sm font-semibold text-zinc-200 truncate">{user.name}</h3>
        <p className="text-xl font-bold text-orange-400 mt-1">{user.score.toLocaleString()}</p>
        <p className="text-xs text-zinc-500 mt-1">{user.problemsSolved} problems solved</p>
      </div>
    </div>
  );
};

const Leaderboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('allTime');

  const top3 = leaderboardData.slice(0, 3);
  const remaining = leaderboardData.slice(3);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
          Leaderboard
        </h1>
        <p className="text-zinc-400 mt-2 text-sm">Compete with fellow developers and climb the ranks</p>
      </div>

      {/* Time filter tabs */}
      <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 w-fit mb-8">
        {([
          { key: 'weekly' as TimeFilter, label: 'Weekly' },
          { key: 'monthly' as TimeFilter, label: 'Monthly' },
          { key: 'allTime' as TimeFilter, label: 'All Time' },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTimeFilter(tab.key)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              timeFilter === tab.key
                ? 'bg-orange-500/20 text-orange-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="flex flex-col md:flex-row gap-4 items-end mb-10">
        <PodiumCard user={top3[1]} position="second" />
        <PodiumCard user={top3[0]} position="first" />
        <PodiumCard user={top3[2]} position="third" />
      </div>

      {/* Rankings Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[3rem_1fr_5rem_5rem] md:grid-cols-[3rem_1fr_6rem_6rem_5rem_6rem] gap-2 px-4 py-3 border-b border-zinc-800 text-xs font-medium text-zinc-500 uppercase tracking-wider">
          <span>Rank</span>
          <span>User</span>
          <span className="text-right hidden md:block">Problems</span>
          <span className="text-right hidden md:block">Tutorials</span>
          <span className="text-right">
            <Flame className="w-3.5 h-3.5 inline-block" />
          </span>
          <span className="text-right">Score</span>
        </div>

        {/* Table rows */}
        {remaining.map((user, i) => (
          <div
            key={user.rank}
            className={`grid grid-cols-[3rem_1fr_5rem_5rem] md:grid-cols-[3rem_1fr_6rem_6rem_5rem_6rem] gap-2 px-4 py-3 items-center transition-colors ${
              user.isCurrentUser
                ? 'border border-orange-500/30 bg-orange-500/5'
                : i % 2 === 0
                ? 'bg-zinc-900/30'
                : ''
            }`}
          >
            {/* Rank */}
            <span className="text-sm font-medium text-zinc-500">#{user.rank}</span>

            {/* User */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                user.isCurrentUser ? 'bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/50' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {user.initials}
              </div>
              <span className={`text-sm truncate ${user.isCurrentUser ? 'text-orange-400 font-semibold' : 'text-zinc-300'}`}>
                {user.name}
                {user.isCurrentUser && <span className="ml-2 text-xs text-orange-500/70">(You)</span>}
              </span>
            </div>

            {/* Problems - hidden on mobile */}
            <span className="text-sm text-zinc-400 text-right hidden md:block">{user.problemsSolved}</span>

            {/* Tutorials - hidden on mobile */}
            <span className="text-sm text-zinc-400 text-right hidden md:block">{user.tutorialsCompleted}</span>

            {/* Streak */}
            <div className="flex items-center justify-end gap-1">
              <Flame className={`w-3.5 h-3.5 ${user.streak >= 10 ? 'text-orange-400' : 'text-zinc-600'}`} />
              <span className="text-sm text-zinc-400">{user.streak}</span>
            </div>

            {/* Score */}
            <span className="text-sm font-semibold text-orange-400 text-right">{user.score.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Your position summary */}
      <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">Your Rank: <span className="text-orange-400">#12</span></p>
            <p className="text-xs text-zinc-500">Keep solving problems to climb the leaderboard!</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-semibold text-orange-400">2,650 pts</span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
