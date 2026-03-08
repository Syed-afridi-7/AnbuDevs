import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, CheckCircle2, Circle, ChevronRight, BookOpen, Code, Tag } from 'lucide-react';
import { problems, categories } from '@/data/problems';

const CodeLab = () => {
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('All');
    const [category, setCategory] = useState('All');

    const filtered = useMemo(() => {
        return problems.filter(p => {
            const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
            const matchDiff = difficulty === 'All' || p.difficulty === difficulty;
            const matchCat = category === 'All' || p.category === category;
            return matchSearch && matchDiff && matchCat;
        });
    }, [search, difficulty, category]);

    const easy = problems.filter(p => p.difficulty === 'Easy').length;
    const medium = problems.filter(p => p.difficulty === 'Medium').length;
    const hard = problems.filter(p => p.difficulty === 'Hard').length;

    // Simulated solved set
    const solved = new Set([1, 2, 4, 6, 7]);

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Code Lab 👨‍💻</h2>
                    <p className="text-sm text-muted-foreground">Practice DSA and coding problems across C, C++, Java, Python, JS</p>
                </div>
                <div className="sm:ml-auto flex gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <span className="text-xs font-semibold text-green-400">Easy</span>
                        <span className="text-xs text-muted-foreground">{easy}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                        <span className="text-xs font-semibold text-orange-400">Medium</span>
                        <span className="text-xs text-muted-foreground">{medium}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <span className="text-xs font-semibold text-red-400">Hard</span>
                        <span className="text-xs text-muted-foreground">{hard}</span>
                    </div>
                </div>
            </div>

            {/* DSA Category Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {['Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Trees', 'Graphs', 'Dynamic Programming', 'Cyber Security'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`p-3 rounded-xl text-xs font-medium text-center transition-all border ${category === cat
                            ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                            : 'bg-card border-border text-muted-foreground hover:border-orange-500/20 hover:text-foreground'
                            }`}
                    >
                        <div className="text-xl mb-1">{
                            { Arrays: '📊', Strings: '📝', 'Linked Lists': '🔗', Stacks: '📚', Queues: '⏳', Trees: '🌳', Graphs: '🕸️', 'Dynamic Programming': '⚡', 'Cyber Security': '🛡️' }[cat] || '💡'
                        }</div>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title or tag..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                    />
                </div>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                >
                    {['All', 'Easy', 'Medium', 'Hard'].map(d => <option key={d}>{d}</option>)}
                </select>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                >
                    <option>All</option>
                    {categories.map(c => <option key={c}>{c}</option>)}
                </select>
            </div>

            {/* Problem Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-[32px_1fr_100px_100px_80px_120px] gap-4 px-4 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <div></div>
                    <div>Title</div>
                    <div>Difficulty</div>
                    <div>Category</div>
                    <div>Accept.</div>
                    <div>Tags</div>
                </div>
                <div className="divide-y divide-border/50">
                    {filtered.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground text-sm">No problems found</div>
                    ) : (
                        filtered.map((problem) => {
                            const isSolved = solved.has(problem.id);
                            return (
                                <Link
                                    key={problem.id}
                                    to={`/codelab/problem/${problem.id}`}
                                    className="grid grid-cols-[32px_1fr_100px_100px_80px_120px] gap-4 px-4 py-3 hover:bg-muted/30 transition-colors group items-center"
                                >
                                    <div>
                                        {isSolved
                                            ? <CheckCircle2 size={16} className="text-green-400" />
                                            : <Circle size={16} className="text-border" />
                                        }
                                    </div>
                                    <div className="font-medium text-sm text-foreground group-hover:text-orange-400 transition-colors truncate">
                                        {problem.id}. {problem.title}
                                    </div>
                                    <div>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${problem.difficulty === 'Easy' ? 'badge-easy' :
                                            problem.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'
                                            }`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate">{problem.category}</div>
                                    <div className="text-xs text-muted-foreground">{problem.acceptance}%</div>
                                    <div className="flex gap-1 flex-wrap">
                                        {problem.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodeLab;
