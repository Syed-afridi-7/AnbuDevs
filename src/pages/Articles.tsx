import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Flame, Clock, Tag } from 'lucide-react';

const articles = [
    {
        id: 'understanding-react-hooks',
        title: 'Understanding React Hooks deeply',
        author: 'Sona Incubation',
        date: 'Oct 15, 2024',
        readTime: '8 min read',
        tags: ['React', 'Frontend'],
        excerpt: 'An in-depth look into useState, useEffect, and how React manages state under the hood.',
        featured: true,
    },
    {
        id: 'cracking-the-coding-interview',
        title: 'My Interview Experience at Google - L3',
        author: 'Jane Doe',
        date: 'Nov 02, 2024',
        readTime: '12 min read',
        tags: ['Interview', 'FAANG'],
        excerpt: 'A detailed breakdown of the 5 interview rounds at Google for a Software Engineer role.',
        featured: false,
    },
    {
        id: 'cyber-security-101',
        title: 'Cyber Security 101: Preventing XSS',
        author: 'Alex Smith',
        date: 'Dec 10, 2024',
        readTime: '6 min read',
        tags: ['Security', 'Web'],
        excerpt: 'Learn the fundamentals of Cross-Site Scripting (XSS) and how to sanitize your React applications.',
        featured: true,
    }
];

const cheatSheets = [
    { title: 'React Hooks Cheat-Sheet', links: ['useState syntax', 'useEffect rules', 'useMemo vs useCallback'] },
    { title: 'Git Quick Reference', links: ['git commit', 'git rebase', 'git cherry-pick'] },
    { title: 'Docker Commands', links: ['docker build', 'docker run', 'docker compose up'] },
];

const Articles = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const filteredArticles = articles.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="container mx-auto p-6 max-w-7xl animate-fade-in flex flex-col lg:flex-row gap-8">
            {/* Main Content: Articles List */}
            <div className="flex-1 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Dev-Blog & Experiences</h1>
                    <p className="text-muted-foreground mt-2">
                        Read technical articles, system design deep-dives, and real interview experiences from top tech companies.
                    </p>
                </div>

                <div className="relative max-w-md">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search articles, topics or tags..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                    />
                </div>

                <div className="grid gap-6">
                    {filteredArticles.map(article => (
                        <Card
                            key={article.id}
                            className="cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group overflow-hidden"
                            onClick={() => navigate(`/articles/${article.id}`)}
                        >
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        {article.featured && <span className="bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1"><Flame size={12} /> Featured</span>}
                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{article.tags[0]}</span>
                                    </div>
                                    <div className="flex gap-2 text-xs text-muted-foreground font-medium">
                                        <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-foreground group-hover:text-orange-400 transition-colors mb-2">
                                    {article.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white">
                                        {article.author.charAt(0)}
                                    </div>
                                    <span className="text-foreground">{article.author}</span>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filteredArticles.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">No articles found matching your search.</div>
                    )}
                </div>
            </div>

            {/* Sidebar: Quick Reference & Cheat-sheets */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
                <Card className="bg-card/50 border-border">
                    <CardHeader className="pb-3 border-b border-border/50">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <BookOpen size={16} className="text-orange-500" /> Quick Reference (GFG Style)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/50">
                            {cheatSheets.map((sheet, idx) => (
                                <div key={idx} className="p-4">
                                    <h4 className="text-sm font-semibold text-foreground mb-3">{sheet.title}</h4>
                                    <ul className="space-y-2">
                                        {sheet.links.map((link, lidx) => (
                                            <li key={lidx}>
                                                <a href="#" className="text-xs text-muted-foreground hover:text-orange-400 flex items-center gap-2 transition-colors">
                                                    <Tag size={10} /> {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// Placeholder import for the BookOpen icon missing from react-lucide top list:
import { BookOpen } from 'lucide-react';

export default Articles;
