import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Brain, MessageSquare, Map, ChevronRight, TrendingUp, Target, Zap, Award, BookOpen, BarChart2, Star, Play } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from 'recharts';
import CodingHeatmap from '@/components/CodingHeatmap';
import TutorialProgress from '@/components/TutorialProgress';

// Circular Progress component
const CircularProgress = ({ value, label, color, sublabel }: { value: number; label: string; color: string; sublabel: string }) => {
    const r = 40;
    const circumference = 2 * Math.PI * r;
    const strokeDash = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/50" />
                    <circle
                        cx="50" cy="50" r={r} fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDash}
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-foreground">{value}%</span>
                </div>
            </div>
            <div className="text-center">
                <div className="text-sm font-semibold text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{sublabel}</div>
            </div>
        </div>
    );
};

const statsData = [
    { label: 'Problems Solved', value: 42, icon: Code2, color: 'text-orange-400', bg: 'bg-orange-500/10', change: '+5 this week' },
    { label: 'Aptitude Score', value: '780/1000', icon: Brain, color: 'text-blue-400', bg: 'bg-blue-500/10', change: '+60 this month' },
    { label: 'Streak', value: '7 days', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10', change: 'Keep going!' },
    { label: 'Rank', value: '#1,234', icon: Award, color: 'text-purple-400', bg: 'bg-purple-500/10', change: 'Top 15%' },
];

const recentActivity = [
    { title: 'Two Sum', difficulty: 'Easy', status: 'Solved', time: '2h ago', lang: 'Python' },
    { title: 'Container With Most Water', difficulty: 'Medium', status: 'Solved', time: '1d ago', lang: 'JavaScript' },
    { title: 'Median of Two Sorted Arrays', difficulty: 'Hard', status: 'Attempted', time: '2d ago', lang: 'Java' },
    { title: 'Percentage - Aptitude', difficulty: 'Easy', status: 'Solved', time: '3d ago', lang: 'Quiz' },
    { title: 'Self Introduction Practice', difficulty: 'Easy', status: 'Completed', time: '4d ago', lang: 'English' },
];

const quickActions = [
    { title: 'Code Lab', subtitle: 'DSA Problems', icon: Code2, to: '/codelab', color: 'from-orange-500 to-red-500', count: '600 Problems' },
    { title: 'Aptitude Hub', subtitle: 'Practice MCQs', icon: Brain, to: '/aptitude', color: 'from-blue-500 to-cyan-500', count: '200+ Questions' },
    { title: 'Communication', subtitle: 'English & Interview', icon: MessageSquare, to: '/communication', color: 'from-green-500 to-emerald-500', count: '5 Modules' },
    { title: 'Role Paths', subtitle: 'Career Roadmaps', icon: Map, to: '/path/software-dev', color: 'from-purple-500 to-violet-500', count: '5 Paths' },
];

const difficultyStats = [
    { name: 'Easy', solved: 35, total: 200, color: '#22c55e' },
    { name: 'Medium', solved: 7, total: 200, color: '#f97316' },
    { name: 'Hard', solved: 0, total: 200, color: '#ef4444' },
];

const Dashboard = () => {
    return (
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent border border-orange-500/20 p-6">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <Star className="text-orange-400" size={16} />
                        <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Welcome back</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                        Keep <span className="gradient-forge">Forging</span> Your Skills! 🔥
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4">You have 7 problems recommended for you today.</p>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/codelab" className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                            <Play size={14} /> Daily Challenge
                        </Link>
                        <Link to="/aptitude" className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-semibold hover:bg-muted/80 transition-colors">
                            <Brain size={14} /> Aptitude Test
                        </Link>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute right-0 top-0 w-40 h-40 bg-orange-500/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute right-20 bottom-0 w-24 h-24 bg-orange-500/5 rounded-full translate-y-8" />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat) => (
                    <div key={stat.label} className="card-hover bg-card border border-border rounded-xl p-4">
                        <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                            <stat.icon className={stat.color} size={18} />
                        </div>
                        <div className="text-xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                        <div className="text-xs text-green-400 mt-1">{stat.change}</div>
                    </div>
                ))}
            </div>

            {/* Gamification Row: Heatmap & Tutorial Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <CodingHeatmap />
                </div>
                <div>
                    <TutorialProgress />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Progress trackers */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <BarChart2 size={16} className="text-orange-400" /> Overall Progress
                        </h3>
                        <Link to="/codelab" className="text-xs text-orange-400 hover:underline flex items-center gap-1">
                            View All <ChevronRight size={12} />
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-around gap-8 mb-6">
                        <CircularProgress value={65} label="Coding" sublabel="42/600 solved" color="#f97316" />
                        <CircularProgress value={48} label="Aptitude" sublabel="780/1000 pts" color="#3b82f6" />
                        <CircularProgress value={30} label="English" sublabel="3/10 modules" color="#22c55e" />
                    </div>

                    {/* DSA breakdown */}
                    <div className="space-y-2">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">DSA Difficulty Breakdown</div>
                        {difficultyStats.map((d) => (
                            <div key={d.name} className="flex items-center gap-3">
                                <span className={`text-xs font-medium w-14 ${d.name === 'Easy' ? 'text-green-400' : d.name === 'Medium' ? 'text-orange-400' : 'text-red-400'}`}>
                                    {d.name}
                                </span>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${(d.solved / d.total) * 100}%`, backgroundColor: d.color }}
                                    />
                                </div>
                                <span className="text-xs text-muted-foreground w-16 text-right">{d.solved} / {d.total}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                        <TrendingUp size={16} className="text-orange-400" /> Recent Activity
                    </h3>
                    <div className="space-y-3">
                        {recentActivity.map((act, i) => (
                            <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                                <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${act.status === 'Solved' || act.status === 'Completed' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                                <div className="min-w-0 flex-1">
                                    <div className="text-xs font-medium text-foreground truncate group-hover:text-orange-400 transition-colors">{act.title}</div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className={`text-[10px] font-medium ${act.difficulty === 'Easy' ? 'text-green-400' : act.difficulty === 'Medium' ? 'text-orange-400' : 'text-red-400'}`}>
                                            {act.difficulty}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground">{act.lang}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-muted-foreground flex-shrink-0">{act.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Target size={16} className="text-orange-400" /> Quick Access
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.to}
                            to={action.to}
                            className="card-hover group bg-card border border-border rounded-xl p-5 hover:border-orange-500/30"
                        >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <action.icon size={18} className="text-white" />
                            </div>
                            <div className="font-semibold text-sm text-foreground">{action.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{action.subtitle}</div>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-[11px] text-orange-400 font-medium">{action.count}</span>
                                <ChevronRight size={14} className="text-muted-foreground group-hover:text-orange-400 transition-colors group-hover:translate-x-0.5" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Learning Topics */}
            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen size={16} className="text-orange-400" /> DSA Topics to Cover
                </h3>
                <div className="flex flex-wrap gap-2">
                    {['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Binary Search', 'Hashing', 'Recursion', 'Backtracking', 'Heaps', 'Trie'].map((topic) => (
                        <Link
                            key={topic}
                            to={`/codelab?category=${topic}`}
                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-muted text-muted-foreground hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/20 border border-transparent transition-colors"
                        >
                            {topic}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
